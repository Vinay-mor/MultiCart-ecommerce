"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Paintbrush, Globe, ShieldCheck, Lock } from "lucide-react";
import { ProductFilters } from "../components/product-filters";
import { ProductList, ProductListSkeleton } from "../components/product-list";
import { ProductSort } from "../components/product-sort";

interface Props {
  category?: string;
  tenantSlug?: string;
  narrowView?: boolean;
}

export const ProductListView = ({ category, tenantSlug, narrowView }: Props) => {
  const isMainHomePage = !category && !tenantSlug;

  const scrollToProducts = () => {
    const el = document.getElementById("product-collection");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-[#f9f9f7] dark:bg-[#141413] text-[#1a1c1b] dark:text-[#f9f9f7] transition-colors">
      {/* Stitch Hero Section (Displayed on main home page) */}
      {isMainHomePage && (
        <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center px-6 lg:px-12 py-16 overflow-hidden border-b border-border bg-gradient-to-b from-background via-surface-container-low to-surface-container">
          <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="z-10 flex flex-col items-start">
              <span className="inline-block text-xs uppercase tracking-[0.25em] text-secondary font-semibold mb-6 px-3 py-1 bg-secondary-container/30 dark:bg-secondary-container/40 rounded-full border border-outline-variant/30">
                The Curated Experience
              </span>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.1] text-foreground font-bold mb-6">
                Discover the <br />
                <span className="italic font-normal text-secondary">
                  Extraordinary
                </span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed font-light">
                Step into a meticulously designed marketplace where every detail is an expression of craft. High-end tools for the modern digital atelier.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={scrollToProducts}
                  className="satin-gradient text-white px-8 py-3.5 rounded-xs font-serif text-xs uppercase tracking-widest font-semibold hover:brightness-110 transition-all editorial-shadow cursor-pointer"
                >
                  Explore Collection
                </button>
                <Link
                  href="/about"
                  className="bg-surface-container-high text-foreground px-8 py-3.5 rounded-xs font-serif text-xs uppercase tracking-widest font-semibold hover:bg-surface-container-highest transition-all"
                >
                  Our Process
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] w-full max-w-md mx-auto rounded-sm overflow-hidden editorial-shadow bg-[#e8e8e6] dark:bg-[#2a2a28] border border-[#d1c5b4]/40 relative">
                <Image
                  alt="Curated atelier collection display"
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-8 -left-6 w-52 h-64 hidden xl:block rounded-sm overflow-hidden editorial-shadow border-8 border-[#f9f9f7] dark:border-[#141413]">
                <Image
                  alt="Architectural detail"
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600"
                  fill
                  sizes="208px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stitch Bento Feature Grid Section (Displayed on main home page) */}
      {isMainHomePage && (
        <section className="py-24 px-6 lg:px-12 bg-[#f4f4f2] dark:bg-[#181817] border-b border-[#e2e3e1] dark:border-[#333330]">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-xs uppercase tracking-[0.25em] text-[#775a19] dark:text-[#e9c176] font-semibold mb-3 block font-serif">
                  Architectural Precision
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight">
                  Designed for those who value{" "}
                  <span className="italic text-[#775a19] dark:text-[#e9c176]">
                    precision
                  </span>
                  .
                </h2>
                <p className="text-base text-[#5f5e5e] dark:text-[#cec6b5] mt-4 font-light leading-relaxed">
                  We’ve replaced standard templates with an extraordinary editorial engine. Every interaction is considered, every pixel is intentional.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-[#ffffff] dark:bg-[#1c1c1a] p-10 rounded-sm flex flex-col justify-between group hover:border-[#775a19] border border-[#e2e3e1] dark:border-[#333330] transition-colors duration-500 editorial-card-shadow h-[380px]">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#fed488]/30 dark:bg-[#47360f]/40 flex items-center justify-center mb-6">
                    <Sparkles className="size-6 text-[#775a19] dark:text-[#e9c176]" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-3 text-[#1a1c1b] dark:text-[#f9f9f7]">
                    Artisanal Curation
                  </h3>
                  <p className="text-sm text-[#5f5e5e] dark:text-[#cec6b5] leading-relaxed font-light">
                    Algorithm-free selection of products that define contemporary aesthetics and lasting quality across our multi-tenant network.
                  </p>
                </div>
                <Link
                  className="uppercase tracking-widest text-xs font-bold text-[#775a19] dark:text-[#e9c176] flex items-center gap-2 group-hover:gap-3 transition-all font-serif"
                  href="/about"
                >
                  Learn more <ArrowRight className="size-4" />
                </Link>
              </div>

              {/* Feature 2 */}
              <div className="md:col-span-2 bg-[#ffffff] dark:bg-[#1c1c1a] rounded-sm overflow-hidden border border-[#e2e3e1] dark:border-[#333330] flex flex-col md:flex-row editorial-card-shadow h-[380px]">
                <div className="p-10 flex-1 flex flex-col justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#fed488]/30 dark:bg-[#47360f]/40 flex items-center justify-center mb-6">
                    <Paintbrush className="size-6 text-[#775a19] dark:text-[#e9c176]" />
                  </div>
                  <h3 className="font-serif text-3xl font-bold mb-3">
                    The Visual Engine
                  </h3>
                  <p className="text-sm text-[#5f5e5e] dark:text-[#cec6b5] leading-relaxed mb-6 font-light">
                    A custom rendering architecture that presents your storefront with the same fidelity as a high-end fashion editorial.
                  </p>
                  <Link
                    href="/features"
                    className="satin-gradient text-white self-start px-6 py-2.5 rounded-xs text-xs uppercase tracking-widest font-serif font-bold hover:brightness-110 transition-all"
                  >
                    Explore Features
                  </Link>
                </div>
                <div className="flex-1 h-full hidden md:block relative bg-[#eeeeec] dark:bg-[#222220]">
                  <Image
                    alt="Visual interface showcase"
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Feature 3 */}
              <div className="md:col-span-2 bg-[#141413] text-[#f9f9f7] rounded-sm overflow-hidden editorial-shadow h-[360px] relative group border border-[#333330]">
                <Image
                  alt="Global architecture"
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141413] via-transparent to-transparent flex items-end p-10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="size-5 text-[#e9c176]" />
                      <span className="text-xs uppercase tracking-widest text-[#e9c176] font-serif font-semibold">
                        Global Infrastructure
                      </span>
                    </div>
                    <h3 className="font-serif text-3xl font-bold mb-2">
                      Sub-Second Latencies Worldwide
                    </h3>
                    <p className="text-sm text-[#cec6b5]/80 font-light max-w-lg">
                      Powered by a distributed multi-tenant network ensuring instant store loads from Paris to Tokyo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-[#fed488] dark:bg-[#47360f] p-10 rounded-sm flex flex-col justify-between editorial-card-shadow h-[360px]">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#785a1a]/10 dark:bg-[#ffdea5]/10 flex items-center justify-center mb-6">
                    <ShieldCheck className="size-6 text-[#785a1a] dark:text-[#ffdea5]" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-3 text-[#785a1a] dark:text-[#ffdea5]">
                    Secure Ledger
                  </h3>
                  <p className="text-sm text-[#785a1a]/80 dark:text-[#ffdea5]/80 leading-relaxed font-light">
                    Encrypted multi-merchant transactions protected by Stripe and military-grade protocols.
                  </p>
                </div>
                <div className="h-14 w-full bg-[#ffffff]/60 dark:bg-[#1c1c1a]/60 rounded-xs flex items-center px-4 gap-3">
                  <Lock className="size-4 text-[#785a1a] dark:text-[#ffdea5]" />
                  <span className="text-xs font-serif uppercase tracking-widest font-semibold text-[#785a1a] dark:text-[#ffdea5]">
                    Stripe Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Product Catalog Section */}
      <div id="product-collection" className="px-6 lg:px-12 py-16 max-w-screen-2xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#e2e3e1] dark:border-[#333330] pb-6 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#775a19] dark:text-[#e9c176] font-semibold block mb-2 font-serif">
              The Edit
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1c1b] dark:text-[#f9f9f7]">
              {category ? `Category: ${category}` : tenantSlug ? `Merchant: ${tenantSlug}` : "Selected Works"}
            </h2>
          </div>
          <ProductSort />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-8 gap-x-10">
          <div className="lg:col-span-2 xl:col-span-2">
            <ProductFilters />
          </div>
          <div className="lg:col-span-4 xl:col-span-6">
            <Suspense fallback={<ProductListSkeleton narrowView={narrowView} />}>
              <ProductList category={category} tenantSlug={tenantSlug} narrowView={narrowView} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};