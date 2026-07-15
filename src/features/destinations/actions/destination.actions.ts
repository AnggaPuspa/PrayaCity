"use server";

import { destinationSchema, type DestinationInput } from "../schemas/destination.schema";
import { createDestination, updateDestination, deleteDestination } from "../services/destinations.service";
import type { DestinationFormState } from "../types";
import { revalidatePath } from "next/cache";

export async function createDestinationAction(
  _prevState: DestinationFormState,
  formData: FormData,
): Promise<DestinationFormState> {
  const isFeatured = formData.get("isFeatured") === "on" || formData.get("isFeatured") === "true";
  const tags = formData.getAll("tags").map(String);

  const parsed = destinationSchema.safeParse({
    slug: formData.get("slug"),
    imageSrc: formData.get("imageSrc"),
    detailImageSrc: formData.get("detailImageSrc") || undefined,
    titleEn: formData.get("titleEn"),
    titleId: formData.get("titleId"),
    descriptionEn: formData.get("descriptionEn"),
    descriptionId: formData.get("descriptionId"),
    longDescriptionEn: formData.get("longDescriptionEn") || undefined,
    longDescriptionId: formData.get("longDescriptionId") || undefined,
    locationEn: formData.get("locationEn") || undefined,
    locationId: formData.get("locationId") || undefined,
    statusLabelEn: formData.get("statusLabelEn") || undefined,
    statusLabelId: formData.get("statusLabelId") || undefined,
    entranceFeeEn: formData.get("entranceFeeEn") || undefined,
    entranceFeeId: formData.get("entranceFeeId") || undefined,
    status: formData.get("status") || "DRAFT",
    isFeatured,
    tags,
  });

  if (!parsed.success) {
    const errors: DestinationFormState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors,
    };
  }

  try {
    await createDestination(parsed.data);
    revalidatePath("/(marketing)/destinations", "page");
    revalidatePath("/(marketing)/", "page");
    return { status: "success", message: "Destination created successfully." };
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "Something went wrong. Please try again.",
    };
  }
}

export async function updateDestinationAction(
  id: string,
  _prevState: DestinationFormState,
  formData: FormData,
): Promise<DestinationFormState> {
  const isFeatured = formData.get("isFeatured") === "on" || formData.get("isFeatured") === "true";
  const tags = formData.getAll("tags").map(String);

  const parsed = destinationSchema.safeParse({
    slug: formData.get("slug"),
    imageSrc: formData.get("imageSrc"),
    detailImageSrc: formData.get("detailImageSrc") || undefined,
    titleEn: formData.get("titleEn"),
    titleId: formData.get("titleId"),
    descriptionEn: formData.get("descriptionEn"),
    descriptionId: formData.get("descriptionId"),
    longDescriptionEn: formData.get("longDescriptionEn") || undefined,
    longDescriptionId: formData.get("longDescriptionId") || undefined,
    locationEn: formData.get("locationEn") || undefined,
    locationId: formData.get("locationId") || undefined,
    statusLabelEn: formData.get("statusLabelEn") || undefined,
    statusLabelId: formData.get("statusLabelId") || undefined,
    entranceFeeEn: formData.get("entranceFeeEn") || undefined,
    entranceFeeId: formData.get("entranceFeeId") || undefined,
    status: formData.get("status") || "DRAFT",
    isFeatured,
    tags,
  });

  if (!parsed.success) {
    const errors: DestinationFormState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors,
    };
  }

  try {
    await updateDestination(id, parsed.data);
    revalidatePath("/(marketing)/destinations", "page");
    revalidatePath("/(marketing)/destinations/[id]", "page");
    revalidatePath("/(marketing)/", "page");
    return { status: "success", message: "Destination updated successfully." };
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "Something went wrong. Please try again.",
    };
  }
}

export async function deleteDestinationAction(id: string): Promise<DestinationFormState> {
  try {
    await deleteDestination(id);
    revalidatePath("/(marketing)/destinations", "page");
    revalidatePath("/(marketing)/", "page");
    return { status: "success", message: "Destination deleted successfully." };
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "Failed to delete destination.",
    };
  }
}
