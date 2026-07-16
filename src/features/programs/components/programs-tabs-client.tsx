"use client";

import { cn } from "@/lib/utils/cn";
import { useProgramsTabsController } from "../controllers/use-programs-tabs";
import type { ProgramsTabData } from "../types";

/* ── SVG Icon map (zero-dep, inline) ───────────────────────── */

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  Building2: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
  ),
  Store: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2v-3"/><path d="M18 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2v-3"/><path d="M14 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2v-3"/><path d="M10 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2v-3"/><path d="M6 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2v-3"/></svg>
  ),
  Landmark: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
  ),
  Tractor: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m10 11 11 .9c.6 0 1.1.5 1.1 1.1v2.5c0 .6-.5 1.1-1.1 1.1l-11-.9"/><path d="M16 16v-2"/><path d="M7 15a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/><path d="M20 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/><path d="M10 11V4h4v7"/><path d="M7 15v-5h3v5"/></svg>
  )
};

/* ── Container: wires controller to view ───────────────────── */

export interface ProgramsTabsClientProps {
  tabs: ProgramsTabData[];
}

/**
 * Container component: wires the tabs controller to the presentational view.
 */
export function ProgramsTabsClient({ tabs }: ProgramsTabsClientProps) {
  const { activeTab, setActiveTab, currentTabData } = useProgramsTabsController(tabs);

  return (
    <ProgramsTabsView
      tabs={tabs}
      activeTab={activeTab}
      currentTabData={currentTabData}
      onTabChange={setActiveTab}
    />
  );
}

/* ── Pure presentational view (no hooks, no logic) ──────────── */

interface ProgramsTabsViewProps {
  tabs: ProgramsTabData[];
  activeTab: string;
  currentTabData: ProgramsTabData;
  onTabChange: (tabId: string) => void;
}

function ProgramsTabsView({ tabs, activeTab, currentTabData, onTabChange }: ProgramsTabsViewProps) {
  return (
    <section className="w-full py-16 px-6 md:px-12 bg-white flex flex-col items-center">
      {/* Tabs */}
      <div className="bg-[#F3F4F6] p-1.5 rounded-full inline-flex flex-wrap md:flex-nowrap items-center justify-center gap-1 md:gap-2 mb-10 max-w-full overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = ICONS[tab.icon];
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 md:px-8 py-2.5 rounded-full text-[14px] md:text-[15px] font-medium transition-all whitespace-nowrap",
                isActive 
                  ? "bg-[#0064F2] text-white shadow-sm" 
                  : "text-[#4B5563] hover:text-[#111827] hover:bg-white/50"
              )}
            >
              <Icon className="w-[18px] h-[18px]" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-[28px] md:text-[36px] font-bold text-[#111827] mb-3 tracking-tight">
          {currentTabData.title}
        </h2>
        <p className="text-[#6B7280] text-[15px] md:text-[16px] leading-relaxed max-w-3xl mb-12 font-medium px-4">
          {currentTabData.description}
        </p>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentTabData.stats.map((stat, idx) => {
            const isFirst = idx === 0;
            return (
              <div
                key={idx}
                className={cn(
                  "relative flex flex-col justify-end min-h-[220px] md:min-h-[240px] rounded-[24px] p-6 text-left transition-all",
                  isFirst ? "bg-[#0064F2] text-white" : "bg-[#F3F4F6] text-[#111827]"
                )}
              >
                {/* Small dot on top right */}
                <div 
                  className={cn(
                    "absolute top-6 right-6 w-1.5 h-1.5 rounded-full",
                    isFirst ? "bg-white" : "bg-[#111827]"
                  )} 
                />
                
                <div className="mt-auto flex flex-col gap-2">
                  <span className="text-[40px] md:text-[48px] font-light leading-none tracking-tight">
                    {stat.value}
                  </span>
                  <span className={cn(
                    "text-[13px] md:text-[14px] font-medium leading-[1.4] max-w-[90%]",
                    isFirst ? "text-white/90" : "text-[#4B5563]"
                  )}>
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
