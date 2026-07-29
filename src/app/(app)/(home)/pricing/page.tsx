import type { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/animate-in";
import { PriceTracker } from "./price-tracker";

export const metadata: Metadata = {
  title: "Investment & Pricing | MultiCart Atelier",
  description:
    "Explore MultiCart merchant plans, pricing tiers, and intelligence tools for modern ateliers.",
};

const tiers = [
  {
    name: "Starter Atelier",
    tagline: "Perfect for emerging independent creators",
    price: "$49",
    period: "/ Month",
    popular: false,
    features: [
      "Up to 50 Products",
      "Editorial Theme Presets",
      "Stripe Payment Gateway",
      "Standard Customer Support",
      "1 Merchant Storefront",
    ],
    buttonText: "Begin Starter",
    href: "/sign-up",
  },
  {
    name: "Professional Atelier",
    tagline: "Recommended for growing digital storefronts",
    price: "$149",
    period: "/ Month",
    popular: true,
    features: [
      "Unlimited Product Listings",
      "Custom Domain Isolation",
      "Priority Edge CDN Routing",
      "Advanced Sales Analytics",
      "Stripe Split Payments",
      "24/7 Concierge Support",
    ],
    buttonText: "Join Professional",
    href: "/sign-up",
  },
  {
    name: "Enterprise House",
    tagline: "Tailored for global fashion and luxury brands",
    price: "$499",
    period: "/ Month",
    popular: false,
    features: [
      "Multi-Tenant Store Network",
      "Bespoke Custom Styling",
      "Dedicated Account Manager",
      "Sub-Second SLA Guarantee",
      "Custom API Integration",
      "Unlimited Admin Accounts",
    ],
    buttonText: "Contact Sales",
    href: "/contact",
  },
];

const Page = () => {
  return (
    <div className="w-full bg-[#f9f9f7] dark:bg-[#141413] text-[#1a1c1b] dark:text-[#f9f9f7] transition-colors">
      {/* ═══════ Hero ═══════ */}
      <section className="relative overflow-hidden bg-[#141413] text-[#f9f9f7] py-28 lg:py-36 border-b border-[#333330]">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-[#e9c176] font-serif font-semibold mb-6 px-4 py-1 bg-[#47360f]/60 rounded-full border border-[#e9c176]/30">
            The Investment
          </span>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold max-w-4xl leading-[1.1] tracking-tight mb-8">
            Refined Commerce for <br />
            <span className="italic font-normal text-[#e9c176]">Modern Visionaries</span>.
          </h1>

          <p className="text-base sm:text-xl text-[#cec6b5]/80 max-w-2xl font-light leading-relaxed mb-6">
            Select the tier that aligns with your brand&apos;s journey. From boutique beginnings to global resonance, we provide the canvas for your craft.
          </p>
        </div>
      </section>

      {/* ═══════ Merchant Pricing Tiers ═══════ */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-12 -mt-12 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, i) => (
            <AnimateIn
              key={tier.name}
              animation="fade-up"
              delay={i * 120}
              className={`p-10 rounded-sm border flex flex-col justify-between editorial-card-shadow transition-all duration-500 ${
                tier.popular
                  ? "bg-[#ffffff] dark:bg-[#1c1c1a] border-[#775a19] dark:border-[#e9c176] ring-1 ring-[#775a19] dark:ring-[#e9c176]"
                  : "bg-[#ffffff] dark:bg-[#1c1c1a] border-[#e2e3e1] dark:border-[#333330]"
              }`}
            >
              <div>
                {tier.popular && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-serif uppercase tracking-widest font-bold px-3 py-1 bg-[#fed488] text-[#785a1a] rounded-full mb-6">
                    <Sparkles className="size-3" /> Recommended Tier
                  </span>
                )}
                <h3 className="font-serif text-2xl font-bold text-[#1a1c1b] dark:text-[#f9f9f7] mb-2">
                  {tier.name}
                </h3>
                <p className="text-xs text-[#5f5e5e] dark:text-[#cec6b5] font-light mb-8">
                  {tier.tagline}
                </p>

                <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-[#e2e3e1] dark:border-[#333330]">
                  <span className="font-serif text-5xl font-bold text-[#775a19] dark:text-[#e9c176]">
                    {tier.price}
                  </span>
                  <span className="text-xs text-[#5f5e5e] dark:text-[#cec6b5] uppercase tracking-widest font-serif">
                    {tier.period}
                  </span>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-xs text-[#1a1c1b] dark:text-[#f9f9f7] font-serif uppercase tracking-wider">
                      <Check className="size-4 text-[#775a19] dark:text-[#e9c176] shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                asChild
                className={`w-full py-3.5 rounded-xs font-serif text-xs uppercase tracking-widest font-bold transition-all ${
                  tier.popular
                    ? "satin-gradient text-white hover:brightness-110 shadow-md"
                    : "bg-[#e8e8e6] dark:bg-[#2a2a28] text-[#1a1c1b] dark:text-[#f9f9f7] hover:bg-[#e2e3e1] dark:hover:bg-[#333330]"
                }`}
              >
                <Link href={tier.href}>{tier.buttonText}</Link>
              </Button>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ═══════ Price Intelligence Section ═══════ */}
      <section className="bg-[#f4f4f2] dark:bg-[#181817] py-24 border-t border-[#e2e3e1] dark:border-[#333330]">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <AnimateIn className="mb-12 text-center max-w-xl mx-auto" animation="fade-up">
            <span className="text-xs uppercase tracking-[0.25em] text-[#775a19] dark:text-[#e9c176] font-serif font-semibold block mb-2">
              Buyer Tools
            </span>
            <h2 className="font-serif text-4xl font-bold">
              Marketplace Price Intelligence
            </h2>
            <p className="text-sm text-[#5f5e5e] dark:text-[#cec6b5] mt-3 font-light">
              Track price fluctuations and trend-based predictions across MultiCart products.
            </p>
          </AnimateIn>

          <AnimateIn animation="fade-up" delay={150}>
            <PriceTracker />
          </AnimateIn>
        </div>
      </section>
    </div>
  );
};

export default Page;