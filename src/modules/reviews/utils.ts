import type { BasePayload } from "payload";

interface ProductWithId {
    id: string;
}

interface ReviewSummary {
    reviewCount: number;
    reviewRating: number;
}

/**
 * Fetches all reviews for the given products in a single query and computes
 * reviewCount and reviewRating for each product.
 * 
 * @param products Array of products with at least an `id` field
 * @param db Payload database instance
 * @returns Array of products enriched with reviewCount and reviewRating
 */
export async function summarizeReviews<T extends ProductWithId>(
    products: T[],
    db: BasePayload
): Promise<(T & ReviewSummary)[]> {
    if (products.length === 0) {
        return [];
    }

    const productIds = products.map((product) => product.id);

    // Fetch all reviews in a single query
    const allReviewsData = await db.find({
        collection: "reviews",
        pagination: false,
        where: {
            product: {
                in: productIds,
            }
        }
    });

    // Group reviews by product ID
    const reviewsByProduct = new Map<string, { count: number; totalRating: number }>();
    for (const review of allReviewsData.docs) {
        const productId = typeof review.product === 'string' ? review.product : review.product.id;
        const existing = reviewsByProduct.get(productId) || { count: 0, totalRating: 0 };
        reviewsByProduct.set(productId, {
            count: existing.count + 1,
            totalRating: existing.totalRating + review.rating,
        });
    }

    // Merge review aggregates into products
    return products.map((product) => {
        const reviewStats = reviewsByProduct.get(product.id);
        const reviewCount = reviewStats?.count ?? 0;
        const reviewRating = reviewCount === 0 ? 0 : reviewStats!.totalRating / reviewCount;
        return {
            ...product,
            reviewCount,
            reviewRating,
        };
    });
}
