"use client";

import { useTranslations } from "next-intl";

import { useActionState } from "react";
import { Button, Input, Textarea } from "@/components/atoms";
import { FormField } from "@/components/molecules";
import type { EventFormState } from "../../types";

import { useState } from "react";
import { MediaPickerModal } from "@/components/molecules";

export interface EventFormProps {
  initialData?: any;
  availableCategories: string[];
  action: (state: EventFormState, formData: FormData) => Promise<EventFormState>;
  submitLabel?: string;
}

export function EventForm({ initialData, availableCategories, action, submitLabel }: EventFormProps) {
  const t = useTranslations("Admin.events");
  const tCommon = useTranslations("Admin.common");
  const resolvedSubmitLabel = submitLabel ?? t("saveSubmit");
  const [state, formAction, isPending] = useActionState(action, { status: "idle", message: "" });
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialData?.image || "");

  return (
    <>
    <form action={formAction} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-8">
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
        <FormField label={t("slug")} htmlFor="slug" error={state.errors?.slug}>
          <Input id="slug" name="slug" defaultValue={initialData?.slug} placeholder={t("slugPlaceholder")} />
        </FormField>
        
        <FormField label={t("image")} htmlFor="image" error={state.errors?.image}>
          <div className="flex gap-2">
            <Input 
              id="image" 
              name="image" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/uploads/image.jpg" 
              className="flex-1"
            />
            <Button type="button" variant="secondary" onClick={() => setIsMediaPickerOpen(true)}>
              Select Media
            </Button>
          </div>
        </FormField>

        <FormField label={t("titleEn")} htmlFor="titleEn" error={state.errors?.titleEn}>
          <Input id="titleEn" name="titleEn" defaultValue={initialData?.titleEn} />
        </FormField>
        
        <FormField label={t("titleId")} htmlFor="titleId" error={state.errors?.titleId}>
          <Input id="titleId" name="titleId" defaultValue={initialData?.titleId} />
        </FormField>

        <FormField label={t("dateEn")} htmlFor="dateEn" error={state.errors?.dateEn}>
          <Input id="dateEn" name="dateEn" defaultValue={initialData?.dateEn} placeholder="February 2025" />
        </FormField>
        
        <FormField label={t("dateId")} htmlFor="dateId" error={state.errors?.dateId}>
          <Input id="dateId" name="dateId" defaultValue={initialData?.dateId} placeholder="Februari 2025" />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label={t("excerptEn")} htmlFor="excerptEn" error={state.errors?.excerptEn}>
          <Textarea id="excerptEn" name="excerptEn" defaultValue={initialData?.excerptEn} rows={3} />
        </FormField>
        
        <FormField label={t("excerptId")} htmlFor="excerptId" error={state.errors?.excerptId}>
          <Textarea id="excerptId" name="excerptId" defaultValue={initialData?.excerptId} rows={3} />
        </FormField>

        <FormField label={t("bodyEn")} htmlFor="bodyEn" error={state.errors?.bodyEn}>
          <Textarea id="bodyEn" name="bodyEn" defaultValue={initialData?.bodyEn?.join("\n\n") || initialData?.bodyEn} rows={6} />
        </FormField>
        
        <FormField label={t("bodyId")} htmlFor="bodyId" error={state.errors?.bodyId}>
          <Textarea id="bodyId" name="bodyId" defaultValue={initialData?.bodyId?.join("\n\n") || initialData?.bodyId} rows={6} />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
        <FormField label={tCommon("status")} htmlFor="status" error={state.errors?.status}>
          <select 
            id="status" 
            name="status" 
            defaultValue={initialData?.status || "DRAFT"}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="DRAFT">{tCommon("draft")}</option>
            <option value="PUBLISHED">{tCommon("published")}</option>
            <option value="ARCHIVED">{tCommon("archived")}</option>
          </select>
        </FormField>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">{t("categories")}</label>
          <div className="flex flex-col gap-2 p-3 border border-gray-200 rounded-md bg-gray-50 max-h-40 overflow-y-auto">
            {availableCategories.map(cat => {
              const isChecked = initialData?.categories?.some((c: any) => c.category?.name === cat || c === cat);
              return (
                <label key={cat} className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" name="categories" value={cat} defaultChecked={isChecked} />
                  {cat}
                </label>
              );
            })}
          </div>
          {state.errors?.categories && <p className="text-xs text-red-500">{state.errors.categories}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">{tCommon("options")}</label>
          <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
            <input type="checkbox" name="isFeatured" value="true" defaultChecked={initialData?.isFeatured} />
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
      onSelect={(url) => setImageUrl(url)} 
    />
    </>
  );
}
