import Image from "next/image";
import { Typography } from "@/components/atoms";
import { Link } from "@/i18n/navigation";
import type { EventItem } from "../types";

interface LatestEventsViewProps {
  heading: string;
  events: EventItem[];
}

/** Presentational: renders the events grid from props only. */
export function LatestEventsView({ heading, events }: LatestEventsViewProps) {
  return (
    <section className="w-full bg-[#0a0a0a] pt-16 pb-0 text-white">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 mb-10">
        <Typography
          as="h2"
          variant="h2"
          className="text-white text-3xl font-medium tracking-tight"
        >
          {heading}
        </Typography>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:h-[650px] w-full">
          {events.map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className={`relative group overflow-hidden block ${event.className}`}
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-300 group-hover:scale-105 opacity-40 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end">
                <Typography
                  as="h3"
                  variant="h3"
                  className="text-white text-xl md:text-[22px] font-medium leading-snug mb-2 whitespace-pre-line"
                >
                  {event.title}
                </Typography>
                <Typography
                  variant="muted"
                  className="text-zinc-300 text-xs md:text-sm font-light whitespace-pre-line md:whitespace-normal"
                >
                  {event.date} · {event.category}
                </Typography>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
