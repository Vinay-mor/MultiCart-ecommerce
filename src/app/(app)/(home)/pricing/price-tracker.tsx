"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import {
  Search,
  TrendingUp,
  TrendingDown,
  ArrowDown,
  ArrowUp,
  Clock,
  Sparkles,
  BarChart3,
  Info,
} from "lucide-react";
import Image from "next/image";

/* ─────────────────────────────────────────────── */
/*         FORMAT HISTORY FROM REAL DATA            */
/* ─────────────────────────────────────────────── */

interface PriceHistoryDoc {
  price: number | null | undefined;
  previousPrice?: number | null | undefined;
  changeType?: string | null | undefined;
  recordedAt: string;
}

/**
 * Convert real PriceHistory docs into chart-ready data points.
 * Groups by month and takes the last recorded price per month.
 */
function formatRealHistory(
  docs: PriceHistoryDoc[]
): { date: string; price: number }[] {
  if (!docs.length) return [];

  const byMonth = new Map<string, number>();

  for (const doc of docs) {
    const d = new Date(doc.recordedAt);
    const key = d.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    byMonth.set(key, doc.price ?? 0);
  }

  return Array.from(byMonth.entries()).map(([date, price]) => ({
    date,
    price,
  }));
}

/**
 * Generate price prediction (next 3 months) using simple trend extrapolation.
 */
function generatePrediction(
  history: { date: string; price: number }[]
): { date: string; predicted: number; upper: number; lower: number }[] {
  const recent = history.slice(-6);
  const n = recent.length;
  const lastPrice = history[history.length - 1]!.price;

  // Guard: need at least 2 points for a meaningful regression
  if (n < 2) {
    const now = new Date();
    return Array.from({ length: 3 }, (_, i) => {
      const date = new Date(now.getFullYear(), now.getMonth() + i + 1, 1);
      const monthLabel = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
      return { date: monthLabel, predicted: lastPrice, upper: lastPrice, lower: lastPrice };
    });
  }

  // Linear regression
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += recent[i]!.price;
    sumXY += i * recent[i]!.price;
    sumX2 += i * i;
  }

  const denom = n * sumX2 - sumX * sumX;

  // Guard: degenerate case (all x values identical) – flat prediction
  if (denom === 0) {
    const avg = sumY / n;
    const now = new Date();
    return Array.from({ length: 3 }, (_, i) => {
      const date = new Date(now.getFullYear(), now.getMonth() + i + 1, 1);
      const monthLabel = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
      const confidence = lastPrice * 0.08 * (i + 1);
      return {
        date: monthLabel,
        predicted: Math.round(avg),
        upper: Math.round(avg + confidence),
        lower: Math.max(0, Math.round(avg - confidence)),
      };
    });
  }

  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;

  const now = new Date();
  const predictions: {
    date: string;
    predicted: number;
    upper: number;
    lower: number;
  }[] = [];

  for (let i = 1; i <= 3; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const monthLabel = date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    const predicted = Math.max(
      lastPrice * 0.5,
      Math.round(intercept + slope * (n + i - 1))
    );
    const confidence = lastPrice * 0.08 * i; // Growing confidence band
    predictions.push({
      date: monthLabel,
      predicted,
      upper: Math.round(predicted + confidence),
      lower: Math.max(0, Math.round(predicted - confidence)),
    });
  }

  return predictions;
}

/* ─────────────────────────────────────────────── */
/*               CHART CONFIGURATION               */
/* ─────────────────────────────────────────────── */

const chartConfig = {
  price: {
    label: "Price",
    color: "#ec4899", // pink-500
  },
  predicted: {
    label: "Predicted",
    color: "#8b5cf6", // violet-500
  },
  upper: {
    label: "Upper Bound",
    color: "#c4b5fd", // violet-300
  },
  lower: {
    label: "Lower Bound",
    color: "#c4b5fd",
  },
} satisfies ChartConfig;

/* ─────────────────────────────────────────────── */
/*                 MAIN COMPONENT                  */
/* ─────────────────────────────────────────────── */

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  tenantSlug: string;
}

export function PriceTracker() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedProduct, setSelectedProduct] =
    useState<SelectedProduct | null>(null);
  const [showResults, setShowResults] = useState(false);

  const trpc = useTRPC();
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear debounce timer on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  // Debounced search
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      setShowResults(true);

      // Cancel any pending debounce
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = setTimeout(() => {
        setDebouncedSearch(value);
        searchTimeoutRef.current = null;
      }, 300);
    },
    []
  );

  // Search products using existing tRPC route
  const { data: searchResults, isLoading: isSearching } = useQuery(
    trpc.products.getMany.queryOptions(
      { search: debouncedSearch, limit: 5 },
      { enabled: debouncedSearch.length >= 2 }
    )
  );

  // Fetch real price history when a product is selected
  const { data: priceHistoryData, isLoading: isLoadingHistory } = useQuery(
    trpc.priceHistory.getByProduct.queryOptions(
      { productId: selectedProduct?.id ?? "" },
      { enabled: !!selectedProduct }
    )
  );

  // Build chart data from real history only
  const chartData = useMemo(() => {
    if (!selectedProduct) return null;

    const history = priceHistoryData?.docs
      ? formatRealHistory(priceHistoryData.docs)
      : [];

    // Not enough data to render a chart
    if (history.length === 0) return { sparse: true as const };

    const canPredict = history.length >= 2;
    const predictions = canPredict ? generatePrediction(history) : [];

    // Combine into unified chart data
    const combined = [
      ...history.map((d) => ({
        date: d.date,
        price: d.price,
        predicted: null as number | null,
        upper: null as number | null,
        lower: null as number | null,
      })),
      ...(canPredict
        ? [
            // Bridge point: last historical = first prediction
            {
              date: history[history.length - 1]!.date,
              price: history[history.length - 1]!.price,
              predicted: history[history.length - 1]!.price,
              upper: history[history.length - 1]!.price,
              lower: history[history.length - 1]!.price,
            },
            ...predictions.map((d) => ({
              date: d.date,
              price: null as number | null,
              predicted: d.predicted,
              upper: d.upper,
              lower: d.lower,
            })),
          ]
        : []),
    ];

    // Stats
    const prices = history.map((d) => d.price);
    const highest = Math.max(...prices);
    const lowest = Math.min(...prices);
    const avgPrice = Math.round(
      prices.reduce((a, b) => a + b, 0) / prices.length
    );
    const prevPrice = history[history.length - 2]?.price ?? selectedProduct.price;
    const priceTrend = selectedProduct.price - prevPrice;
    const predictedNext = predictions[0]?.predicted ?? selectedProduct.price;
    const predictedChange = predictedNext - selectedProduct.price;

    return {
      sparse: false as const,
      combined,
      canPredict,
      stats: { highest, lowest, avgPrice, priceTrend, predictedNext, predictedChange },
    };
  }, [selectedProduct, priceHistoryData]);

  const handleSelectProduct = (product: {
    id: string;
    name: string;
    price: number;
    image?: { url?: string | null } | null;
    tenant?: { slug?: string } | null;
  }) => {
    setSelectedProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.image?.url ?? null,
      tenantSlug: product.tenant?.slug ?? "",
    });
    setShowResults(false);
    setSearch(product.name);
  };

  return (
    <div className="rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      {/* Search */}
      <div className="border-b border-black/10 p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <Input
            placeholder="Search for a product to track its price..."
            className="pl-12 h-14 text-base rounded-xl border-black/10"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => {
              if (search.length >= 2) setShowResults(true);
            }}
          />

          {/* Search Results Dropdown */}
          {showResults && debouncedSearch.length >= 2 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-black/10 bg-white shadow-lg">
              {isSearching ? (
                <div className="flex items-center gap-3 p-4 text-sm text-muted-foreground">
                  <div className="size-4 animate-spin rounded-full border-2 border-pink-500 border-t-transparent" />
                  Searching...
                </div>
              ) : searchResults?.docs && searchResults.docs.length > 0 ? (
                searchResults.docs.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-pink-50"
                  >
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border bg-neutral-100">
                      {product.image?.url ? (
                        <Image
                          src={product.image.url}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center text-xs text-muted-foreground">
                          N/A
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.tenant?.slug}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-pink-100 px-3 py-1 text-sm font-semibold text-pink-600">
                      {formatCurrency(product.price)}
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {!selectedProduct ? (
        /* Empty state */
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-pink-100">
            <BarChart3 className="size-7 text-pink-500" />
          </div>
          <div>
            <p className="text-lg font-bold">Search for a product</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Type a product name above to see its price history and predictions
            </p>
          </div>
        </div>
      ) : chartData ? (
        <div>
          {/* Loading overlay for price history */}
          {isLoadingHistory && (
            <div className="flex items-center gap-3 border-b border-black/10 bg-pink-50 px-6 py-3 text-sm text-pink-600">
              <div className="size-4 animate-spin rounded-full border-2 border-pink-500 border-t-transparent" />
              Loading price history...
            </div>
          )}
          {/* Product Info Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-black/10 px-6 py-4 bg-[#FAFAFA]">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {selectedProduct.imageUrl && (
                <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border">
                  <Image
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              )}
              <div className="min-w-0">
                <h3 className="truncate text-base font-bold">
                  {selectedProduct.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  by {selectedProduct.tenantSlug}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Current Price</p>
                <p className="text-xl font-extrabold">
                  {formatCurrency(selectedProduct.price)}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-black/20 text-xs"
                onClick={() => {
                  setSelectedProduct(null);
                  setSearch("");
                }}
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Sparse data state — only 1 data point, no chart yet */}
          {chartData.sparse ? (
            <div className="flex flex-col items-center gap-4 py-16 px-6 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-blue-100">
                <Info className="size-6 text-blue-500" />
              </div>
              <div>
                <p className="text-base font-bold">Price tracking started</p>
                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                  We&rsquo;ve started recording the price for this product. As
                  the price changes over time, you&rsquo;ll see a full history
                  chart and future predictions here.
                </p>
              </div>
              <div className="mt-2 rounded-xl border border-black/10 bg-[#FAFAFA] px-6 py-4">
                <p className="text-xs text-muted-foreground">Current Price</p>
                <p className="text-2xl font-extrabold">
                  {formatCurrency(selectedProduct.price)}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
                <StatCard
                  label="High"
                  value={formatCurrency(chartData.stats.highest)}
                  icon={<ArrowUp className="size-4 text-red-500" />}
                />
                <StatCard
                  label="Low"
                  value={formatCurrency(chartData.stats.lowest)}
                  icon={<ArrowDown className="size-4 text-green-500" />}
                />
                <StatCard
                  label="Avg Price"
                  value={formatCurrency(chartData.stats.avgPrice)}
                  icon={<Clock className="size-4 text-blue-500" />}
                />
                <StatCard
                  label="Predicted"
                  value={formatCurrency(chartData.stats.predictedNext)}
                  subtext={
                    !chartData.canPredict
                      ? "Needs more data"
                      : chartData.stats.predictedChange > 0
                      ? `+${formatCurrency(chartData.stats.predictedChange)}`
                      : chartData.stats.predictedChange < 0
                      ? formatCurrency(chartData.stats.predictedChange)
                      : "No change"
                  }
                  subtextColor={
                    !chartData.canPredict
                      ? "text-muted-foreground"
                      : chartData.stats.predictedChange > 0
                      ? "text-red-500"
                      : chartData.stats.predictedChange < 0
                      ? "text-green-500"
                      : "text-muted-foreground"
                  }
                  icon={<Sparkles className="size-4 text-violet-500" />}
                />
              </div>

              {/* Chart */}
              <div className="px-6 pb-6">
                <div className="rounded-xl border border-black/10 bg-[#FAFAFA] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold">
                        Price History{chartData.canPredict ? " & Prediction" : ""}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Based on actual price changes
                        {chartData.canPredict ? " + 3 month forecast" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1.5">
                        <span className="inline-block size-2.5 rounded-full bg-pink-500" />
                        History
                      </span>
                      {chartData.canPredict && (
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block size-2.5 rounded-full bg-violet-500" />
                          Prediction
                        </span>
                      )}
                    </div>
                  </div>

                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <AreaChart
                      data={chartData.combined}
                      margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="gradientPrice"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#ec4899"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="100%"
                            stopColor="#ec4899"
                            stopOpacity={0.02}
                          />
                        </linearGradient>
                        <linearGradient
                          id="gradientPredicted"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="100%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.02}
                          />
                        </linearGradient>
                        <linearGradient
                          id="gradientConfidence"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.08}
                          />
                          <stop
                            offset="100%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.02}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e5e5"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        tickFormatter={(v) => `₹${v}`}
                        width={60}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(value, name) => {
                              if (name === "upper" || name === "lower") return null;
                              const label =
                                name === "price" ? "Price" : "Predicted";
                              return (
                                <span>
                                  {label}: {formatCurrency(value as number)}
                                </span>
                              );
                            }}
                          />
                        }
                      />

                      {/* Confidence band (upper) */}
                      <Area
                        type="monotone"
                        dataKey="upper"
                        stroke="none"
                        fill="url(#gradientConfidence)"
                        fillOpacity={1}
                        connectNulls={false}
                      />

                      {/* Confidence band (lower) */}
                      <Area
                        type="monotone"
                        dataKey="lower"
                        stroke="#c4b5fd"
                        strokeWidth={1}
                        strokeDasharray="4 4"
                        fill="none"
                        connectNulls={false}
                      />

                      {/* History line */}
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#ec4899"
                        strokeWidth={2.5}
                        fill="url(#gradientPrice)"
                        fillOpacity={1}
                        dot={false}
                        activeDot={{ r: 5, fill: "#ec4899", strokeWidth: 2, stroke: "#fff" }}
                        connectNulls={false}
                      />

                      {/* Predicted line */}
                      <Area
                        type="monotone"
                        dataKey="predicted"
                        stroke="#8b5cf6"
                        strokeWidth={2.5}
                        strokeDasharray="6 4"
                        fill="url(#gradientPredicted)"
                        fillOpacity={1}
                        dot={false}
                        activeDot={{ r: 5, fill: "#8b5cf6", strokeWidth: 2, stroke: "#fff" }}
                        connectNulls={false}
                      />

                      {/* Current price reference line */}
                      <ReferenceLine
                        y={selectedProduct.price}
                        stroke="#000"
                        strokeDasharray="3 3"
                        strokeOpacity={0.2}
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </div>

              {/* Insight */}
              {chartData.canPredict && (
                <div className="border-t border-black/10 bg-[#FAFAFA] px-6 py-5">
                  <div className="flex items-start gap-3">
                    {chartData.stats.predictedChange <= 0 ? (
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                        <TrendingDown className="size-4 text-green-600" />
                      </div>
                    ) : (
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-red-100">
                        <TrendingUp className="size-4 text-red-600" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold">
                        {chartData.stats.predictedChange < 0
                          ? "Price is expected to drop"
                          : chartData.stats.predictedChange > 0
                          ? "Price is expected to rise"
                          : "Price is expected to stay stable"}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {chartData.stats.predictedChange < 0
                          ? `Based on the trend analysis, this product's price may drop by ${formatCurrency(Math.abs(chartData.stats.predictedChange))} next month. Consider waiting for a better deal.`
                          : chartData.stats.predictedChange > 0
                          ? `Our analysis suggests the price may increase by ${formatCurrency(chartData.stats.predictedChange)} next month. Now might be a good time to buy.`
                          : "The price has been relatively stable. No significant changes expected in the near future."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*                  STAT CARD                      */
/* ─────────────────────────────────────────────── */

function StatCard({
  label,
  value,
  icon,
  subtext,
  subtextColor,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  subtext?: string;
  subtextColor?: string;
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-[#FAFAFA] p-4 transition-all hover:bg-white">
      <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="text-lg font-extrabold tracking-tight">{value}</p>
      {subtext && (
        <p className={`mt-0.5 text-xs font-medium ${subtextColor}`}>
          {subtext}
        </p>
      )}
    </div>
  );
}
