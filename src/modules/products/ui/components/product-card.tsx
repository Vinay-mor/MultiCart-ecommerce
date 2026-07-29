import { formatCurrency, generateTenantURL } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  tenantSlug: string;
  tenantImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
  price: number;
  priority?: boolean;
}

export const ProductCard = ({
  id,
  name,
  imageUrl,
  tenantSlug,
  tenantImageUrl,
  reviewRating,
  reviewCount,
  price,
  priority,
}: ProductCardProps) => {
  const router = useRouter();

  const handleTenantClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(generateTenantURL(tenantSlug));
  };

  return (
    <Link prefetch href={`/tenants/${tenantSlug}/products/${id}`}>
      <div className="group cursor-pointer flex flex-col h-full bg-[#ffffff] dark:bg-[#1c1c1a] rounded-sm overflow-hidden border border-[#e2e3e1] dark:border-[#333330] hover:border-[#775a19] dark:hover:border-[#e9c176] transition-all duration-500 editorial-card-shadow">
        <div className="aspect-[3/4] relative overflow-hidden bg-[#f4f4f2] dark:bg-[#1a1a18]">
          <Image
            alt={name}
            fill
            priority={priority}
            src={imageUrl || "/placeholder.png"}
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute top-3 right-3 bg-[#f9f9f7]/90 dark:bg-[#1c1c1a]/90 backdrop-blur-xs px-3 py-0.5 text-[9px] uppercase tracking-widest font-bold text-[#775a19] dark:text-[#e9c176] rounded-full border border-[#d1c5b4]/40">
            Curated
          </div>
        </div>

        <div className="p-5 flex flex-col justify-between flex-1 gap-3">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div
                className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleTenantClick}
              >
                {tenantImageUrl && (
                  <Image
                    alt={tenantSlug}
                    src={tenantImageUrl}
                    width={18}
                    height={18}
                    className="rounded-full border border-[#d1c5b4] shrink-0 size-[18px] object-cover"
                  />
                )}
                <span className="text-[11px] font-medium text-[#775a19] dark:text-[#e9c176] tracking-wider uppercase font-serif">
                  {tenantSlug}
                </span>
              </div>

              {reviewCount > 0 && (
                <div className="flex items-center gap-1 bg-[#fed488]/30 dark:bg-[#47360f]/40 px-2 py-0.5 rounded-full">
                  <StarIcon className="size-3 fill-[#775a19] text-[#775a19] dark:fill-[#e9c176] dark:text-[#e9c176]" />
                  <span className="text-[11px] font-semibold text-[#785a1a] dark:text-[#ffdea5]">
                    {reviewRating.toFixed(1)} ({reviewCount})
                  </span>
                </div>
              )}
            </div>

            <h3 className="font-serif text-base font-bold text-[#1a1c1b] dark:text-[#f9f9f7] line-clamp-2 leading-snug tracking-tight group-hover:text-[#775a19] dark:group-hover:text-[#e9c176] transition-colors">
              {name}
            </h3>
          </div>

          <div className="pt-2 border-t border-[#e2e3e1]/60 dark:border-[#333330]/60 flex items-center justify-between">
            <span className="text-xs text-[#5f5e5e] dark:text-[#cec6b5] font-light uppercase tracking-wider font-serif">
              Price
            </span>
            <span className="font-serif text-base font-bold text-[#775a19] dark:text-[#e9c176]">
              {formatCurrency(price)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="w-full aspect-[3/4] bg-[#e8e8e6] dark:bg-[#2a2a28] rounded-sm animate-pulse" />
  );
};


