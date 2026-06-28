import Image from "next/image";
import { Typography } from "@/components/atoms";

const events = [
  {
    title: "Festival PesonaBau Nyale\n2025",
    date: "February 2025",
    location: "Seger Beach, Kuta Mandalika",
    image: "/landingpageasset/festivalpesonabau.png",
    className: "col-span-1 md:row-span-2 md:col-span-1 h-[400px] md:h-full",
  },
  {
    title: "MotoGP Pertamina\nGrand Prix of Indonesia",
    date: "October 2025",
    location: "Pertamina Mandalika\nInternational Circuit",
    image: "/landingpageasset/motogp.png",
    className: "col-span-1 h-[300px] md:h-auto",
  },
  {
    title: "Presean Cultural\nChampionship",
    date: "August 2025",
    location: "Sade Traditional Village, Pujut",
    image: "/landingpageasset/preseencaltural.png",
    className: "col-span-1 h-[300px] md:h-auto",
  },
  {
    title: "Lombok Tengah Weaving\nFestival",
    date: "September 2025",
    location: "Sukarara Village",
    image: "/landingpageasset/lomboktenggah.png",
    className: "col-span-1 h-[300px] md:h-auto",
  },
  {
    title: "Mandalika Korpri Fun\nNight Run",
    date: "December 2025",
    location: "Kuta Mandalika Beach Park",
    image: "/landingpageasset/mandalikakorprifun.png",
    className: "col-span-1 h-[300px] md:h-auto",
  },
];

export function LatestEvents() {
  return (
    <section className="w-full bg-[#0a0a0a] pt-16 pb-0 text-white">
      <div className="mx-auto w-full max-w-7xl px-8 mb-10">
        <Typography as="h2" variant="h2" className="text-white text-3xl font-medium tracking-tight">
          Latest from Praya
        </Typography>
      </div>
      
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:h-[650px] w-full">
          {events.map((event, index) => (
            <div key={index} className={`relative group overflow-hidden ${event.className}`}>
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end">
                <Typography as="h3" variant="h3" className="text-white text-xl md:text-[22px] font-medium leading-snug mb-2 whitespace-pre-line">
                  {event.title}
                </Typography>
                <Typography variant="muted" className="text-zinc-300 text-xs md:text-sm font-light whitespace-pre-line md:whitespace-normal">
                  {event.date} · {event.location}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
