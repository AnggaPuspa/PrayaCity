"use server";

import { destinationSchema } from "../schemas/destination.schema";
import {
  createDestination,
  updateDestination,
  deleteDestination,
} from "../services/destinations.service";
import { geocodeLocation } from "../services/geocode.service";
import type {
  DestinationFormState,
  DestinationFormValues,
} from "../types";
import { revalidatePath } from "next/cache";

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function extractFormValues(formData: FormData): DestinationFormValues {
  return {
    slug: readString(formData, "slug"),
    imageSrc: readString(formData, "imageSrc"),
    detailImageSrc: readString(formData, "detailImageSrc"),
    titleEn: readString(formData, "titleEn"),
    titleId: readString(formData, "titleId"),
    descriptionEn: readString(formData, "descriptionEn"),
    descriptionId: readString(formData, "descriptionId"),
    longDescriptionEn: readString(formData, "longDescriptionEn"),
    longDescriptionId: readString(formData, "longDescriptionId"),
    locationEn: readString(formData, "locationEn"),
    locationId: readString(formData, "locationId"),
    statusLabelEn: readString(formData, "statusLabelEn"),
    statusLabelId: readString(formData, "statusLabelId"),
    entranceFeeEn: readString(formData, "entranceFeeEn"),
    entranceFeeId: readString(formData, "entranceFeeId"),
    status: readString(formData, "status") || "DRAFT",
    isFeatured:
      formData.get("isFeatured") === "on" ||
      formData.get("isFeatured") === "true",
    tags: formData.getAll("tags").map(String),
    latitude: readString(formData, "latitude"),
    longitude: readString(formData, "longitude"),
  };
}

function parseDestinationForm(formData: FormData) {
  const values = extractFormValues(formData);

  return {
    values,
    parsed: destinationSchema.safeParse({
      slug: values.slug,
      imageSrc: values.imageSrc,
      detailImageSrc: values.detailImageSrc || undefined,
      titleEn: values.titleEn,
      titleId: values.titleId,
      descriptionEn: values.descriptionEn,
      descriptionId: values.descriptionId,
      longDescriptionEn: values.longDescriptionEn || undefined,
      longDescriptionId: values.longDescriptionId || undefined,
      locationEn: values.locationEn || undefined,
      locationId: values.locationId || undefined,
      statusLabelEn: values.statusLabelEn || undefined,
      statusLabelId: values.statusLabelId || undefined,
      entranceFeeEn: values.entranceFeeEn || undefined,
      entranceFeeId: values.entranceFeeId || undefined,
      latitude: values.latitude || undefined,
      longitude: values.longitude || undefined,
      status: values.status || "DRAFT",
      isFeatured: values.isFeatured,
      tags: values.tags,
    }),
  };
}

function validationError(
  values: DestinationFormValues,
  parsed: {
    error: { issues: Array<{ path: PropertyKey[]; message: string }> };
  },
): DestinationFormState {
  const errors: DestinationFormState["errors"] = {};
  for (const issue of parsed.error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return {
    status: "error",
    message: "Please fix the highlighted fields.",
    errors,
    values,
  };
}

function mapDestinationError(error: any): string {
  if (error?.code === "P2025") {
    return "Destination not found. It may have been deleted.";
  }
  if (error?.code === "P2002") {
    return "A destination with this slug already exists. Please use a different slug.";
  }
  return error?.message || "Something went wrong. Please try again.";
}

/**
 * Prefer exact coordinates selected from autocomplete.
 * If missing, auto-resolve lat/lng from location text.
 */
async function withAutoCoordinates<
  T extends {
    locationEn?: string;
    locationId?: string;
    titleEn?: string;
    titleId?: string;
    latitude?: number;
    longitude?: number;
  },
>(data: T): Promise<T> {
  if (
    typeof data.latitude === "number" &&
    typeof data.longitude === "number" &&
    Number.isFinite(data.latitude) &&
    Number.isFinite(data.longitude)
  ) {
    return data;
  }

  const query =
    data.locationEn?.trim() ||
    data.locationId?.trim() ||
    data.titleEn?.trim() ||
    data.titleId?.trim() ||
    "";

  if (!query) return data;

  const searchQuery = /lombok|ntb|indonesia/i.test(query)
    ? query
    : `${query}, Lombok Tengah, Nusa Tenggara Barat, Indonesia`;

  const coords = await geocodeLocation(searchQuery);
  if (!coords) return data;

  return {
    ...data,
    latitude: coords.latitude,
    longitude: coords.longitude,
  };
}

export async function createDestinationAction(
  _prevState: DestinationFormState,
  formData: FormData,
): Promise<DestinationFormState> {
  const { values, parsed } = parseDestinationForm(formData);
  if (!parsed.success) return validationError(values, parsed);

  try {
    const payload = await withAutoCoordinates(parsed.data);
    await createDestination(payload);

    const hasCoords =
      typeof payload.latitude === "number" &&
      typeof payload.longitude === "number";

    revalidatePath("/(marketing)/destinations", "page");
    revalidatePath("/(marketing)/", "page");
    return {
      status: "success",
      message: hasCoords
        ? `Destination created successfully. Weather pin set to ${payload.latitude}, ${payload.longitude}.`
        : "Destination created successfully. Location text could not be geocoded yet — weather may use fallback.",
      values: {
        ...values,
        latitude:
          typeof payload.latitude === "number" ? String(payload.latitude) : "",
        longitude:
          typeof payload.longitude === "number"
            ? String(payload.longitude)
            : "",
      },
    };
  } catch (error: any) {
    return {
      status: "error",
      message: mapDestinationError(error),
      values,
    };
  }
}

export async function updateDestinationAction(
  id: string,
  _prevState: DestinationFormState,
  formData: FormData,
): Promise<DestinationFormState> {
  const { values, parsed } = parseDestinationForm(formData);
  if (!parsed.success) return validationError(values, parsed);

  try {
    const payload = await withAutoCoordinates(parsed.data);
    await updateDestination(id, payload);

    const hasCoords =
      typeof payload.latitude === "number" &&
      typeof payload.longitude === "number";

    revalidatePath("/(marketing)/destinations", "page");
    revalidatePath("/(marketing)/destinations/[id]", "page");
    revalidatePath("/(marketing)/", "page");
    return {
      status: "success",
      message: hasCoords
        ? `Destination updated successfully. Weather pin set to ${payload.latitude}, ${payload.longitude}.`
        : "Destination updated successfully. Location text could not be geocoded yet — weather may use fallback.",
      values: {
        ...values,
        latitude:
          typeof payload.latitude === "number" ? String(payload.latitude) : "",
        longitude:
          typeof payload.longitude === "number"
            ? String(payload.longitude)
            : "",
      },
    };
  } catch (error: any) {
    return {
      status: "error",
      message: mapDestinationError(error),
      values,
    };
  }
}

export async function deleteDestinationAction(
  id: string,
): Promise<DestinationFormState> {
  try {
    await deleteDestination(id);
    // Admin list pages (locale-prefixed)
    revalidatePath("/en/admin/destinations");
    revalidatePath("/id/admin/destinations");
    // Public pages
    revalidatePath("/en/destinations");
    revalidatePath("/id/destinations");
    revalidatePath("/en");
    revalidatePath("/id");
    return { status: "success", message: "Destination deleted successfully." };
  } catch (error: any) {
    return {
      status: "error",
      message: mapDestinationError(error),
    };
  }
}
