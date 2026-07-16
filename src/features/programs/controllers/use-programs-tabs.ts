/**
 * Controller for the Programs Tabs section.
 * Manages active tab state so the view stays presentational.
 */

import { useState } from "react";
import type { ProgramsTabData } from "../types";

export function useProgramsTabsController(tabs: ProgramsTabData[]) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const currentTabData = tabs.find((t) => t.id === activeTab) || tabs[0];

  return { activeTab, setActiveTab, currentTabData };
}
