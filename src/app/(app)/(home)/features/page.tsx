import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/animate-in";
import {
  Store,
  CreditCard,
  BarChart3,
  Search,
  Star,
  ShoppingCart,
  Layers,
  Shield,
  Palette,
  Globe,
  Zap,
  Users,
  ArrowRight,
  Check,
} from "lucide-react";

export const metadata = {
  title: "Features Showcase | MultiCart Atelier",
  description:
    "Explore the architectural features powering the MultiCart multi-tenant marketplace platform.",
};

const heroFeatures = [
  {
    icon: Store,
    title: "Branded Digital Storefront",
    description:
      "Every merchant operates a fully independent storefront — custom URL isolation, tailored inventory, and luxury typography.",
  },
  {
    icon: CreditCard,
    title: "Stripe Enterprise Ledger",
    description:
      "Bank-level multi-party payments powered by Stripe. Accept cards, wallets, and international currencies seamlessly.",
  },
  {
    icon: BarChart3,
    title: "Atelier Analytics Dashboard",
    description:
      "Monitor sales, customer acquisition, and inventory metrics from an integrated merchant control center.",
  },
];

const coreFeatures = [
  {
    icon: Layers,
    title: "Multi-Tenant Cloud Engine",
    description:
      "One unified platform, infinite merchant stores. Each tenant operates independently with isolated data boundaries while benefiting from shared marketplace discovery.",
    highlights: [
      "Strict data boundary per tenant",
      "Shared global marketplace discovery",
      "Custom domain & branding autonomy",
      "Sub-second edge caching",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Editorial Commerce Flow",
    description:
      "Buyers discover curated collections, add products across multiple merchants into a unified cart, and complete checkout in a single friction-free transaction.",
    highlights: [
      "Unified multi-tenant shopping cart",
      "Integrated Stripe payment gateway",
      "Automated order confirmation",
      "Real-time delivery status",
    ],
  },
  {
    icon: Search,
    title: "Algorithmic & Smart Search",
    description:
      "Instant faceted search with category chips, tag filters, price range sliders, and rating sorts.",
    highlights: [
      "Faceted category filtering",
      "Dynamic price range sliders",
      "Tag-based product discovery",
      "Instant keyword search",
    ],
  },
];

const additionalFeatures = [
  {
    icon: Star,
    title: "Artisanal Reviews & Ratings",
    description:
      "Verified buyer reviews with rating distributions build lasting merchant trust.",
  },
  {
    icon: Palette,
    title: "Editorial Product Showcase",
    description:
      "High-resolution media galleries, Markdown descriptions, and custom variant selectors.",
  },
  {
    icon: Shield,
    title: "Military-Grade Security",
    description:
      "Role-based access control, encrypted sessions, and automatic SSL security.",
  },
  {
    icon: Globe,
    title: "Global CDN Acceleration",
    description:
      "Instant edge rendering across North America, Europe, and Asia fashion capitals.",
  },
  {
    icon: Zap,
    title: "Sub-Second Performance",
    description:
      "Built on Next.js 16 with server hydration and tRPC query caching.",
  },
  {
    icon: Users,
    title: "Merchant CRM Tools",
    description:
      "Analyze customer order history, manage fulfillment, and build buyer loyalty.",
  },
];

const Page = () => {
  return (
    <div className="w-full bg-[#f9f9f7] dark:bg-[#141413] text-[#1a1c1b] dark:text-[#f9f9f7] transition-colors">
      {/* ═══════ Hero ═══════ */}
      <section className="relative overflow-hidden bg-[#141413] text-[#f9f9f7] py-28 lg:py-36 border-b border-[#333330]">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-[#e9c176] font-serif font-semibold mb-6 px-4 py-1 bg-[#47360f]/60 rounded-full border border-[#e9c176]/30">
            Engineered for Precision
          </span>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold max-w-4xl leading-[1.1] tracking-tight mb-8">
            The Technology Behind <br />
            <span className="italic font-normal text-[#e9c176]">Refined Commerce</span>.
          </h1>

          <p className="text-base sm:text-xl text-[#cec6b5]/80 max-w-2xl font-light leading-relaxed mb-10">
            From storefront creation to multi-tenant payment splits, MultiCart provides the complete digital engine for modern ateliers.
          </p>

          <div className="flex items-center gap-4">
            <Button
              asChild
              className="satin-gradient text-white px-8 py-3.5 rounded-xs font-serif text-xs uppercase tracking-widest font-semibold hover:brightness-110 shadow-md transition-all"
            >
              <Link href="/sign-up">Start Selling Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════ Hero Feature Cards ═══════ */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-12 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {heroFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <AnimateIn
                key={feature.title}
                animation="fade-up"
                delay={i * 120}
              >
                <div className="bg-[#ffffff] dark:bg-[#1c1c1a] p-8 rounded-sm border border-[#e2e3e1] dark:border-[#333330] editorial-card-shadow h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-[#fed488]/30 dark:bg-[#47360f]/40 flex items-center justify-center mb-6">
                      <Icon className="size-6 text-[#775a19] dark:text-[#e9c176]" />
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-xs text-[#5f5e5e] dark:text-[#cec6b5] leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </section>

      {/* ═══════ Core Features ═══════ */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-24">
        <AnimateIn className="mb-16 text-center max-w-2xl mx-auto" animation="fade-up">
          <span className="text-xs uppercase tracking-[0.25em] text-[#775a19] dark:text-[#e9c176] font-serif font-semibold block mb-2">
            Core Architecture
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold">
            Built for Scale, Designed for Elegance
          </h2>
        </AnimateIn>

        <div className="space-y-16">
          {coreFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <AnimateIn
                key={feature.title}
                animation="fade-up"
                delay={100}
                className="bg-[#ffffff] dark:bg-[#1c1c1a] p-10 rounded-sm border border-[#e2e3e1] dark:border-[#333330] editorial-card-shadow grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-[#fed488]/30 dark:bg-[#47360f]/40 flex items-center justify-center shrink-0">
                    <Icon className="size-8 text-[#775a19] dark:text-[#e9c176]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold">{feature.title}</h3>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-[#5f5e5e] dark:text-[#cec6b5] leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>

                <div className="bg-[#f4f4f2] dark:bg-[#181817] p-6 rounded-xs border border-[#e2e3e1] dark:border-[#333330]">
                  <ul className="space-y-3 font-serif text-xs uppercase tracking-wider text-[#1a1c1b] dark:text-[#f9f9f7]">
                    {feature.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2">
                        <Check className="size-4 text-[#775a19] dark:text-[#e9c176]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </section>

      {/* ═══════ Additional Features Grid ═══════ */}
      <section className="bg-[#f4f4f2] dark:bg-[#181817] py-24 border-t border-[#e2e3e1] dark:border-[#333330]">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <AnimateIn className="mb-16 text-center max-w-xl mx-auto" animation="fade-up">
            <span className="text-xs uppercase tracking-[0.25em] text-[#775a19] dark:text-[#e9c176] font-serif font-semibold block mb-2">
              Capabilities
            </span>
            <h2 className="font-serif text-4xl font-bold">
              Comprehensive Merchant Suite
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <AnimateIn key={feature.title} animation="scale-in" delay={i * 80}>
                  <div className="bg-[#ffffff] dark:bg-[#1c1c1a] p-8 rounded-sm border border-[#e2e3e1] dark:border-[#333330] editorial-card-shadow h-full">
                    <div className="w-10 h-10 rounded-full bg-[#fed488]/30 dark:bg-[#47360f]/40 flex items-center justify-center mb-6">
                      <Icon className="size-5 text-[#775a19] dark:text-[#e9c176]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-xs text-[#5f5e5e] dark:text-[#cec6b5] leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="bg-[#141413] text-[#f9f9f7] py-24 text-center border-t border-[#333330]">
        <AnimateIn className="max-w-xl mx-auto px-6" animation="fade-up">
          <h2 className="font-serif text-4xl font-bold mb-4">
            Ready to Launch Your Store?
          </h2>
          <p className="text-sm text-[#cec6b5]/80 font-light mb-8">
            Join independent sellers powering their brand with MultiCart Atelier.
          </p>
          <Button
            asChild
            className="satin-gradient text-white px-8 py-3.5 rounded-xs font-serif text-xs uppercase tracking-widest font-semibold hover:brightness-110 shadow-md"
          >
            <Link href="/sign-up">
              Get Started Free <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </AnimateIn>
      </section>
    </div>
  );
};

export default Page;