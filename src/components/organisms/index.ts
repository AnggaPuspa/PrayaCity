// Public API for the Organisms layer.
// Organisms may depend on Atoms and Molecules.
// Truly shared, app-wide chrome only. Page-specific sections live in features/.
export { SiteHeader } from "./site-header";
export { SiteFooter } from "./site-footer";
export { AdminSidebar } from "./admin-sidebar";
export { AdminHeader } from "./admin-header";
export { DataTable } from "./data-table";
export type { ColumnDef } from "./data-table";
