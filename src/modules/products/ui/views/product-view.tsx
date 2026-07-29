"use client";

import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, generateTenantURL } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CheckIcon, LinkIcon, StarIcon, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { useState } from "react";
import { RichText } from "@payloadcms/richtext-lexical/react";

const CartButton = dynamic(
  () => import("../components/cart-button").then((mod) => mod.CartButton),
  {
    ssr: false,
    loading: () => (
      <Button disabled className="flex-1 satin-gradient text-white font-serif uppercase tracking-widest text-xs py-3">
        Add to cart
      </Button>
    ),
  }
);

interface ProductViewProps {
  productId: string;
  tenantSlug: string;
}

export const ProductView = ({ productId, tenantSlug }: ProductViewProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({ id: productId })
  );
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className="px-4 lg:px-12 py-12 max-w-screen-2xl mx-auto bg-[#f9f9f7] dark:bg-[#141413] text-[#1a1c1b] dark:text-[#f9f9f7] transition-colors">
      <div className="border border-[#e2e3e1] dark:border-[#333330] rounded-sm bg-[#ffffff] dark:bg-[#1c1c1a] overflow-hidden editorial-card-shadow">
        {/* Banner Hero Image */}
        <div className="relative aspect-[3.2] sm:aspect-[3.8] border-b border-[#e2e3e1] dark:border-[#333330] bg-[#eeeeec] dark:bg-[#222220]">
          <Image
            src={data.image?.url || "/placeholder.png"}
            alt={data.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 80vw"
          />
          <div className="absolute top-4 left-4 bg-[#f9f9f7]/90 dark:bg-[#1c1c1a]/90 backdrop-blur-xs px-4 py-1 text-xs uppercase tracking-widest font-serif font-semibold text-[#775a19] dark:text-[#e9c176] rounded-full border border-[#d1c5b4]/40">
            Editorial Piece
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6">
          {/* Main Info */}
          <div className="col-span-4">
            <div className="p-8 border-b border-[#e2e3e1] dark:border-[#333330]">
              <span className="text-xs uppercase tracking-[0.25em] text-[#775a19] dark:text-[#e9c176] font-serif font-semibold block mb-2">
                Atelier Series
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1a1c1b] dark:text-[#f9f9f7]">
                {data.name}
              </h1>
            </div>

            <div className="border-b border-[#e2e3e1] dark:border-[#333330] flex flex-wrap items-center">
              <div className="px-8 py-5 flex items-center justify-center border-r border-[#e2e3e1] dark:border-[#333330]">
                <div className="px-4 py-1.5 rounded-xs bg-[#fed488]/30 dark:bg-[#47360f]/40 border border-[#775a19]/30">
                  <p className="font-serif text-xl font-bold text-[#775a19] dark:text-[#e9c176]">
                    {formatCurrency(data.price)}
                  </p>
                </div>
              </div>

              <div className="px-8 py-5 flex items-center justify-center border-r border-[#e2e3e1] dark:border-[#333330]">
                <Link
                  href={generateTenantURL(tenantSlug)}
                  className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                >
                  {data.tenant.image?.url && (
                    <Image
                      src={data.tenant.image?.url}
                      alt={data.tenant.name}
                      width={24}
                      height={24}
                      className="rounded-full border border-[#d1c5b4] shrink-0 size-[24px] object-cover"
                    />
                  )}
                  <span className="font-serif text-sm font-semibold text-[#775a19] dark:text-[#e9c176] uppercase tracking-wider">
                    {data.tenant.name}
                  </span>
                </Link>
              </div>

              <div className="px-8 py-5 flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <StarRating rating={data.reviewRating} iconClassName="size-4 text-[#775a19] dark:text-[#e9c176]" />
                  <span className="text-xs text-[#5f5e5e] dark:text-[#cec6b5] font-serif uppercase tracking-wider font-semibold">
                    {data.reviewCount} Reviews
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 leading-relaxed font-light text-sm sm:text-base text-[#5f5e5e] dark:text-[#cec6b5]">
              {data.description ? (
                <RichText data={data.description} />
              ) : (
                <p className="font-serif italic text-sm text-[#5f5e5e]">
                  No detailed description provided for this item.
                </p>
              )}
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="col-span-2 border-t lg:border-t-0 lg:border-l border-[#e2e3e1] dark:border-[#333330] bg-[#f4f4f2]/50 dark:bg-[#181817]/50">
            <div className="flex flex-col gap-6 p-8 border-b border-[#e2e3e1] dark:border-[#333330]">
              <div className="flex flex-row items-center gap-3">
                <CartButton
                  isPurchased={data.isPurchased}
                  tenantSlug={tenantSlug}
                  productId={productId}
                />
                <Button
                  className="size-11 rounded-xs border border-[#d1c5b4] dark:border-[#4e4639] bg-transparent text-[#1a1c1b] dark:text-[#f9f9f7] hover:bg-[#775a19]/10"
                  variant="ghost"
                  onClick={() => {
                    setIsCopied(true);
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Product link copied to clipboard");
                    setTimeout(() => {
                      setIsCopied(false);
                    }, 2000);
                  }}
                  disabled={isCopied}
                >
                  {isCopied ? <CheckIcon className="size-4" /> : <LinkIcon className="size-4" />}
                </Button>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#5f5e5e] dark:text-[#cec6b5] font-serif uppercase tracking-wider">
                <ShieldCheck className="size-4 text-[#775a19] dark:text-[#e9c176]" />
                <span>
                  {data.refundPolicy === "no-refund"
                    ? "Final Sale — No Refund Policy"
                    : `${data.refundPolicy} Money Back Guarantee`}
                </span>
              </div>
            </div>

            {/* Ratings Breakdown */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-lg font-bold text-[#1a1c1b] dark:text-[#f9f9f7]">
                  Rating Breakdown
                </h3>
                <div className="flex items-center gap-1 font-serif text-xs uppercase tracking-wider text-[#775a19] dark:text-[#e9c176]">
                  <StarIcon className="size-3.5 fill-[#775a19] dark:fill-[#e9c176]" />
                  <span>({data.reviewRating.toFixed(1)})</span>
                </div>
              </div>

              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center justify-between text-xs font-serif">
                    <span className="w-16 uppercase tracking-wider text-[#5f5e5e] dark:text-[#cec6b5]">
                      {stars} {stars === 1 ? "Star" : "Stars"}
                    </span>
                    <Progress
                      value={data.ratingDistribution[stars]}
                      className="h-2 flex-1 mx-3 bg-[#e8e8e6] dark:bg-[#2a2a28]"
                    />
                    <span className="w-10 text-right font-semibold text-[#775a19] dark:text-[#e9c176]">
                      {data.ratingDistribution[stars]}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductViewSkeleton = () => {
  return (
    <div className="px-4 lg:px-12 py-10 max-w-screen-2xl mx-auto">
      <div className="border border-[#e2e3e1] rounded-sm bg-white overflow-hidden animate-pulse">
        <div className="relative aspect-[3.8] bg-[#e8e8e6]" />
      </div>
    </div>
  );
};