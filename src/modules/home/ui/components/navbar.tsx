"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { NavbarSidebar } from "./navbar-sidebar";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

interface NavbarProps {
  href: string;
  children: React.ReactNode;
  isactive?: boolean;
}

const NavbarItem = ({ href, children, isactive }: NavbarProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "font-serif font-medium text-xs uppercase tracking-[0.2em] transition-colors duration-300 pb-1 border-b-2 border-transparent text-[#5f5e5e] hover:text-[#775a19] dark:text-[#cec6b5] dark:hover:text-[#e9c176]",
        isactive && "border-[#775a19] text-[#775a19] dark:border-[#e9c176] dark:text-[#e9c176]"
      )}
    >
      {children}
    </Link>
  );
};

const navbarItem = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <nav className="sticky top-0 z-50 h-20 w-full bg-[#f9f9f7]/90 dark:bg-[#141413]/90 backdrop-blur-md border-b border-[#e2e3e1] dark:border-[#333330] transition-colors">
      <div className="max-w-screen-2xl mx-auto h-full flex justify-between items-center px-6 lg:px-12">
        <Link href={"/"} className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold tracking-tighter text-[#1a1c1b] dark:text-[#f9f9f7]">
            MultiCart
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#fed488] text-[#785a1a] font-semibold">
            Atelier
          </span>
        </Link>

        <NavbarSidebar
          items={navbarItem}
          open={isSidebarOpen}
          onOpenChange={setIsSidebarOpen}
        />

        <div className="hidden lg:flex items-center space-x-10">
          {navbarItem.map((item) => (
            <NavbarItem
              key={item.href}
              href={item.href}
              isactive={pathname === item.href}
            >
              {item.children}
            </NavbarItem>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          {session.data?.user ? (
            <Button
              asChild
              className="satin-gradient text-white px-8 py-2.5 rounded-xs font-serif font-medium text-xs uppercase tracking-widest shadow-md hover:brightness-110 transition-all"
            >
              <Link href="/admin">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                className="font-serif font-medium text-xs uppercase tracking-widest text-[#5f5e5e] hover:text-[#775a19] dark:text-[#cec6b5] dark:hover:text-[#e9c176] bg-transparent hover:bg-transparent"
              >
                <Link prefetch href="/sign-in">
                  Log in
                </Link>
              </Button>
              <Button
                asChild
                className="satin-gradient text-white px-8 py-2.5 rounded-xs font-serif font-medium text-xs uppercase tracking-widest shadow-md hover:brightness-110 transition-all"
              >
                <Link prefetch href="/sign-up">
                  Start selling
                </Link>
              </Button>
            </>
          )}
        </div>

        <div className="flex lg:hidden items-center">
          <Button
            variant="ghost"
            className="size-10 p-0 text-[#1a1c1b] dark:text-[#f9f9f7] hover:bg-black/5"
            aria-label="Open menu"
            onClick={() => setIsSidebarOpen(true)}
          >
            <MenuIcon className="size-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
};