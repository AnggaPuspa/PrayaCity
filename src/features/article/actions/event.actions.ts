"use server";

import { eventSchema, type EventInput } from "../schemas/event.schema";
import { createEvent, updateEvent, deleteEvent } from "../services/events.service";
import type { EventFormState } from "../types";
import { revalidatePath } from "next/cache";

export async function createEventAction(
  _prevState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const isFeatured = formData.get("isFeatured") === "on" || formData.get("isFeatured") === "true";
  const categories = formData.getAll("categories").map(String);

  const parsed = eventSchema.safeParse({
    slug: formData.get("slug"),
    image: formData.get("image"),
    titleEn: formData.get("titleEn"),
    titleId: formData.get("titleId"),
    excerptEn: formData.get("excerptEn"),
    excerptId: formData.get("excerptId"),
    bodyEn: formData.get("bodyEn"),
    bodyId: formData.get("bodyId"),
    dateEn: formData.get("dateEn"),
    dateId: formData.get("dateId"),
    status: formData.get("status") || "DRAFT",
    isFeatured,
    categories,
  });

  if (!parsed.success) {
    const errors: EventFormState["errors"] = {};
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
    await createEvent(parsed.data);
    revalidatePath("/(marketing)/events", "page");
    revalidatePath("/(marketing)/", "page");
    return { status: "success", message: "Event created successfully." };
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "Something went wrong. Please try again.",
    };
  }
}

export async function updateEventAction(
  id: string,
  _prevState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const isFeatured = formData.get("isFeatured") === "on" || formData.get("isFeatured") === "true";
  const categories = formData.getAll("categories").map(String);

  const parsed = eventSchema.safeParse({
    slug: formData.get("slug"),
    image: formData.get("image"),
    titleEn: formData.get("titleEn"),
    titleId: formData.get("titleId"),
    excerptEn: formData.get("excerptEn"),
    excerptId: formData.get("excerptId"),
    bodyEn: formData.get("bodyEn"),
    bodyId: formData.get("bodyId"),
    dateEn: formData.get("dateEn"),
    dateId: formData.get("dateId"),
    status: formData.get("status") || "DRAFT",
    isFeatured,
    categories,
  });

  if (!parsed.success) {
    const errors: EventFormState["errors"] = {};
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
    await updateEvent(id, parsed.data);
    revalidatePath("/(marketing)/events", "page");
    revalidatePath("/(marketing)/", "page");
    return { status: "success", message: "Event updated successfully." };
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "Something went wrong. Please try again.",
    };
  }
}

export async function deleteEventAction(id: string): Promise<EventFormState> {
  try {
    await deleteEvent(id);
    revalidatePath("/(marketing)/events", "page");
    revalidatePath("/(marketing)/", "page");
    return { status: "success", message: "Event deleted successfully." };
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "Failed to delete event.",
    };
  }
}
