import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/animate-in";

export const metadata: Metadata = {
  title: "Contact & Concierge | MultiCart Atelier",
  description:
    "Get in touch with the MultiCart Atelier team for merchant inquiries, partnership opportunities, and customer concierge support.",
};

const Page = () => {
  return (
    <div className="w-full bg-[#f9f9f7] dark:bg-[#141413] text-[#1a1c1b] dark:text-[#f9f9f7] transition-colors">
      {/* ═══════ Hero Header ═══════ */}
      <section className="relative overflow-hidden bg-[#141413] text-[#f9f9f7] py-28 lg:py-36 border-b border-[#333330]">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-[#e9c176] font-serif font-semibold mb-6 px-4 py-1 bg-[#47360f]/60 rounded-full border border-[#e9c176]/30">
            Atelier Concierge
          </span>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold max-w-4xl leading-[1.1] tracking-tight mb-8">
            Direct Dialogue with <br />
            <span className="italic font-normal text-[#e9c176]">Our Team</span>.
          </h1>

          <p className="text-base sm:text-xl text-[#cec6b5]/80 max-w-2xl font-light leading-relaxed mb-6">
            Whether you are an emerging merchant looking to launch your storefront or an enterprise brand exploring custom integration, our team is at your disposal.
          </p>
        </div>
      </section>

      {/* ═══════ Contact Form & Details ═══════ */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-12 -mt-12 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Form Column */}
          <AnimateIn
            animation="fade-up"
            delay={0}
            className="lg:col-span-7 bg-[#ffffff] dark:bg-[#1c1c1a] p-8 sm:p-12 rounded-sm border border-[#e2e3e1] dark:border-[#333330] editorial-card-shadow"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#775a19] dark:text-[#e9c176] font-serif font-semibold block mb-2">
              Send a Message
            </span>
            <h2 className="font-serif text-3xl font-bold mb-8">
              How Can We Assist You?
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-serif text-xs uppercase tracking-wider text-[#1a1c1b] dark:text-[#f9f9f7] font-semibold">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Evelyn"
                    className="w-full bg-[#f9f9f7] dark:bg-[#141413] border border-[#d1c5b4] dark:border-[#4e4639] rounded-xs px-4 py-3 text-sm focus:outline-none focus:border-[#775a19] dark:focus:border-[#e9c176] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-serif text-xs uppercase tracking-wider text-[#1a1c1b] dark:text-[#f9f9f7] font-semibold">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Vance"
                    className="w-full bg-[#f9f9f7] dark:bg-[#141413] border border-[#d1c5b4] dark:border-[#4e4639] rounded-xs px-4 py-3 text-sm focus:outline-none focus:border-[#775a19] dark:focus:border-[#e9c176] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-serif text-xs uppercase tracking-wider text-[#1a1c1b] dark:text-[#f9f9f7] font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="evelyn@atelier.com"
                  className="w-full bg-[#f9f9f7] dark:bg-[#141413] border border-[#d1c5b4] dark:border-[#4e4639] rounded-xs px-4 py-3 text-sm focus:outline-none focus:border-[#775a19] dark:focus:border-[#e9c176] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="font-serif text-xs uppercase tracking-wider text-[#1a1c1b] dark:text-[#f9f9f7] font-semibold">
                  Inquiry Topic
                </label>
                <select className="w-full bg-[#f9f9f7] dark:bg-[#141413] border border-[#d1c5b4] dark:border-[#4e4639] rounded-xs px-4 py-3 text-sm focus:outline-none focus:border-[#775a19] dark:focus:border-[#e9c176] transition-colors text-[#1a1c1b] dark:text-[#f9f9f7]">
                  <option value="merchant">Merchant Storefront Creation</option>
                  <option value="enterprise">Enterprise Plan & Custom Branding</option>
                  <option value="stripe">Payment & Stripe Payout Support</option>
                  <option value="other">General Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-serif text-xs uppercase tracking-wider text-[#1a1c1b] dark:text-[#f9f9f7] font-semibold">
                  Your Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Describe your request or brand vision..."
                  className="w-full bg-[#f9f9f7] dark:bg-[#141413] border border-[#d1c5b4] dark:border-[#4e4639] rounded-xs p-4 text-sm focus:outline-none focus:border-[#775a19] dark:focus:border-[#e9c176] transition-colors resize-none"
                />
              </div>

              <Button
                type="button"
                className="satin-gradient text-white w-full py-4 rounded-xs font-serif text-xs uppercase tracking-widest font-bold hover:brightness-110 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="size-4" /> Send Message to Concierge
              </Button>
            </form>
          </AnimateIn>

          {/* Details Sidebar Column */}
          <div className="lg:col-span-5 space-y-8">
            <AnimateIn
              animation="fade-up"
              delay={150}
              className="bg-[#ffffff] dark:bg-[#1c1c1a] p-8 sm:p-10 rounded-sm border border-[#e2e3e1] dark:border-[#333330] editorial-card-shadow"
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="size-4 text-[#775a19] dark:text-[#e9c176]" />
                <span className="font-serif text-xs uppercase tracking-widest text-[#775a19] dark:text-[#e9c176] font-bold">
                  Direct Contact Information
                </span>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#fed488]/30 dark:bg-[#47360f]/40 flex items-center justify-center shrink-0 mt-1">
                    <Mail className="size-5 text-[#775a19] dark:text-[#e9c176]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm uppercase tracking-wider font-bold mb-1">
                      Email Support
                    </h4>
                    <p className="text-xs text-[#5f5e5e] dark:text-[#cec6b5] font-light">
                      concierge@multicart.atelier
                    </p>
                    <p className="text-[11px] text-[#775a19] dark:text-[#e9c176] font-serif mt-1">
                      Response SLA within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-[#e2e3e1] dark:border-[#333330]">
                  <div className="w-10 h-10 rounded-full bg-[#fed488]/30 dark:bg-[#47360f]/40 flex items-center justify-center shrink-0 mt-1">
                    <Phone className="size-5 text-[#775a19] dark:text-[#e9c176]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm uppercase tracking-wider font-bold mb-1">
                      Merchant Concierge Line
                    </h4>
                    <p className="text-xs text-[#5f5e5e] dark:text-[#cec6b5] font-light">
                      +1 (800) 555-ATELIER
                    </p>
                    <p className="text-[11px] text-[#5f5e5e] dark:text-[#cec6b5] font-light mt-1">
                      Mon – Fri, 9:00 AM – 6:00 PM EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-[#e2e3e1] dark:border-[#333330]">
                  <div className="w-10 h-10 rounded-full bg-[#fed488]/30 dark:bg-[#47360f]/40 flex items-center justify-center shrink-0 mt-1">
                    <Clock className="size-5 text-[#775a19] dark:text-[#e9c176]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm uppercase tracking-wider font-bold mb-1">
                      Global Presence
                    </h4>
                    <p className="text-xs text-[#5f5e5e] dark:text-[#cec6b5] font-light">
                      Paris • Tokyo • New York • London
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn
              animation="fade-up"
              delay={300}
              className="bg-[#141413] text-[#f9f9f7] p-8 sm:p-10 rounded-sm border border-[#333330] editorial-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="size-4 text-[#e9c176]" />
                <span className="font-serif text-xs uppercase tracking-widest text-[#e9c176] font-bold">
                  Headquarters Atelier
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">
                MultiCart Inc.
              </h3>
              <p className="text-xs text-[#cec6b5]/80 font-light leading-relaxed mb-4">
                750 Fifth Avenue, Suite 2400<br />
                New York, NY 10019, USA
              </p>
              <div className="pt-4 border-t border-[#333330] flex items-center justify-between text-[11px] text-[#e9c176] font-serif uppercase tracking-widest font-semibold">
                <span>Stripe Verified Partner</span>
                <span>Active Edge Network</span>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;