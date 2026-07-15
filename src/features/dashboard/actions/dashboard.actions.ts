"use server";

import { getReportStats } from "../services/report.service";

export async function downloadDashboardReportAction() {
  try {
    const stats = await getReportStats();

    // Generate a simple CSV string
    const csvLines = [
      "Metric,Count",
      `Total Events,${stats.totalEvents}`,
      `Published Events,${stats.publishedEvents}`,
      `Total Destinations,${stats.totalDestinations}`,
      `Published Destinations,${stats.publishedDestinations}`,
      `Generated At,${new Date().toISOString()}`
    ];

    const csvContent = csvLines.join("\n");
    return { success: true, csvContent };
  } catch (error) {
    console.error("Failed to generate report:", error);
    return { success: false, error: "Failed to generate report" };
  }
}
