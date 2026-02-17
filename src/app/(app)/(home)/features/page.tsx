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
  title: "Features | MultiCart",
  description:
    "Explore the powerful features that make MultiCart the best multi-tenant marketplace for sellers and buyers.",
};

/* ───────────────── feature data ───────────────── */

const heroFeatures = [
  {
    icon: Store,
    title: "Your Own Storefront",
    description:
      "Every seller gets a fully branded, independent storefront — your logo, your products, your identity.",
  },
  {
    icon: CreditCard,
    title: "Stripe Payments",
    description:
      "Secure, instant payments powered by Stripe. Accept cards, wallets, and more with zero hassle.",
  },
  {
    icon: BarChart3,
    title: "Seller Dashboard",
    description:
      "Track orders, revenue, and product performance from a single, intuitive dashboard.",
  },
];

const coreFeatures = [
  {
    icon: Layers,
    title: "Multi-Tenant Architecture",
    description:
      "One platform, unlimited stores. Each tenant operates independently with isolated data and branding while sharing the marketplace's traffic.",
    highlights: [
      "Isolated data per tenant",
      "Shared marketplace traffic",
      "Independent branding",
      "Scalable infrastructure",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Seamless Shopping Experience",
    description:
      "Buyers browse a unified marketplace, add products from multiple sellers to one cart, and check out in a single flow.",
    highlights: [
      "Unified product catalog",
      "Multi-seller cart",
      "One-click checkout",
      "Real-time order tracking",
    ],
  },
  {
    icon: Search,
    title: "Discovery & Search",
    description:
      "Powerful search with category filters, price ranges, and smart sorting helps buyers find exactly what they need.",
    highlights: [
      "Category browsing",
      "Advanced filters",
      "Tag-based discovery",
      "Sort by price, date, or rating",
    ],
  },
];

const additionalFeatures = [
  {
    icon: Star,
    title: "Reviews & Ratings",
    description:
      "Built-in review system with star ratings builds trust and helps buyers make informed decisions.",
  },
  {
    icon: Palette,
    title: "Product Customization",
    description:
      "Rich product pages with images, descriptions, pricing, and categories to showcase your products beautifully.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description:
      "Role-based access control, secure authentication, and Stripe's bank-level security protect every transaction.",
  },
  {
    icon: Globe,
    title: "Marketplace Visibility",
    description:
      "Your products appear in the global marketplace — instant exposure to thousands of potential buyers.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built on Next.js with server-side rendering and edge caching for sub-second page loads.",
  },
  {
    icon: Users,
    title: "Customer Management",
    description:
      "Track your buyers, manage orders, and build lasting relationships with integrated customer tools.",
  },
];

/* ───────────────── page ───────────────── */

const Page = () => {
  return (
    <div className="space-y-0">
      {/* ═══════ Hero ═══════ */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="pointer-events-none absolute -bottom-32 left-0 h-[250px] w-[250px] md:h-[400px] md:w-[400px] rounded-full bg-pink-500/20 blur-[100px] animate-blob" />
        <div className="pointer-events-none absolute -top-20 right-0 h-[200px] w-[200px] md:h-[300px] md:w-[300px] rounded-full bg-pink-500/10 blur-[80px] animate-blob" style={{ animationDelay: "3s" }} />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-28 text-center md:py-36">
          <span className="hero-animate hero-animate-1 inline-block rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-widest text-white/70">
            Platform Features
          </span>

          <h1 className="hero-animate hero-animate-2 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            Everything you need to
            <br />
            <span className="text-pink-400">sell online</span>.
          </h1>

          <p className="hero-animate hero-animate-3 max-w-xl text-lg leading-relaxed text-white/70">
            From storefront to checkout, MultiCart gives you all the tools to
            launch, grow, and manage your online business — all in one place.
          </p>
        </div>
      </section>

      {/* ═══════ Top 3 Feature Cards ═══════ */}
      <section className="relative -mt-16 z-10 mx-auto max-w-5xl px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {heroFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <AnimateIn
                key={feature.title}
                animation="fade-up"
                delay={i * 120}
              >
                <div className="group rounded-2xl border border-black/10 bg-white p-8 shadow-sm transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition-colors group-hover:bg-pink-500 group-hover:text-white">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </section>

      {/* ═══════ Core Features — Alternating Sections ═══════ */}
      <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <AnimateIn className="mb-16 text-center" animation="fade-up">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-pink-500">
            Core Platform
          </h2>
          <p className="text-3xl font-bold tracking-tight md:text-4xl">
            Built for scale, designed for simplicity
          </p>
        </AnimateIn>

        <div className="space-y-24">
          {coreFeatures.map((feature, i) => {
            const Icon = feature.icon;
            const isEven = i % 2 === 0;

            return (
              <AnimateIn
                key={feature.title}
                animation="fade-up"
                delay={100}
                className={`flex flex-col items-center gap-12 md:flex-row ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* illustration card */}
                <AnimateIn
                  className="flex w-full items-center justify-center md:w-1/2"
                  animation={isEven ? "fade-right" : "fade-left"}
                  delay={200}
                >
                  <div className="relative flex size-40 md:size-64 items-center justify-center rounded-3xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <Icon className="size-12 md:size-20 text-pink-400" strokeWidth={1} />
                    {/* decorative dots */}
                    <div className="absolute -right-2 -top-2 size-4 md:-right-3 md:-top-3 md:size-6 rounded-full bg-pink-500 animate-pulse-dot" />
                    <div className="absolute -bottom-1.5 -left-1.5 size-3 md:-bottom-2 md:-left-2 md:size-4 rounded-full bg-black animate-pulse-dot" style={{ animationDelay: "1s" }} />
                  </div>
                </AnimateIn>

                {/* text */}
                <AnimateIn
                  className="w-full md:w-1/2"
                  animation={isEven ? "fade-left" : "fade-right"}
                  delay={350}
                >
                  <h3 className="mb-3 text-2xl font-bold">{feature.title}</h3>
                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.highlights.map((h, hi) => (
                      <li key={h} className="flex items-center gap-3 text-sm">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                          <Check className="size-3" />
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </AnimateIn>
              </AnimateIn>
            );
          })}
        </div>
      </section>

      {/* ═══════ Additional Features Grid ═══════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <AnimateIn className="mb-16 text-center" animation="fade-up">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-pink-500">
              And Much More
            </h2>
            <p className="text-3xl font-bold tracking-tight md:text-4xl">
              Every feature a modern marketplace needs
            </p>
          </AnimateIn>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {additionalFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <AnimateIn
                  key={feature.title}
                  animation="scale-in"
                  delay={i * 80}
                >
                  <div className="group flex h-full flex-col gap-4 rounded-xl border border-black/5 bg-[#FAFAFA] p-6 transition-all hover:border-black/20 hover:bg-white hover:shadow-sm">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-black text-white transition-colors group-hover:bg-pink-500">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-base font-bold">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ Comparison / Why MultiCart ═══════ */}
      <section className="bg-[#F4F4F0] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AnimateIn animation="fade-up">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-pink-500">
              Why MultiCart?
            </h2>
            <p className="mb-12 text-3xl font-bold tracking-tight md:text-4xl">
              Stop piecing together tools.<br />Start selling.
            </p>
          </AnimateIn>

          <div className="grid gap-6 text-left sm:grid-cols-2">
            <AnimateIn animation="fade-up" delay={150}>
            {[
              {
                label: "Traditional Setup",
                items: [
                  "Hire developers",
                  "Configure hosting",
                  "Integrate payment gateway",
                  "Build a storefront from scratch",
                  "Market on your own",
                ],
                negative: true,
              },
              {
                label: "With MultiCart",
                items: [
                  "Sign up in 60 seconds",
                  "Instant storefront — no code",
                  "Stripe built-in",
                  "Marketplace-wide exposure",
                  "Dashboard, analytics & reviews",
                ],
                negative: false,
              },
            ].map((col) => (
              <div
                key={col.label}
                className={`rounded-2xl p-6 ${
                  col.negative
                    ? "border border-black/10 bg-white"
                    : "border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                <h3
                  className={`mb-4 text-sm font-semibold uppercase tracking-widest ${
                    col.negative ? "text-muted-foreground" : "text-pink-500"
                  }`}
                >
                  {col.label}
                </h3>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-relaxed"
                    >
                      <span
                        className={`mt-1 size-1.5 shrink-0 rounded-full ${
                          col.negative ? "bg-black/20" : "bg-pink-500"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="bg-black py-20 text-center text-white md:py-28">
        <AnimateIn className="mx-auto max-w-xl space-y-6 px-6" animation="fade-up">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to launch your store?
          </h2>
          <p className="text-white/60">
            All these features — zero upfront cost. Start selling in minutes.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-pink-500 text-white hover:bg-pink-400 transition-colors text-base px-8"
            >
              <Link href="/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="rounded-full border border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white text-base px-8"
            >
              <Link href="/pricing">See Pricing</Link>
            </Button>
          </div>
        </AnimateIn>
      </section>
    </div>
  );
};

export default Page;