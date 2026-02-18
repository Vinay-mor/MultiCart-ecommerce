import z from "zod";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const priceHistoryRouter = createTRPCRouter({
    getByProduct: baseProcedure
        .input(
            z.object({
                productId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const data = await ctx.db.find({
                collection: "priceHistory",
                where: {
                    product: {
                        equals: input.productId,
                    },
                },
                sort: "recordedAt",
                pagination: false,
            });

            // Auto-bootstrap: if no history exists, create the initial record
            // from the product's current price and createdAt date
            if (data.totalDocs === 0) {
                const product = await ctx.db.findByID({
                    collection: "products",
                    id: input.productId,
                });

                if (product) {
                    const initialRecord = await ctx.db.create({
                        collection: "priceHistory",
                        data: {
                            product: input.productId,
                            price: product.price,
                            previousPrice: null,
                            changeType: "initial",
                            recordedAt: product.createdAt,
                        },
                    });

                    return {
                        docs: [
                            {
                                id: initialRecord.id,
                                price: initialRecord.price,
                                previousPrice: initialRecord.previousPrice,
                                changeType: initialRecord.changeType,
                                recordedAt: initialRecord.recordedAt,
                            },
                        ],
                        totalDocs: 1,
                    };
                }
            }

            return {
                docs: data.docs.map((doc) => ({
                    id: doc.id,
                    price: doc.price,
                    previousPrice: doc.previousPrice,
                    changeType: doc.changeType,
                    recordedAt: doc.recordedAt,
                })),
                totalDocs: data.totalDocs,
            };
        }),
});
