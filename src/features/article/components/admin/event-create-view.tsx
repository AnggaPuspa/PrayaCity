"use client";

import { Typography } from "@/components/atoms";
import { EventForm } from "./event-form";
import { createEventAction } from "../../actions/event.actions";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function EventCreateView({ categories }: { categories: string[] }) {
  const locale = useLocale();
  const t = useTranslations("Admin.events");
  const tCommon = useTranslations("Admin.common");

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href={`/${locale}/admin/events`}
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
        action={createEventAction}
        submitLabel={t("createSubmit")}
      />
    </div>
  );
}
