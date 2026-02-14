"use client"

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useEffect, useCallback } from "react";

const Page = () => {
    const trpc = useTRPC();
    const redirect = useCallback((url: string) => {
        window.location.href = url;
    }, []);
    const { mutate: verify } = useMutation(trpc.checkout.verify.mutationOptions(
        {
            onSuccess: (data) => {
                redirect(data.url);
            },
            onError:()=>{
                redirect("/");
            },
        }));
    useEffect(() => {
        verify();
    }, [verify]);
    return (
        <div className="flex min-h-screen items-center justify-center">
            <LoaderIcon className="animate-spin text-muted-foreground"/>
        </div>
    );
}
export default Page;