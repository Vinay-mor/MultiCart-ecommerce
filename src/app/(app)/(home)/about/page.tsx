import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/animate-in";
import {
  Rocket,
  Users,
  ShieldCheck,
  TrendingUp,
  Globe,
  Zap,
} from "lucide-react";

export const metadata = {
  title: "About | MultiCart",
  description:
    "Learn about MultiCart — the multi-tenant marketplace empowering sellers and connecting buyers.",
};

/* ────────────────────── timeline data ────────────────────── */
const timeline = [
  {
    year: "The Idea",
    title: "A marketplace for everyone",
    description:
      "We noticed small sellers struggled to get online. Building a website, integrating payments, handling logistics — it was too much. MultiCart was born to change that.",
    icon: Rocket,
  },
  {
    year: "Building",
    title: "Multi-tenant architecture",
    description:
      "We engineered a single platform where every seller gets their own branded storefront — complete with custom domains, product catalogs, and analytics — without writing a single line of code.",
    icon: Zap,
  },
  {
    year: "Growing",
    title: "Community-first growth",
    description:
      "Sellers joined, buyers discovered unique products, and the marketplace grew organically. Reviews, wishlists, and category browsing made discovery effortless.",
    icon: TrendingUp,
  },
  {
    year: "Today",
    title: "Trusted by sellers everywhere",
    description:
      "MultiCart is a thriving ecosystem with secure Stripe payments, real-time order tracking, and a seller dashboard that puts you in full control of your business.",
    icon: ShieldCheck,
  },
  {
    year: "Tomorrow",
    title: "The future is open",
    description:
      "We're expanding into new categories, adding AI-powered recommendations, and building tools that make selling online as easy as posting a photo.",
    icon: Globe,
  },
];

/* ────────────────────────── page ────────────────────────── */
const Page = () => {
  return (
    <div className="space-y-0">
      {/* ═══════ Magazine Hero ═══════ */}
      <section className="relative overflow-hidden bg-black text-white">
        {/* decorative gradient blob */}
        <div className="pointer-events-none absolute -top-40 right-0 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-pink-500/20 blur-[120px] animate-blob" />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-28 text-center md:py-36">
          <span className="hero-animate hero-animate-1 inline-block rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-widest text-white/70">
            Our Story
          </span>

          <h1 className="hero-animate hero-animate-2 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            We believe every seller
            <br />
            deserves a <span className="text-pink-400">storefront</span>.
          </h1>

          <p className="hero-animate hero-animate-3 max-w-xl text-lg leading-relaxed text-white/70">
            MultiCart is the multi-tenant marketplace that turns anyone into an
            online entrepreneur — no code, no hassle, just your products and
            your brand.
          </p>
        </div>
      </section>

      {/* ═══════ Editorial Text Block ═══════ */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <AnimateIn animation="fade-right" delay={0}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-pink-500">
              The Problem
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Setting up an online store used to mean hiring developers,
              configuring payment gateways, and managing servers. Most small
              sellers simply couldn&apos;t afford it.
            </p>
          </AnimateIn>
          <AnimateIn animation="fade-left" delay={150}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-pink-500">
              Our Answer
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              MultiCart gives every seller a fully managed storefront inside a
              shared marketplace. You bring the products — we handle the
              technology, payments, and discovery.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════ Vertical Timeline ═══════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <AnimateIn animation="fade-up" className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Our Journey
            </h2>
          </AnimateIn>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-5 top-0 hidden h-full w-px bg-pink-200 md:left-1/2 md:block" />

            <div className="space-y-16">
              {timeline.map((item, i) => {
                const Icon = item.icon;
                const isEven = i % 2 === 0;

                return (
                  <AnimateIn
                    key={item.year}
                    animation="fade-up"
                    delay={i * 100}
                    className="relative flex flex-col gap-4 md:flex-row md:items-start"
                  >
                    {/* left / right placement */}
                    <div
                      className={`hidden md:flex md:w-1/2 ${
                        isEven
                          ? "justify-end pr-12 text-right"
                          : "order-2 justify-start pl-12 text-left"
                      }`}
                    >
                      <div className="max-w-xs">
                        <span className="mb-1 inline-block rounded-full bg-pink-100 px-3 py-0.5 text-xs font-semibold text-pink-600">
                          {item.year}
                        </span>
                        <h3 className="mt-2 text-lg font-semibold">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* center dot */}
                    <div className="absolute left-5 top-0 z-10 hidden size-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-pink-500 text-white md:left-1/2 md:flex">
                      <Icon className="size-4" />
                    </div>

                    {/* spacer for opposite side */}
                    <div
                      className={`hidden md:block md:w-1/2 ${
                        isEven ? "order-2" : ""
                      }`}
                    />

                    {/* mobile layout */}
                    <div className="flex items-start gap-4 md:hidden">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-pink-500 text-white">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <span className="mb-1 inline-block rounded-full bg-pink-100 px-3 py-0.5 text-xs font-semibold text-pink-600">
                          {item.year}
                        </span>
                        <h3 className="mt-2 text-lg font-semibold">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Pull Quote ═══════ */}
      <section className="bg-[#F4F4F0] py-20 md:py-28">
        <AnimateIn animation="scale-in">
        <blockquote className="mx-auto max-w-2xl px-6 text-center">
          <Users className="mx-auto mb-6 size-10 text-pink-400" />
          <p className="text-2xl font-medium italic leading-relaxed md:text-3xl">
            &ldquo;Selling online should be as simple as having a great
            product.&rdquo;
          </p>
          <footer className="mt-6 text-sm text-muted-foreground">
            — The MultiCart Team
          </footer>
        </blockquote>
        </AnimateIn>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="bg-black py-20 text-center text-white md:py-28">
        <AnimateIn className="mx-auto max-w-xl space-y-6 px-6" animation="fade-up">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Start your store today
          </h2>
          <p className="text-white/60">
            Join thousands of sellers who trust MultiCart. It&apos;s free to get
            started.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-pink-500 text-white hover:bg-pink-400 transition-colors text-base px-8"
            >
              <Link href="/sign-up">Get Started</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="rounded-full border border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white text-base px-8"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </AnimateIn>
      </section>
    </div>
  );
};

export default Page;