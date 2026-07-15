import { Typography } from "@/components/atoms";

export interface DashboardViewProps {
  locale: string;
  stats: {
    events: { total: number; published: number };
    destinations: { total: number; published: number };
  };
}

export function DashboardView({ locale, stats }: DashboardViewProps) {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <Typography variant="h3" as="h1" className="text-gray-900">
          Dashboard Overview
        </Typography>
        <p className="text-gray-500 mt-1">Welcome back, Admin. Here is what is happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 rounded-full bg-blue-50 transition-transform group-hover:scale-110" />
          <span className="text-gray-500 text-sm font-medium relative z-10">Total Events</span>
          <span className="text-3xl font-bold text-gray-900 mt-2 relative z-10">{stats.events.total}</span>
          <div className="mt-4 flex items-center text-sm text-green-600 font-medium relative z-10">
            {stats.events.published} Published
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 rounded-full bg-purple-50 transition-transform group-hover:scale-110" />
          <span className="text-gray-500 text-sm font-medium relative z-10">Total Destinations</span>
          <span className="text-3xl font-bold text-gray-900 mt-2 relative z-10">{stats.destinations.total}</span>
          <div className="mt-4 flex items-center text-sm text-green-600 font-medium relative z-10">
            {stats.destinations.published} Published
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow md:col-span-2 lg:col-span-2">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-32 h-32 rounded-full bg-pink-50 transition-transform group-hover:scale-110" />
          <span className="text-gray-500 text-sm font-medium relative z-10">Quick Actions</span>
          <div className="mt-4 flex gap-4 relative z-10">
            <a href={`/${locale}/admin/events`} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
              Manage Events
            </a>
            <a href={`/${locale}/admin/destinations`} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors shadow-sm">
              Manage Destinations
            </a>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
        <Typography variant="h3" as="h2" className="text-gray-800 mb-6">
          Content Activity
        </Typography>
        <div className="h-64 w-full bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center">
          <span className="text-gray-400 font-medium">Activity Chart (Coming Soon)</span>
        </div>
      </div>
    </div>
  );
}
