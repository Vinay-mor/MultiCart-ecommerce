"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}
interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/users/logout", { method: "POST" });
    await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
    onOpenChange(false);
    router.refresh();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 bg-[#f9f9f7] dark:bg-[#141413] text-[#1a1c1b] dark:text-[#f9f9f7] border-r border-[#e2e3e1] dark:border-[#333330]">
        <SheetHeader className="p-6 border-b border-[#e2e3e1] dark:border-[#333330]">
          <SheetTitle className="font-serif text-xl font-bold tracking-tight text-[#1a1c1b] dark:text-[#f9f9f7] flex items-center justify-between">
            <span>MultiCart</span>
            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#fed488] text-[#785a1a] font-semibold">
              Atelier
            </span>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col h-[calc(100vh-80px)] p-4">
          <div className="space-y-1 mb-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-full text-left px-4 py-3 font-serif font-medium text-xs uppercase tracking-widest rounded-xs hover:bg-[#775a19]/10 hover:text-[#775a19] dark:hover:bg-[#e9c176]/10 dark:hover:text-[#e9c176] transition-colors flex items-center"
                onClick={() => onOpenChange(false)}
              >
                {item.children}
              </Link>
            ))}
          </div>
          <div className="border-t border-[#e2e3e1] dark:border-[#333330] pt-6 space-y-2">
            {session.data?.user ? (
              <>
                <Link
                  href="/admin"
                  className="w-full text-left px-4 py-3 font-serif font-medium text-xs uppercase tracking-widest rounded-xs satin-gradient text-white flex items-center justify-center shadow-sm"
                  onClick={() => onOpenChange(false)}
                >
                  Dashboard
                </Link>
                <button
                  className="w-full text-left px-4 py-3 font-serif font-medium text-xs uppercase tracking-widest rounded-xs text-[#ba1a1a] hover:bg-[#ba1a1a]/10 transition-colors cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  prefetch
                  href="/sign-in"
                  className="w-full text-center px-4 py-3 font-serif font-medium text-xs uppercase tracking-widest rounded-xs border border-[#d1c5b4] hover:bg-[#775a19]/10 transition-colors flex items-center justify-center"
                  onClick={() => onOpenChange(false)}
                >
                  Log-in
                </Link>
                <Link
                  prefetch
                  href="/sign-up"
                  className="w-full text-center px-4 py-3 font-serif font-medium text-xs uppercase tracking-widest rounded-xs satin-gradient text-white flex items-center justify-center shadow-sm"
                  onClick={() => onOpenChange(false)}
                >
                  Start selling
                </Link>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};