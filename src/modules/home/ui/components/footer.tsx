import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#141413] text-[#f9f9f7] pt-20 pb-12 border-t border-[#333330]">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-[#333330]">
          <div className="md:col-span-2">
            <span className="font-serif text-3xl font-bold tracking-tighter text-[#f9f9f7] block mb-4">
              MultiCart
            </span>
            <p className="text-[#cec6b5]/70 max-w-md text-sm leading-relaxed mb-6 font-light">
              Step into a meticulously designed marketplace where every detail is an expression of craft. Premium tools for the modern digital atelier.
            </p>
            <div className="flex items-center space-x-3">
              <span className="text-xs uppercase tracking-widest text-[#e9c176] font-semibold">
                Curated Architecture
              </span>
              <span className="w-2 h-2 rounded-full bg-[#e9c176] animate-pulse"></span>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#e9c176] font-semibold mb-6">
              Navigation
            </h4>
            <ul className="space-y-3 font-serif text-xs uppercase tracking-wider text-[#cec6b5]/80">
              <li>
                <Link href="/" className="hover:text-[#e9c176] transition-colors">
                  Collection
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-[#e9c176] transition-colors">
                  Features Showcase
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#e9c176] transition-colors">
                  Investment & Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#e9c176] transition-colors">
                  Our Vision
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#e9c176] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#e9c176] font-semibold mb-6">
              Newsletter
            </h4>
            <p className="text-xs text-[#cec6b5]/70 font-light mb-4 leading-relaxed">
              Subscribe for private releases, design dispatch, and merchant features.
            </p>
            <div className="flex items-center border border-[#4e4639] rounded-xs overflow-hidden">
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-transparent px-3 py-2 text-xs text-[#f9f9f7] placeholder-[#cec6b5]/40 focus:outline-none flex-1"
              />
              <button className="satin-gradient text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold hover:brightness-110">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#cec6b5]/50 font-light">
          <p>© {new Date().getFullYear()} MultiCart Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-serif uppercase tracking-widest text-[10px]">
            <span className="hover:text-[#e9c176] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#e9c176] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#e9c176] cursor-pointer">Security Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};