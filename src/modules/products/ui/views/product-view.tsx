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
    <div className="px-4 lg:px-12 py-12 max-w-screen-2xl mx-auto bg-background text-foreground transition-colors">
      <div className="border border-border rounded-sm bg-card overflow-hidden editorial-card-shadow">
        {/* Banner Hero Image */}
        <div className="relative aspect-[3.2] sm:aspect-[3.8] border-b border-border bg-surface-container">
          <Image
            src={data.image?.url || "/placeholder.png"}
            alt={data.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 80vw"
          />
          <div className="absolute top-4 left-4 bg-background/90 dark:bg-surface/90 backdrop-blur-xs px-4 py-1 text-xs uppercase tracking-widest font-serif font-semibold text-secondary rounded-full border border-outline-variant/40">
            Editorial Piece
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6">
          {/* Main Info */}
          <div className="col-span-4">
            <div className="p-8 border-b border-border">
              <span className="text-xs uppercase tracking-[0.25em] text-secondary font-serif font-semibold block mb-2">
                Atelier Series
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
                {data.name}
              </h1>
            </div>

            <div className="border-b border-border flex flex-wrap items-center">
              <div className="px-8 py-5 flex items-center justify-center border-r border-border">
                <div className="px-4 py-1.5 rounded-xs bg-secondary-container/30 dark:bg-secondary-container/40 border border-secondary/30">
                  <p className="font-serif text-xl font-bold text-secondary">
                    {formatCurrency(data.price)}
                  </p>
                </div>
              </div>

              <div className="px-8 py-5 flex items-center justify-center border-r border-border">
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
                      className="rounded-full border border-outline-variant shrink-0 size-[24px] object-cover"
                    />
                  )}
                  <span className="font-serif text-sm font-semibold text-secondary uppercase tracking-wider">
                    {data.tenant.name}
                  </span>
                </Link>
              </div>

              <div className="px-8 py-5 flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <StarRating rating={data.reviewRating} iconClassName="size-4 text-secondary" />
                  <span className="text-xs text-muted-foreground font-serif uppercase tracking-wider font-semibold">
                    {data.reviewCount} Reviews
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 leading-relaxed font-light text-sm sm:text-base text-muted-foreground">
              {data.description ? (
                <RichText data={data.description} />
              ) : (
                <p className="font-serif italic text-sm text-muted-foreground">
                  No detailed description provided for this item.
                </p>
              )}
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="col-span-2 border-t lg:border-t-0 lg:border-l border-border bg-surface-container-low/50 dark:bg-surface-dim/50">
            <div className="flex flex-col gap-6 p-8 border-b border-border">
              <div className="flex flex-row items-center gap-3">
                <CartButton
                  isPurchased={data.isPurchased}
                  tenantSlug={tenantSlug}
                  productId={productId}
                />
                <Button
                  className="size-11 rounded-xs border border-outline-variant bg-transparent text-foreground hover:bg-secondary/10"
                  variant="ghost"
                  onClick={async () => {
                    if (!navigator.clipboard?.writeText) {
                      setIsCopied(false);
                      toast.error("Clipboard access not supported");
                      return;
                    }

                    try {
                      await navigator.clipboard.writeText(window.location.href);
                      setIsCopied(true);
                      toast.success("Product link copied to clipboard");
                      setTimeout(() => {
                        setIsCopied(false);
                      }, 2000);
                    } catch (error) {
                      setIsCopied(false);
                      toast.error("Failed to copy product link");
                    }
                  }}
                  disabled={isCopied}
                >
                  {isCopied ? <CheckIcon className="size-4" /> : <LinkIcon className="size-4" />}
                </Button>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground font-serif uppercase tracking-wider">
                <ShieldCheck className="size-4 text-secondary" />
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
                <h3 className="font-serif text-lg font-bold text-foreground">
                  Rating Breakdown
                </h3>
                <div className="flex items-center gap-1 font-serif text-xs uppercase tracking-wider text-secondary">
                  <StarIcon className="size-3.5 fill-secondary" />
                  <span>({data.reviewRating.toFixed(1)})</span>
                </div>
              </div>

              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const percentage = data.ratingDistribution[stars] ?? 0;
                  return (
                    <div key={stars} className="flex items-center justify-between text-xs font-serif">
                      <span className="w-16 uppercase tracking-wider text-muted-foreground">
                        {stars} {stars === 1 ? "Star" : "Stars"}
                      </span>
                      <Progress
                        value={percentage}
                        className="h-2 flex-1 mx-3 bg-surface-container-high"
                      />
                      <span className="w-10 text-right font-semibold text-secondary">
                        {percentage}%
                      </span>
                    </div>
                  );
                })}
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