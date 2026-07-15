import Image from "next/image";
import { Typography } from "@/components/atoms";
import { Link } from "@/i18n/navigation";
import type { FeaturedEvent } from "../types";

interface EventsHeroFeaturedViewProps {
  events: FeaturedEvent[];
}

/** Presentational: featured events hero (1 main + 2 stacked) from props only. */
export function EventsHeroFeaturedView({ events }: EventsHeroFeaturedViewProps) {
  if (!events || events.length === 0) return null;

  const mainEvent = events[0];
  const sideEvents = events.slice(1, 3);

  return (
    <section className="w-full bg-[#FAF9F6] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Main Featured Event */}
          <div className="lg:col-span-8 flex flex-col group">
            <Link href={`/events/${mainEvent.slug}`} className="block">
              <div className="bg-black relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[24px] mb-5">
                <Image
                  src={mainEvent.image}
                  alt={mainEvent.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition duration-300 group-hover:scale-105 opacity-40 group-hover:opacity-100"
                  priority
                />
              </div>
              <Typography variant="muted" className="text-zinc-500 dark:text-zinc-500 text-sm mb-2">
                {mainEvent.category}
              </Typography>
              <Typography as="h2" variant="h2" className="text-zinc-900 dark:text-zinc-900 text-2xl md:text-3xl font-medium leading-tight group-hover:text-zinc-600 dark:group-hover:text-zinc-600 transition-colors">
                {mainEvent.title}
              </Typography>
            </Link>
          </div>

          {/* Side Stacked Events */}
          <div className="lg:col-span-4 flex flex-col gap-8 md:gap-10">
            {sideEvents.map((event, index) => (
              <div key={index} className="flex flex-col group">
                <Link href={`/events/${event.slug}`} className="block">
                  <div className="bg-black relative w-full aspect-[16/9] lg:aspect-[4/3] overflow-hidden rounded-[24px] mb-4">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition duration-300 group-hover:scale-105 opacity-40 group-hover:opacity-100"
                    />
                  </div>
                  <Typography variant="muted" className="text-zinc-500 dark:text-zinc-500 text-sm mb-2">
                    {event.category}
                  </Typography>
                  <Typography as="h3" variant="h3" className="text-zinc-900 dark:text-zinc-900 text-xl font-medium leading-tight group-hover:text-zinc-600 dark:group-hover:text-zinc-600 transition-colors">
                    {event.title}
                  </Typography>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
