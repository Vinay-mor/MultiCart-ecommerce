import type { CollectionConfig } from "payload";

export const PriceHistory: CollectionConfig = {
    slug: "priceHistory",
    admin: {
        useAsTitle: "product",
        description: "Tracks historical price changes for products",
    },
    access: {
        read: () => true,
        create: () => false,
        update: () => false,
        delete: () => false,
    },
    fields: [
        {
            name: "product",
            type: "relationship",
            relationTo: "products",
            required: true,
            hasMany: false,
            index: true,
        },
        {
            name: "price",
            type: "number",
            required: true,
            admin: {
                description: "The price at this point in time (INR)",
            },
        },
        {
            name: "previousPrice",
            type: "number",
            admin: {
                description: "The price before this change (INR)",
            },
        },
        {
            name: "changeType",
            type: "select",
            options: [
                { label: "Initial", value: "initial" },
                { label: "Increase", value: "increase" },
                { label: "Decrease", value: "decrease" },
                { label: "No Change", value: "no-change" },
            ],
            defaultValue: "initial",
        },
        {
            name: "recordedAt",
            type: "date",
            required: true,
            defaultValue: () => new Date().toISOString(),
            admin: {
                description: "When this price was recorded",
            },
            index: true,
        },
    ],
};
