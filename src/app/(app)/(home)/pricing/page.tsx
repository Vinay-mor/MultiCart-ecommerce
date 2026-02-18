import type { Metadata } from "next";
import { AnimateIn } from "@/components/animate-in";
import { PriceTracker } from "./price-tracker";

export const metadata: Metadata = {
  title: "Price Tracker | MultiCart",
  description:
    "Track price history and get trend-based price predictions for any product on MultiCart.",
};

const Page = () => {
  return (
    <div className="space-y-0">
      {/* ═══════ Hero ═══════ */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[300px] w-[300px] md:h-[500px] md:w-[500px] -translate-x-1/2 rounded-full bg-pink-500/20 blur-[120px] animate-blob" />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-[200px] w-[200px] md:h-[300px] md:w-[300px] rounded-full bg-pink-500/10 blur-[80px] animate-blob" style={{ animationDelay: "3s" }} />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-28 text-center md:py-36">
          <span className="hero-animate hero-animate-1 inline-block rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-widest text-white/70">
            Price Intelligence
          </span>

          <h1 className="hero-animate hero-animate-2 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            Track prices.
            <br />
            <span className="text-pink-400">Predict</span> the best deal.
          </h1>

          <p className="hero-animate hero-animate-3 max-w-xl text-lg leading-relaxed text-white/70">
            Search any product to see its complete price history and our
            trend-based prediction for where the price is headed next.
          </p>
        </div>
      </section>

      {/* ═══════ Price Tracker Section ═══════ */}
      <section className="relative -mt-10 z-10 mx-auto max-w-5xl px-6 pb-20 md:pb-28">
        <AnimateIn animation="fade-up">
          <PriceTracker />
        </AnimateIn>
      </section>

      {/* ═══════ How It Works ═══════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <AnimateIn className="mb-16 text-center" animation="fade-up">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-pink-500">
              How It Works
            </h2>
            <p className="text-3xl font-bold tracking-tight md:text-4xl">
              Smart pricing in three steps
            </p>
          </AnimateIn>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Search a product",
                description:
                  "Type the name of any product on MultiCart and select it from the results.",
              },
              {
                step: "02",
                title: "View price history",
                description:
                  "See how the price has changed over the past 12 months with detailed charts.",
              },
              {
                step: "03",
                title: "Get predictions",
                description:
                  "Our algorithm predicts future prices so you can buy at the perfect time.",
              },
            ].map((item, i) => (
              <AnimateIn key={item.step} animation="fade-up" delay={i * 120}>
                <div className="group rounded-2xl border border-black/10 bg-white p-8 transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5">
                  <span className="mb-4 inline-block text-4xl font-extrabold text-pink-400">
                    {item.step}
                  </span>
                  <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;