import Image from "next/image";

const DISCOVER_ITEMS = [
  {
    id: "01",
    title: "History",
    description: "From the mighty Majapahit expeditions to the rise of Sasak kingdoms, Central Lombok carries centuries of history within its soil. Discover how a land shaped by legend became a cornerstone of Indonesian heritage.",
    image: "/discoversection/histroyyfoto.svg",
  },
  {
    id: "02",
    title: "Culture",
    description: "Witness sacred rituals passed down for generations, hear the thunder of Gendang Beleq drums, and taste flavors so bold they redefine your idea of Indonesian cuisine. Central Lombok's culture is lived every single day.",
    image: "/discoversection/category-information-2.svg",
  },
  {
    id: "03",
    title: "Destinations",
    description: "From white-sand beaches with pepper-shaped grains found nowhere else on earth, to rolling green hills overlooking the Indian Ocean — Central Lombok holds landscapes that defy expectation. Your perfect destination is already here.",
    image: "/discoversection/category-information-3.svg",
  },
  {
    id: "04",
    title: "Programs & Events",
    description: "Home to the first street circuit in the world to host MotoGP, Central Lombok is where tradition and ambition collide. Explore a packed calendar of events that draw visitors from across the globe.",
    image: "/discoversection/category-information-3.svg",
  }
];

export function DiscoverSection() {
  return (
    <section className="w-full bg-[#0B132B] py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <h2 className="text-white text-[40px] md:text-[48px] font-bold leading-[1.2] max-w-[500px]">
            Discover Central Lombok - PrayaCity
          </h2>
          <p className="text-white/70 text-[15px] leading-[1.6] max-w-[380px] md:text-right pb-2">
            From ancient legends to world-class events — Central Lombok is more than a destination, it's an experience waiting to be lived.
          </p>
        </div>

        {/* List */}
        <div className="flex flex-col border-t border-white/10">
          {DISCOVER_ITEMS.map((item, index) => {
            const isFirst = index === 0;
            return (
              <div 
                key={item.id}
                className="group flex flex-col lg:flex-row items-start lg:items-center py-8 lg:py-10 border-b border-white/10 gap-6 lg:gap-10 transition-colors cursor-pointer"
              >
                {/* Number */}
                <span className="text-white/70 text-[15px] font-medium w-[40px] shrink-0">
                  {item.id}
                </span>

                {/* Image */}
                <div className="relative w-full lg:w-[260px] aspect-[16/9] lg:aspect-[1.8/1] overflow-hidden rounded-[1rem] shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Text */}
                <div className="flex-1 lg:pl-4">
                  <h3 className="text-white text-[24px] lg:text-[28px] font-bold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-[15px] leading-[1.7] max-w-[800px]">
                    {item.description}
                  </p>
                </div>

                {/* Icon */}
                <div className="hidden lg:flex shrink-0 w-[50px] h-[50px] rounded-full border border-white/20 items-center justify-center transition-colors group-hover:bg-[#0055FF] group-hover:border-[#0055FF] ml-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 group-hover:text-white transition-colors">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
