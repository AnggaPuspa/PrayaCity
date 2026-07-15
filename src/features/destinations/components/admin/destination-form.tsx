"use client";

import { useActionState } from "react";
import { Button, Input, Textarea } from "@/components/atoms";
import { FormField } from "@/components/molecules";
import type { DestinationFormState } from "../../types";

import { useState } from "react";
import { MediaPickerModal } from "@/components/molecules";

export interface DestinationFormProps {
  initialData?: any;
  action: (state: DestinationFormState, formData: FormData) => Promise<DestinationFormState>;
  submitLabel?: string;
}

const AVAILABLE_TAGS = ["Nature", "Beach", "Hills", "Heritage"];

export function DestinationForm({ initialData, action, submitLabel = "Save Destination" }: DestinationFormProps) {
  const [state, formAction, isPending] = useActionState(action, { status: "idle", message: "" });
  
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [activeMediaTarget, setActiveMediaTarget] = useState<"imageSrc" | "detailImageSrc" | null>(null);
  
  const [imageSrc, setImageSrc] = useState(initialData?.imageSrc || "");
  const [detailImageSrc, setDetailImageSrc] = useState(initialData?.detailImageSrc || "");

  const handleOpenMediaPicker = (target: "imageSrc" | "detailImageSrc") => {
    setActiveMediaTarget(target);
    setIsMediaPickerOpen(true);
  };

  const handleMediaSelect = (url: string) => {
    if (activeMediaTarget === "imageSrc") setImageSrc(url);
    if (activeMediaTarget === "detailImageSrc") setDetailImageSrc(url);
  };

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
        <FormField label="Slug" htmlFor="slug" error={state.errors?.slug}>
          <Input id="slug" name="slug" defaultValue={initialData?.slug} placeholder="my-destination-slug" />
        </FormField>
        
        <FormField label="Primary Image URL" htmlFor="imageSrc" error={state.errors?.imageSrc}>
          <div className="flex gap-2">
            <Input 
              id="imageSrc" 
              name="imageSrc" 
              value={imageSrc} 
              onChange={(e) => setImageSrc(e.target.value)}
              placeholder="/uploads/image.jpg" 
              className="flex-1"
            />
            <Button type="button" variant="secondary" onClick={() => handleOpenMediaPicker("imageSrc")}>
              Select Media
            </Button>
          </div>
        </FormField>
        
        <FormField label="Detail Image URL (Optional)" htmlFor="detailImageSrc" error={state.errors?.detailImageSrc}>
          <div className="flex gap-2">
            <Input 
              id="detailImageSrc" 
              name="detailImageSrc" 
              value={detailImageSrc} 
              onChange={(e) => setDetailImageSrc(e.target.value)}
              placeholder="/uploads/detail.jpg" 
              className="flex-1"
            />
            <Button type="button" variant="secondary" onClick={() => handleOpenMediaPicker("detailImageSrc")}>
              Select Media
            </Button>
          </div>
        </FormField>

        <FormField label="Title (EN)" htmlFor="titleEn" error={state.errors?.titleEn}>
          <Input id="titleEn" name="titleEn" defaultValue={initialData?.titleEn} />
        </FormField>
        
        <FormField label="Title (ID)" htmlFor="titleId" error={state.errors?.titleId}>
          <Input id="titleId" name="titleId" defaultValue={initialData?.titleId} />
        </FormField>

        <FormField label="Location (EN)" htmlFor="locationEn" error={state.errors?.locationEn}>
          <Input id="locationEn" name="locationEn" defaultValue={initialData?.locationEn} />
        </FormField>
        
        <FormField label="Location (ID)" htmlFor="locationId" error={state.errors?.locationId}>
          <Input id="locationId" name="locationId" defaultValue={initialData?.locationId} />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <FormField label="Description (EN)" htmlFor="descriptionEn" error={state.errors?.descriptionEn}>
          <Textarea id="descriptionEn" name="descriptionEn" defaultValue={initialData?.descriptionEn} rows={2} />
        </FormField>
        
        <FormField label="Description (ID)" htmlFor="descriptionId" error={state.errors?.descriptionId}>
          <Textarea id="descriptionId" name="descriptionId" defaultValue={initialData?.descriptionId} rows={2} />
        </FormField>

        <FormField label="Long Description (EN)" htmlFor="longDescriptionEn" error={state.errors?.longDescriptionEn}>
          <Textarea id="longDescriptionEn" name="longDescriptionEn" defaultValue={initialData?.longDescriptionEn} rows={5} />
        </FormField>
        
        <FormField label="Long Description (ID)" htmlFor="longDescriptionId" error={state.errors?.longDescriptionId}>
          <Textarea id="longDescriptionId" name="longDescriptionId" defaultValue={initialData?.longDescriptionId} rows={5} />
        </FormField>
      </div>

      {/* Status Label & Entrance Fee */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
        <FormField label="Status Label (EN)" htmlFor="statusLabelEn" error={state.errors?.statusLabelEn}>
          <Input id="statusLabelEn" name="statusLabelEn" defaultValue={initialData?.statusLabelEn} placeholder="e.g. Open Daily" />
        </FormField>

        <FormField label="Status Label (ID)" htmlFor="statusLabelId" error={state.errors?.statusLabelId}>
          <Input id="statusLabelId" name="statusLabelId" defaultValue={initialData?.statusLabelId} placeholder="e.g. Buka Setiap Hari" />
        </FormField>

        <FormField label="Entrance Fee (EN)" htmlFor="entranceFeeEn" error={state.errors?.entranceFeeEn}>
          <Input id="entranceFeeEn" name="entranceFeeEn" defaultValue={initialData?.entranceFeeEn} placeholder="e.g. Free (Parking: Rp 5.000 – Rp 10.000)" />
        </FormField>

        <FormField label="Entrance Fee (ID)" htmlFor="entranceFeeId" error={state.errors?.entranceFeeId}>
          <Input id="entranceFeeId" name="entranceFeeId" defaultValue={initialData?.entranceFeeId} placeholder="e.g. Gratis (Parkir: Rp 5.000 – Rp 10.000)" />
        </FormField>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
        <FormField label="Status" htmlFor="status" error={state.errors?.status}>
          <select 
            id="status" 
            name="status" 
            defaultValue={initialData?.status || "DRAFT"}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </FormField>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Tags</label>
          <div className="flex flex-col gap-2 p-3 border border-gray-200 rounded-md bg-gray-50 max-h-40 overflow-y-auto">
            {AVAILABLE_TAGS.map(tag => {
              const isChecked = initialData?.tags?.includes(tag);
              return (
                <label key={tag} className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" name="tags" value={tag} defaultChecked={isChecked} />
                  {tag}
                </label>
              );
            })}
          </div>
          {state.errors?.tags && <p className="text-xs text-red-500">{state.errors.tags}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Options</label>
          <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
            <input type="checkbox" name="isFeatured" value="true" defaultChecked={initialData?.isFeatured} />
            Is Featured?
          </label>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100 flex justify-end">
        <Button type="submit" disabled={isPending} className="px-8">
          {isPending ? "Saving..." : submitLabel}
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
