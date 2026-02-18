import { isSuperAdmin } from "@/lib/access";
import { Tenant } from "@/payload-types";
import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
    slug: "products",
    hooks: {
        afterChange: [
            async ({ doc, previousDoc, req, operation }) => {
                const payload = req.payload;

                if (operation === "create") {
                    // Record initial price
                    await payload.create({
                        collection: "priceHistory",
                        data: {
                            product: doc.id,
                            price: doc.price,
                            previousPrice: null,
                            changeType: "initial",
                            recordedAt: new Date().toISOString(),
                        },
                    });
                } else if (operation === "update" && previousDoc?.price !== doc.price) {
                    // Record price change
                    const changeType =
                        doc.price > previousDoc.price
                            ? "increase"
                            : doc.price < previousDoc.price
                            ? "decrease"
                            : "no-change";

                    await payload.create({
                        collection: "priceHistory",
                        data: {
                            product: doc.id,
                            price: doc.price,
                            previousPrice: previousDoc.price,
                            changeType,
                            recordedAt: new Date().toISOString(),
                        },
                    });
                }
            },
        ],
    },
    access: {
        create: ({ req }) => {
            if (isSuperAdmin(req.user)) return true;

            const tenant = req.user?.tenants?.[0]?.tenant as Tenant;
            return Boolean(tenant?.stripeDetailsSubmitted);
        },
        delete: ({ req }) => isSuperAdmin(req.user),
    },
    admin: {
        useAsTitle: "name",
        description: "You must verify your account before creating products"
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "description",
            type: "richText",
        },
        {
            name: "price",
            type: "number",
            required: true,
            admin: {
                description: "Price in INR",
            }
        },
        {
            name: "category",
            type: "relationship",
            relationTo: "categories",
            hasMany: false,
        },
        {
            name: "tags",
            type: "relationship",
            relationTo: "tags",
            hasMany: true,
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media",
        },
        {
            name: "refundPolicy",
            type: "select",
            options: ["30-day", "14-day", "7-day", "3-day", "1-day", "no-refund"],
            defaultValue: "30-day",
        },
        {
            name: "content",
            type: "richText",
            admin: {
                description:
                    "Protected content only visible to customers after purchase. Add product documentation, downloadable files,getting started guides, and bonus materials.Supports Markdown formatting"
            }
        },
        {
            name: "isPrivate",
            label: "Private",
            defaultValue: false,
            type: "checkbox",
            admin: {
                description: "if checked, this product will not be shown on the public storefront"
            }
        },
        {
            name: "isArchived",
            label: "Archive",
            defaultValue: false,
            type: "checkbox",
            admin: {
                description: "if checked, this product will be archived"
            },
        }
    ],
}