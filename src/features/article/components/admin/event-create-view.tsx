"use client";

import { Typography } from "@/components/atoms";
import { EventForm } from "./event-form";
import { createEventAction } from "../../actions/event.actions";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { EventFormState } from "../../types";

export function EventCreateView({ categories }: { categories: string[] }) {
  const t = useTranslations("Admin.events");
  const tCommon = useTranslations("Admin.common");
  const router = useRouter();

  async function action(
    prev: EventFormState,
    formData: FormData,
  ): Promise<EventFormState> {
    const result = await createEventAction(prev, formData);
    if (result.status === "success") {
      queueMicrotask(() => {
        router.push("/admin/events");
        router.refresh();
      });
    }
    return result;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/events"
          className="text-gray-500 hover:text-gray-900"
        >
          {tCommon("back")}
        </Link>
        <Typography variant="h3" as="h1" className="text-gray-900 m-0">
          {t("createTitle")}
        </Typography>
      </div>
      <EventForm
        availableCategories={categories}
        action={action}
        submitLabel={t("createSubmit")}
      />
    </div>
  );
}
