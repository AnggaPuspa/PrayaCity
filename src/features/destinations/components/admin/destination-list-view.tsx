"use client";

import { DataTable, type ColumnDef } from "@/components/organisms/data-table";
import { Button, Typography } from "@/components/atoms";
import Link from "next/link";
import { useLocale } from "next-intl";
import { deleteDestinationAction } from "../../actions/destination.actions";
import { useTransition } from "react";

interface AdminDestination {
  id: string;
  slug: string;
  titleEn: string;
  status: string;
  isFeatured: boolean;
  tags: string[];
}

interface DestinationListViewProps {
  destinations: AdminDestination[];
}

export function DestinationListView({ destinations }: DestinationListViewProps) {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this destination?")) {
      startTransition(() => {
        deleteDestinationAction(id);
      });
    }
  };

  const columns: ColumnDef<AdminDestination>[] = [
    {
      header: "Title (EN)",
      accessorKey: "titleEn",
    },
    {
      header: "Status",
      cell: (row) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${row.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
          {row.status}
        </span>
      ),
    },
    {
      header: "Featured",
      cell: (row) => (
        <span className="text-gray-600">{row.isFeatured ? "Yes" : "No"}</span>
      ),
    },
    {
      header: "Tags",
      cell: (row) => (
        <span className="text-gray-600">
          {row.tags.join(", ")}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex gap-3">
          <Link href={`/${locale}/admin/destinations/${row.id}/edit`} className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium transition-colors">
            Edit
          </Link>
          <button 
            onClick={() => handleDelete(row.id)} // We need to ensure we pass the correct ID. The service deletes by slug if id wasn't changed. Actually the seed uses slug as id.
            disabled={isPending}
            className="text-red-600 hover:text-red-800 hover:underline text-sm font-medium transition-colors disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <Typography variant="h3" as="h1" className="text-gray-900">
            Destinations Management
          </Typography>
          <p className="text-sm text-gray-500 mt-1">Manage all tourism destinations here.</p>
        </div>
        <Link href={`/${locale}/admin/destinations/create`}>
          <Button>Create Destination</Button>
        </Link>
      </div>

      <DataTable columns={columns} data={destinations} />
    </div>
  );
}
