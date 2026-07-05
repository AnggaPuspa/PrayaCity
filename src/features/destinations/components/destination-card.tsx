import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { DestinationItem } from "../types";

interface DestinationCardProps {
  item: DestinationItem;
  title: string;
  description: string;
}

export function DestinationCard({ item, title, description }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${item.id}`} className="flex flex-col w-full group cursor-pointer">
      <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden mb-6">
        <Image
          src={item.imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {item.tags.map((tag, idx) => (
          <span 
            key={idx}
            className="px-4 py-1.5 rounded-full border border-white/20 text-white/70 text-[13px] font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-white text-[20px] font-bold mb-2">
        {title}
      </h3>
      <p className="text-white/60 text-[14px] leading-relaxed line-clamp-2">
        {description}
      </p>
    </Link>
  );
}
