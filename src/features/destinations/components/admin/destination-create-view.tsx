"use client";

import { Typography } from "@/components/atoms";
import { DestinationForm } from "./destination-form";
import { createDestinationAction } from "../../actions/destination.actions";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { DestinationFormState } from "../../types";

export function DestinationCreateView() {
  const t = useTranslations("Admin.destinations");
  const tCommon = useTranslations("Admin.common");
  const router = useRouter();

  async function action(
    prev: DestinationFormState,
    formData: FormData,
  ): Promise<DestinationFormState> {
    const result = await createDestinationAction(prev, formData);
    if (result.status === "success") {
      // Redirect after create so admin list reloads with fresh server data.
      queueMicrotask(() => {
        router.push("/admin/destinations");
        router.refresh();
      });
    }
    return result;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/destinations"
          className="text-gray-500 hover:text-gray-900"
        >
          {tCommon("back")}
        </Link>
        <Typography variant="h3" as="h1" className="text-gray-900 m-0">
          {t("createTitle")}
        </Typography>
      </div>
      <DestinationForm action={action} submitLabel={t("createSubmit")} />
    </div>
  );
}
