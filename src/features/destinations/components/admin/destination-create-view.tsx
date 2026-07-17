"use client";

import { Typography } from "@/components/atoms";
import { DestinationForm } from "./destination-form";
import { createDestinationAction } from "../../actions/destination.actions";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function DestinationCreateView() {
  const locale = useLocale();
  const t = useTranslations("Admin.destinations");
  const tCommon = useTranslations("Admin.common");

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href={`/${locale}/admin/destinations`}
          className="text-gray-500 hover:text-gray-900"
        >
          {tCommon("back")}
        </Link>
        <Typography variant="h3" as="h1" className="text-gray-900 m-0">
          {t("createTitle")}
        </Typography>
      </div>
      <DestinationForm
        action={createDestinationAction}
        submitLabel={t("createSubmit")}
      />
    </div>
  );
}
