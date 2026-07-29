"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "../../schemas";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { ShieldCheck, Sparkles } from "lucide-react";

export const SignInView = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const login = useMutation(
    trpc.auth.login.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
        router.push("/");
      },
    })
  );

  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    login.mutate(values);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 min-h-screen bg-[#f9f9f7] dark:bg-[#141413] text-[#1a1c1b] dark:text-[#f9f9f7]">
      <div className="h-screen w-full lg:col-span-3 overflow-y-auto flex flex-col justify-between p-6 sm:p-12 lg:p-20">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 max-w-md w-full mx-auto my-auto"
          >
            <div className="flex items-center justify-between mb-6 border-b border-[#e2e3e1] dark:border-[#333330] pb-6">
              <Link href="/" className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#1a1c1b] dark:text-[#f9f9f7]">
                  MultiCart
                </span>
                <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#fed488] text-[#785a1a] font-semibold">
                  Atelier
                </span>
              </Link>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="font-serif text-xs uppercase tracking-widest text-[#775a19] dark:text-[#e9c176] hover:bg-transparent hover:underline"
              >
                <Link prefetch href="/sign-up">
                  Create Account
                </Link>
              </Button>
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#775a19] dark:text-[#e9c176] font-serif font-semibold block mb-2">
                Welcome Back
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
                Log in to MultiCart
              </h1>
              <p className="text-xs text-[#5f5e5e] dark:text-[#cec6b5] mt-2 font-light">
                Access your merchant dashboard, store analytics, and order fulfillment.
              </p>
            </div>

            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-serif text-xs uppercase tracking-wider text-[#1a1c1b] dark:text-[#f9f9f7]">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="merchant@atelier.com"
                      className="bg-[#ffffff] dark:bg-[#1c1c1a] border-[#d1c5b4] dark:border-[#4e4639] rounded-xs text-sm py-2.5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-serif text-xs uppercase tracking-wider text-[#1a1c1b] dark:text-[#f9f9f7]">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="••••••••"
                      className="bg-[#ffffff] dark:bg-[#1c1c1a] border-[#d1c5b4] dark:border-[#4e4639] rounded-xs text-sm py-2.5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={login.isPending}
              type="submit"
              size="lg"
              className="satin-gradient text-white font-serif text-xs uppercase tracking-widest font-bold py-3.5 rounded-xs hover:brightness-110 shadow-md transition-all mt-4"
            >
              {login.isPending ? "Signing in..." : "Log in to Store"}
            </Button>
          </form>
        </Form>

        <div className="max-w-md w-full mx-auto pt-6 border-t border-[#e2e3e1] dark:border-[#333330] text-center text-[11px] text-[#5f5e5e] dark:text-[#cec6b5] font-serif uppercase tracking-widest flex items-center justify-center gap-2">
          <ShieldCheck className="size-4 text-[#775a19] dark:text-[#e9c176]" />
          <span>Encrypted Multi-Merchant Authentication</span>
        </div>
      </div>

      {/* Right Editorial Hero Column */}
      <div className="h-screen w-full lg:col-span-2 hidden lg:flex relative bg-[#141413] text-[#f9f9f7] overflow-hidden border-l border-[#333330] items-center justify-center p-12">
        <img
          alt="Editorial aesthetic"
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="relative z-10 bg-[#1c1c1a]/90 backdrop-blur-md p-10 rounded-sm border border-[#e9c176]/30 editorial-shadow max-w-sm">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="size-4 text-[#e9c176]" />
            <span className="text-[10px] uppercase tracking-widest text-[#e9c176] font-serif font-bold">
              MultiCart Atelier
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold mb-3">
            Crafted for Extraordinary Commerce
          </h2>
          <p className="text-xs text-[#cec6b5]/80 font-light leading-relaxed">
            Manage your digital atelier with complete autonomy, instant payment routing, and high-fashion aesthetics.
          </p>
        </div>
      </div>
    </div>
  );
};