"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input, Textarea } from "@/components/atoms";
import { FormField, MediaPickerModal } from "@/components/molecules";
import { cn } from "@/lib/utils/cn";
import type {
  DestinationFormState,
  DestinationFormValues,
  LocationSuggestion,
} from "../../types";
import { LocationAutocompleteField } from "./location-autocomplete-field";

export interface DestinationFormProps {
  initialData?: any;
  action: (
    state: DestinationFormState,
    formData: FormData,
  ) => Promise<DestinationFormState>;
  submitLabel?: string;
}

const AVAILABLE_TAGS = ["Nature", "Beach", "Hills", "Heritage"];

function buildValues(source?: Partial<DestinationFormValues> | any): DestinationFormValues {
  return {
    slug: source?.slug ?? "",
    imageSrc: source?.imageSrc ?? "",
    detailImageSrc: source?.detailImageSrc ?? "",
    titleEn: source?.titleEn ?? "",
    titleId: source?.titleId ?? "",
    descriptionEn: source?.descriptionEn ?? "",
    descriptionId: source?.descriptionId ?? "",
    longDescriptionEn: source?.longDescriptionEn ?? "",
    longDescriptionId: source?.longDescriptionId ?? "",
    locationEn: source?.locationEn ?? "",
    locationId: source?.locationId ?? "",
    statusLabelEn: source?.statusLabelEn ?? "",
    statusLabelId: source?.statusLabelId ?? "",
    entranceFeeEn: source?.entranceFeeEn ?? "",
    entranceFeeId: source?.entranceFeeId ?? "",
    status: source?.status ?? "DRAFT",
    isFeatured: Boolean(source?.isFeatured),
    tags: Array.isArray(source?.tags) ? source.tags.map(String) : [],
    latitude:
      source?.latitude != null && source?.latitude !== ""
        ? String(source.latitude)
        : "",
    longitude:
      source?.longitude != null && source?.longitude !== ""
        ? String(source.longitude)
        : "",
  };
}

function fieldClass(hasError?: string) {
  return cn(
    hasError &&
      "border-red-400 focus-visible:ring-red-400 bg-red-50/40",
  );
}

export function DestinationForm({
  initialData,
  action,
  submitLabel,
}: DestinationFormProps) {
  const t = useTranslations("Admin.destinations");
  const tCommon = useTranslations("Admin.common");
  const [state, formAction, isPending] = useActionState(action, {
    status: "idle",
    message: "",
  });

  const [values, setValues] = useState<DestinationFormValues>(() =>
    buildValues(initialData),
  );
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [activeMediaTarget, setActiveMediaTarget] = useState<
    "imageSrc" | "detailImageSrc" | null
  >(null);

  // Restore submitted values after failed/successful action responses.
  useEffect(() => {
    if (state.values) {
      setValues(buildValues(state.values));
    }
  }, [state.values]);

  const errors = state.errors ?? {};
  const firstErrorKey = useMemo(
    () => Object.keys(errors)[0] ?? null,
    [errors],
  );

  useEffect(() => {
    if (!firstErrorKey) return;
    const el = document.getElementById(firstErrorKey);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      if ("focus" in el && typeof (el as HTMLElement).focus === "function") {
        (el as HTMLElement).focus({ preventScroll: true });
      }
    }
  }, [firstErrorKey, state.status]);

  const updateField = <K extends keyof DestinationFormValues>(
    key: K,
    value: DestinationFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const applySuggestion = (
    field: "locationEn" | "locationId",
    suggestion: LocationSuggestion,
  ) => {
    const fullLabel = [suggestion.label, suggestion.secondary]
      .filter(Boolean)
      .join(", ");

    setValues((prev) => ({
      ...prev,
      [field]: fullLabel,
      // Keep the other language field filled if still empty.
      locationEn: field === "locationEn" ? fullLabel : prev.locationEn || fullLabel,
      locationId: field === "locationId" ? fullLabel : prev.locationId || fullLabel,
      latitude: String(suggestion.latitude),
      longitude: String(suggestion.longitude),
    }));
  };

  const toggleTag = (tag: string, checked: boolean) => {
    setValues((prev) => {
      const nextTags = checked
        ? Array.from(new Set([...prev.tags, tag]))
        : prev.tags.filter((item) => item !== tag);
      return { ...prev, tags: nextTags };
    });
  };

  const handleOpenMediaPicker = (target: "imageSrc" | "detailImageSrc") => {
    setActiveMediaTarget(target);
    setIsMediaPickerOpen(true);
  };

  const handleMediaSelect = (url: string) => {
    if (activeMediaTarget === "imageSrc") updateField("imageSrc", url);
    if (activeMediaTarget === "detailImageSrc") updateField("detailImageSrc", url);
  };

  const resolvedSubmitLabel = submitLabel ?? t("saveSubmit");

  const hasPinnedCoords =
    values.latitude.trim() !== "" &&
    values.longitude.trim() !== "" &&
    Number.isFinite(Number(values.latitude)) &&
    Number.isFinite(Number(values.longitude));

  return (
    <>
      <form
        action={formAction}
        className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-8"
        noValidate
      >
        <input type="hidden" name="latitude" value={values.latitude} />
        <input type="hidden" name="longitude" value={values.longitude} />

        {state.status === "error" && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
            {state.message}
          </div>
        )}

        {state.status === "success" && (
          <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-100">
            {state.message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label={t("slug")} htmlFor="slug" error={errors.slug}>
            <Input
              id="slug"
              name="slug"
              value={values.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              placeholder={t("slugPlaceholder")}
              className={fieldClass(errors.slug)}
              aria-invalid={Boolean(errors.slug)}
            />
          </FormField>

          <FormField
            label={t("primaryImage")}
            htmlFor="imageSrc"
            error={errors.imageSrc}
          >
            <div className="flex gap-2">
              <Input
                id="imageSrc"
                name="imageSrc"
                value={values.imageSrc}
                onChange={(e) => updateField("imageSrc", e.target.value)}
                placeholder="/uploads/image.jpg"
                className={cn("flex-1", fieldClass(errors.imageSrc))}
                aria-invalid={Boolean(errors.imageSrc)}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleOpenMediaPicker("imageSrc")}
              >
                Select Media
              </Button>
            </div>
          </FormField>

          <FormField
            label={t("detailImage")}
            htmlFor="detailImageSrc"
            error={errors.detailImageSrc}
          >
            <div className="flex gap-2">
              <Input
                id="detailImageSrc"
                name="detailImageSrc"
                value={values.detailImageSrc}
                onChange={(e) => updateField("detailImageSrc", e.target.value)}
                placeholder="/uploads/detail.jpg"
                className={cn("flex-1", fieldClass(errors.detailImageSrc))}
                aria-invalid={Boolean(errors.detailImageSrc)}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleOpenMediaPicker("detailImageSrc")}
              >
                Select Media
              </Button>
            </div>
          </FormField>

          <FormField label={t("titleEn")} htmlFor="titleEn" error={errors.titleEn}>
            <Input
              id="titleEn"
              name="titleEn"
              value={values.titleEn}
              onChange={(e) => updateField("titleEn", e.target.value)}
              className={fieldClass(errors.titleEn)}
              aria-invalid={Boolean(errors.titleEn)}
            />
          </FormField>

          <FormField label={t("titleId")} htmlFor="titleId" error={errors.titleId}>
            <Input
              id="titleId"
              name="titleId"
              value={values.titleId}
              onChange={(e) => updateField("titleId", e.target.value)}
              className={fieldClass(errors.titleId)}
              aria-invalid={Boolean(errors.titleId)}
            />
          </FormField>

          <LocationAutocompleteField
            id="locationEn"
            name="locationEn"
            label={t("locationEn")}
            value={values.locationEn}
            error={errors.locationEn}
            placeholder={t("locationPlaceholderEn")}
            className={fieldClass(errors.locationEn)}
            onValueChange={(next) => {
              // Typing freely clears the previous pin so we re-resolve later.
              setValues((prev) => ({
                ...prev,
                locationEn: next,
                latitude: "",
                longitude: "",
              }));
            }}
            onSelectSuggestion={(suggestion) =>
              applySuggestion("locationEn", suggestion)
            }
          />

          <LocationAutocompleteField
            id="locationId"
            name="locationId"
            label={t("locationId")}
            value={values.locationId}
            error={errors.locationId}
            placeholder={t("locationPlaceholderId")}
            className={fieldClass(errors.locationId)}
            onValueChange={(next) => {
              setValues((prev) => ({
                ...prev,
                locationId: next,
                latitude: "",
                longitude: "",
              }));
            }}
            onSelectSuggestion={(suggestion) =>
              applySuggestion("locationId", suggestion)
            }
          />
        </div>

        <div className="rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-sm text-blue-900">
          <p className="font-medium">{t("accurateTitle")}</p>
          <p className="mt-1 text-blue-800/80">
            {t("accurateBody")}
          </p>
          {hasPinnedCoords ? (
            <p className="mt-2 text-xs font-medium text-emerald-700">
              {t("pinSelected", { lat: values.latitude, lng: values.longitude })}
            </p>
          ) : (
            <p className="mt-2 text-xs text-blue-700">
              {t("pinEmpty")}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6">
          <FormField
            label={t("descriptionEn")}
            htmlFor="descriptionEn"
            error={errors.descriptionEn}
          >
            <Textarea
              id="descriptionEn"
              name="descriptionEn"
              value={values.descriptionEn}
              onChange={(e) => updateField("descriptionEn", e.target.value)}
              rows={2}
              className={fieldClass(errors.descriptionEn)}
              aria-invalid={Boolean(errors.descriptionEn)}
            />
          </FormField>

          <FormField
            label={t("descriptionId")}
            htmlFor="descriptionId"
            error={errors.descriptionId}
          >
            <Textarea
              id="descriptionId"
              name="descriptionId"
              value={values.descriptionId}
              onChange={(e) => updateField("descriptionId", e.target.value)}
              rows={2}
              className={fieldClass(errors.descriptionId)}
              aria-invalid={Boolean(errors.descriptionId)}
            />
          </FormField>

          <FormField
            label={t("longDescriptionEn")}
            htmlFor="longDescriptionEn"
            error={errors.longDescriptionEn}
          >
            <Textarea
              id="longDescriptionEn"
              name="longDescriptionEn"
              value={values.longDescriptionEn}
              onChange={(e) => updateField("longDescriptionEn", e.target.value)}
              rows={5}
              className={fieldClass(errors.longDescriptionEn)}
              aria-invalid={Boolean(errors.longDescriptionEn)}
            />
          </FormField>

          <FormField
            label={t("longDescriptionId")}
            htmlFor="longDescriptionId"
            error={errors.longDescriptionId}
          >
            <Textarea
              id="longDescriptionId"
              name="longDescriptionId"
              value={values.longDescriptionId}
              onChange={(e) => updateField("longDescriptionId", e.target.value)}
              rows={5}
              className={fieldClass(errors.longDescriptionId)}
              aria-invalid={Boolean(errors.longDescriptionId)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
          <FormField
            label={t("statusLabelEn")}
            htmlFor="statusLabelEn"
            error={errors.statusLabelEn}
          >
            <Input
              id="statusLabelEn"
              name="statusLabelEn"
              value={values.statusLabelEn}
              onChange={(e) => updateField("statusLabelEn", e.target.value)}
              placeholder={t("statusOpenEn")}
              className={fieldClass(errors.statusLabelEn)}
              aria-invalid={Boolean(errors.statusLabelEn)}
            />
          </FormField>

          <FormField
            label={t("statusLabelId")}
            htmlFor="statusLabelId"
            error={errors.statusLabelId}
          >
            <Input
              id="statusLabelId"
              name="statusLabelId"
              value={values.statusLabelId}
              onChange={(e) => updateField("statusLabelId", e.target.value)}
              placeholder={t("statusOpenId")}
              className={fieldClass(errors.statusLabelId)}
              aria-invalid={Boolean(errors.statusLabelId)}
            />
          </FormField>

          <FormField
            label={t("entranceFeeEn")}
            htmlFor="entranceFeeEn"
            error={errors.entranceFeeEn}
          >
            <Input
              id="entranceFeeEn"
              name="entranceFeeEn"
              value={values.entranceFeeEn}
              onChange={(e) => updateField("entranceFeeEn", e.target.value)}
              placeholder={t("feePlaceholderEn")}
              className={fieldClass(errors.entranceFeeEn)}
              aria-invalid={Boolean(errors.entranceFeeEn)}
            />
          </FormField>

          <FormField
            label={t("entranceFeeId")}
            htmlFor="entranceFeeId"
            error={errors.entranceFeeId}
          >
            <Input
              id="entranceFeeId"
              name="entranceFeeId"
              value={values.entranceFeeId}
              onChange={(e) => updateField("entranceFeeId", e.target.value)}
              placeholder={t("feePlaceholderId")}
              className={fieldClass(errors.entranceFeeId)}
              aria-invalid={Boolean(errors.entranceFeeId)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
          <FormField label={tCommon("status")} htmlFor="status" error={errors.status}>
            <select
              id="status"
              name="status"
              value={values.status || "DRAFT"}
              onChange={(e) => updateField("status", e.target.value)}
              className={cn(
                "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
                fieldClass(errors.status),
              )}
              aria-invalid={Boolean(errors.status)}
            >
              <option value="DRAFT">{tCommon("draft")}</option>
              <option value="PUBLISHED">{tCommon("published")}</option>
              <option value="ARCHIVED">{tCommon("archived")}</option>
            </select>
          </FormField>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">{tCommon("tags")}</label>
            <div
              className={cn(
                "flex flex-col gap-2 p-3 border border-gray-200 rounded-md bg-gray-50 max-h-40 overflow-y-auto",
                errors.tags && "border-red-400 bg-red-50/40",
              )}
            >
              {AVAILABLE_TAGS.map((tag) => {
                const isChecked = values.tags.includes(tag);
                return (
                  <label
                    key={tag}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      name="tags"
                      value={tag}
                      checked={isChecked}
                      onChange={(e) => toggleTag(tag, e.target.checked)}
                    />
                    {tag}
                  </label>
                );
              })}
            </div>
            {errors.tags && (
              <p className="text-xs text-red-500" role="alert">
                {errors.tags}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">{tCommon("options")}</label>
            <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
              <input
                type="checkbox"
                name="isFeatured"
                value="true"
                checked={values.isFeatured}
                onChange={(e) => updateField("isFeatured", e.target.checked)}
              />
              {tCommon("isFeatured")}
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <Button type="submit" disabled={isPending} className="px-8">
            {isPending ? tCommon("saving") : resolvedSubmitLabel}
          </Button>
        </div>
      </form>

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={handleMediaSelect}
      />
    </>
  );
}
