"use client";

import { useTranslations } from "next-intl";

import Image from "next/image";
import { Typography, Button } from "@/components/atoms";
import { Link } from "@/i18n/navigation";
import { ContentOverviewChart } from "./content-overview-chart";
import { TotalContentChart } from "./total-content-chart";
import { downloadDashboardReportAction } from "../actions/dashboard.actions";

export interface DashboardViewProps {
  locale: string;
  stats: {
    events: { total: number; published: number };
    destinations: { total: number; published: number };
    recentLogs?: any[];
    chartData?: any[];
  };
}

export function DashboardView({ locale, stats }: DashboardViewProps) {
  const t = useTranslations("Admin.dashboard");
  const tHeader = useTranslations("Admin.header");
  const tCommon = useTranslations("Admin.common");
  const currentMonthYear = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(new Date());

  const handleDownload = async () => {
    const result = await downloadDashboardReportAction();
    if (result.success && result.csvContent) {
      const blob = new Blob([result.csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `prayacity-report-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      alert("Failed to generate report.");
    }
  };

  return (
    <div className="w-full font-sans pb-10 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="text-[14px] text-gray-500 mb-1">
            {tHeader("hi")} {tHeader("admin")}
          </div>
          <h1 className="text-[28px] font-semibold text-[#111827] tracking-tight">{t("title")}</h1>
        </div>
        <div className="flex items-center gap-3 relative z-30">
          <button className="bg-white border border-gray-200 text-gray-600 px-3.5 py-2 rounded-md text-[13px] font-medium flex items-center gap-2 shadow-sm cursor-default">
            Today, {new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).format(new Date())}
          </button>
          
          <div className="relative group">
            <button className="bg-[#2143a5] hover:bg-[#1a3584] text-white px-4 py-2 rounded-md text-[13px] font-medium transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer">
              <span>+</span> {tCommon("addNew")}
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/admin/events" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">{t("events")}</Link>
              <Link href="/admin/destinations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">{t("destinations")}</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Left Column (Banner + 2 small cards) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Banner */}
          <div className="bg-[#f0f4f8] rounded-2xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden h-[240px]">
             {/* Background Illustration */}
             <div className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block">
               <Image 
                 src="/Desain%20tanpa%20judul.svg" 
                 alt="Decoration" 
                 fill
                 className="object-contain object-right"
                 priority
               />
             </div>
             
             {/* Content */}
             <div className="relative z-10 max-w-sm mt-4">
               <Typography variant="h2" className="text-[24px] md:text-[28px] font-medium text-[#0f172a] dark:text-[#0f172a] leading-[1.3] tracking-tight">
                 Hey Admin,<br/>
                 Download latest report
               </Typography>
               <Button onClick={handleDownload} className="mt-6 bg-[#1e40af] text-white hover:bg-[#1e3a8a] px-7 rounded-lg">
                 Download
               </Button>
             </div>
          </div>

          {/* 2 Small Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Published Events card */}
            <div className="bg-[#2143a5] rounded-2xl p-6 text-white relative overflow-hidden flex flex-col justify-between h-[160px]">
              <div className="flex justify-between items-start">
                <span className="text-blue-100 font-medium text-[15px]">{t("publishedEvents")}</span>
                <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="text-[32px] font-bold tracking-tight">{stats.events.published}</div>
                <div className="text-blue-200 text-[13px] mt-1">Out of {stats.events.total} total</div>
              </div>
            </div>

            {/* Published Destinations card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] h-[160px] flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-gray-500 font-medium text-[13px]">{t("publishedDestinations")}</span>
                  <div className="text-[28px] font-bold text-gray-900 mt-1">{stats.destinations.published}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">$</span>
                </div>
              </div>
              <div className="mt-4 w-full h-12 flex items-end">
                {/* SVG sparkline */}
                <svg className="w-full h-full text-blue-600" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0,25 C20,25 30,5 50,15 C70,25 80,5 100,20 C120,5 130,25 150,20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Content Overview Chart) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] h-full min-h-[420px] flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-[17px] font-semibold text-gray-900 mb-1">Content Overview</h3>
              <p className="text-gray-500 text-[13px]">{t("eventsVsDestinations")}</p>
            </div>
            <div className="flex items-center gap-3 text-[12px] font-medium">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#2143a5]"></span>{t("events")}</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#3abff8]"></span>Dest</div>
            </div>
          </div>
          
          <div className="flex-1 w-full relative pb-2 pt-4">
            {stats.chartData && <ContentOverviewChart data={stats.chartData} />}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Total Stats (Doughnut Chart) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-[17px] font-semibold text-gray-900 mb-1">Total Content</h3>
              <p className="text-gray-500 text-[13px]">Overview of all items</p>
            </div>
            <button className="text-gray-500 border border-gray-200 px-2.5 py-1.5 rounded-md text-[12px] capitalize">{currentMonthYear} v</button>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 text-[13px]">Total Count</span>
            <span className="text-[26px] font-bold text-gray-900 tracking-tight">{stats.events.total + stats.destinations.total}</span>
          </div>

          <div className="flex-1 w-full relative flex items-center justify-center min-h-[220px]">
             <TotalContentChart eventsTotal={stats.events.total} destinationsTotal={stats.destinations.total} />
          </div>

          <div className="flex justify-center gap-6 text-[12px] font-medium text-gray-600 mt-4">
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#2143a5]"></span>Events</div>
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#0ea5e9]"></span>Dest</div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-[17px] font-semibold text-gray-900 mb-1">Recent Activity</h3>
              <p className="text-gray-500 text-[13px]">System logs & modifications</p>
            </div>
            <button className="text-gray-500 border border-gray-200 px-2.5 py-1.5 rounded-md text-[12px]">March 2025 v</button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-medium px-2">Assigned</th>
                  <th className="pb-3 font-medium px-2">Name / Entity</th>
                  <th className="pb-3 font-medium px-2">Action</th>
                  <th className="pb-3 font-medium text-right px-2">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {stats.recentLogs && stats.recentLogs.map((log: any) => (
                  <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                          {log.user?.name?.charAt(0) || "A"}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{log.user?.name || "Admin"}</div>
                          <div className="text-[11px] text-gray-500">{log.user?.role || "Administrator"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                       <span className="text-gray-700 font-medium capitalize">{log.entityType || "System"}</span>
                    </td>
                    <td className="py-3 px-2">
                      {log.action === "create" && <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-blue-100 text-blue-700">{t("created")}</span>}
                      {log.action === "update" && <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-yellow-100 text-yellow-700">{t("updated")}</span>}
                      {log.action === "delete" && <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-red-100 text-red-700">{t("deleted")}</span>}
                      {log.action === "publish" && <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-green-100 text-green-700">Published</span>}
                      {log.action === "login" && <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-purple-100 text-purple-700">{t("loginAction")}</span>}
                      {!["create", "update", "delete", "publish", "login"].includes(log.action) && 
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-gray-100 text-gray-700">{log.action}</span>
                      }
                    </td>
                    <td className="py-3 px-2 text-right text-gray-900 font-medium">
                      {new Date(log.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {(!stats.recentLogs || stats.recentLogs.length === 0) && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">{t("noRecentActivity")}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
