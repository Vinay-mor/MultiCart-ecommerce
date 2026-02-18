"use client";

import  Link  from "next/link";
import{Sheet,SheetContent,SheetHeader,SheetTitle,} from"@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";

interface NavbarItem{
    href:string;
    children:React.ReactNode;
}
interface Props{
    items:NavbarItem[];
    open:boolean;
    onOpenChange:(open:boolean)=>void;
}
export const NavbarSidebar=({items,open,onOpenChange}:Props)=>{
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

    return(
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetContent side="left" className="p-0 transition-none">
            <SheetHeader className="p-4 border-b">
                    <SheetTitle >
                        Menu
                    </SheetTitle>
            </SheetHeader>
            <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
           {items.map((item)=>(
           <Link
           key={item.href}
           href={item.href}
           className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium "
           onClick={()=>onOpenChange(false)}>
            {item.children}
            </Link>
           ))}
           <div className="border-t">
                {session.data?.user ? (
                    <>
                        <Link href="/admin" className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                        onClick={()=>onOpenChange(false)}>
                            Dashboard
                        </Link>
                        <button
                        className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
                        onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link perfect href="/sign-in" className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                        onClick={()=>onOpenChange(false)}>
                            Log-in
                        </Link>
                        <Link  perfect href="/sign-up" className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                        onClick={()=>onOpenChange(false)}>
                            Start selling
                        </Link>
                    </>
                )}
           </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
    )
}