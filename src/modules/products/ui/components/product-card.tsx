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
      <div className="group cursor-pointer flex flex-col h-full bg-card rounded-sm overflow-hidden border border-border hover:border-secondary transition-all duration-500 editorial-card-shadow">
        <div className="aspect-[3/4] relative overflow-hidden bg-surface-container-low">
          <Image
            alt={name}
            fill
            priority={priority}
            src={imageUrl || "/placeholder.png"}
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute top-3 right-3 bg-background/90 dark:bg-surface/90 backdrop-blur-xs px-3 py-0.5 text-[9px] uppercase tracking-widest font-bold text-secondary rounded-full border border-outline-variant/40">
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
                    className="rounded-full border border-outline-variant shrink-0 size-[18px] object-cover"
                  />
                )}
                <span className="text-[11px] font-medium text-secondary tracking-wider uppercase font-serif">
                  {tenantSlug}
                </span>
              </div>

              {reviewCount > 0 && (
                <div className="flex items-center gap-1 bg-secondary-container/30 dark:bg-secondary-container/40 px-2 py-0.5 rounded-full">
                  <StarIcon className="size-3 fill-secondary text-secondary" />
                  <span className="text-[11px] font-semibold text-on-secondary-container">
                    {reviewRating.toFixed(1)} ({reviewCount})
                  </span>
                </div>
              )}
            </div>

            <h3 className="font-serif text-base font-bold text-foreground line-clamp-2 leading-snug tracking-tight group-hover:text-secondary transition-colors">
              {name}
            </h3>
          </div>

          <div className="pt-2 border-t border-border/60 flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-light uppercase tracking-wider font-serif">
              Price
            </span>
            <span className="font-serif text-base font-bold text-secondary">
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


