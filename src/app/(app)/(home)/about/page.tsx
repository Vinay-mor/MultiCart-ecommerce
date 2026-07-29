import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/animate-in";
import {
  Rocket,
  ShieldCheck,
  TrendingUp,
  Globe,
  Zap,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Our Vision | MultiCart Atelier",
  description:
    "Discover the philosophy behind MultiCart — an editorial multi-tenant marketplace designed for digital artisans and modern visionaries.",
};

const timeline = [
  {
    year: "The Vision",
    title: "A Canvas for Digital Artisans",
    description:
      "We observed independent creators struggling with fragmented e-commerce tools. MultiCart was conceived to unify high-end design with effortless merchant infrastructure.",
    icon: Rocket,
  },
  {
    year: "Architecture",
    title: "Editorial Multi-Tenant Engine",
    description:
      "We engineered a shared platform where every tenant operates a distinct, luxury digital storefront — complete with custom domain isolation, inventory control, and instant global delivery.",
    icon: Zap,
  },
  {
    year: "Excellence",
    title: "Curated Merchant Network",
    description:
      "Artisans and visionaries joined the ecosystem, offering products defined by quality and design integrity. Discovery became an experience rather than a search.",
    icon: TrendingUp,
  },
  {
    year: "Trust",
    title: "Enterprise Grade Security",
    description:
      "MultiCart combines Stripe-backed payment routing, real-time analytics, and automated order fulfillment to ensure absolute operational peace of mind.",
    icon: ShieldCheck,
  },
  {
    year: "Horizon",
    title: "Global Commerce Atelier",
    description:
      "Expanding into international fashion capitals with sub-second regional rendering and AI-powered aesthetic curation.",
    icon: Globe,
  },
];

const Page = () => {
  return (
    <div className="w-full bg-[#f9f9f7] dark:bg-[#141413] text-[#1a1c1b] dark:text-[#f9f9f7] transition-colors">
      {/* ═══════ Luxury Editorial Hero ═══════ */}
      <section className="relative overflow-hidden bg-[#141413] text-[#f9f9f7] py-28 lg:py-36 border-b border-[#333330]">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-[#e9c176] font-serif font-semibold mb-6 px-4 py-1 bg-[#47360f]/60 rounded-full border border-[#e9c176]/30">
            Our Vision & Process
          </span>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold max-w-4xl leading-[1.1] tracking-tight mb-8">
            Empowering the World&apos;s Most <br />
            <span className="italic font-normal text-[#e9c176]">Discerning</span> Merchants.
          </h1>

          <p className="text-base sm:text-xl text-[#cec6b5]/80 max-w-2xl font-light leading-relaxed mb-10">
            MultiCart provides the digital canvas for independent creators, emerging ateliers, and visionary brands to showcase their craft on a global stage.
          </p>

          <div className="flex items-center gap-4">
            <Button
              asChild
              className="satin-gradient text-white px-8 py-3.5 rounded-xs font-serif text-xs uppercase tracking-widest font-semibold hover:brightness-110 shadow-md transition-all"
            >
              <Link href="/sign-up">Start Selling</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[#4e4639] bg-transparent text-[#f9f9f7] hover:bg-[#333330] px-8 py-3.5 rounded-xs font-serif text-xs uppercase tracking-widest font-semibold"
            >
              <Link href="/features">Explore Features</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════ Problem & Answer Section ═══════ */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <AnimateIn animation="fade-right" delay={0} className="bg-[#ffffff] dark:bg-[#1c1c1a] p-12 rounded-sm border border-[#e2e3e1] dark:border-[#333330] editorial-card-shadow">
            <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#775a19] dark:text-[#e9c176] font-semibold mb-3 block">
              The Challenge
            </span>
            <h2 className="font-serif text-3xl font-bold mb-4">Generic E-Commerce Software</h2>
            <p className="text-sm sm:text-base text-[#5f5e5e] dark:text-[#cec6b5] leading-relaxed font-light">
              Traditional multi-vendor platforms dilute brand identity with standardized templates, clunky interfaces, and complex overhead that strip the elegance from handcrafted goods.
            </p>
          </AnimateIn>

          <AnimateIn animation="fade-left" delay={150} className="bg-[#ffffff] dark:bg-[#1c1c1a] p-12 rounded-sm border border-[#e2e3e1] dark:border-[#333330] editorial-card-shadow">
            <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#775a19] dark:text-[#e9c176] font-semibold mb-3 block">
              The MultiCart Standard
            </span>
            <h2 className="font-serif text-3xl font-bold mb-4">Editorial Polish & Complete Autonomy</h2>
            <p className="text-sm sm:text-base text-[#5f5e5e] dark:text-[#cec6b5] leading-relaxed font-light">
              We grant every merchant a dedicated storefront styled with high-fashion editorial aesthetics, backed by instant cloud deployment, automated payments, and global edge routing.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════ Timeline Section ═══════ */}
      <section className="bg-[#f4f4f2] dark:bg-[#181817] py-24 border-y border-[#e2e3e1] dark:border-[#333330]">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <AnimateIn animation="fade-up" className="mb-16 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#775a19] dark:text-[#e9c176] font-serif font-semibold block mb-2">
              Evolution of Craft
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold">
              Our Journey
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {timeline.map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimateIn
                  key={item.year}
                  animation="fade-up"
                  delay={i * 100}
                  className="bg-[#ffffff] dark:bg-[#1c1c1a] p-8 rounded-sm border border-[#e2e3e1] dark:border-[#333330] flex flex-col justify-between editorial-card-shadow"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#fed488]/30 dark:bg-[#47360f]/40 flex items-center justify-center mb-6">
                      <Icon className="size-5 text-[#775a19] dark:text-[#e9c176]" />
                    </div>
                    <span className="text-xs font-serif uppercase tracking-widest text-[#775a19] dark:text-[#e9c176] font-semibold block mb-2">
                      {item.year}
                    </span>
                    <h3 className="font-serif text-xl font-bold mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#5f5e5e] dark:text-[#cec6b5] leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ Editorial Quote Section ═══════ */}
      <section className="py-24 max-w-screen-2xl mx-auto px-6 lg:px-12 text-center">
        <AnimateIn animation="scale-in" className="max-w-3xl mx-auto">
          <Sparkles className="mx-auto mb-6 size-10 text-[#775a19] dark:text-[#e9c176]" />
          <blockquote className="font-serif text-3xl sm:text-4xl italic font-normal leading-snug mb-6">
            &ldquo;Selling digital and physical goods online should feel like walking through a high-end gallery.&rdquo;
          </blockquote>
          <span className="font-serif text-xs uppercase tracking-widest text-[#775a19] dark:text-[#e9c176] font-semibold block">
            — The MultiCart Atelier Team
          </span>
        </AnimateIn>
      </section>
    </div>
  );
};

export default Page;