import { z } from "zod";

const bookObjectSchema = z.object({
    title: z.string().trim().min(1, {
        message: "Title is required",
    }),
    author: z.string().trim().min(1).optional(),
    description: z.string().trim().optional(),
    pages: z.coerce
        .number()
        .positive()
        .min(1, { message: "Pages must be greater than 0" })
        .max(3000, { message: "Pages must be less than 3000" })
        .optional(),
    image: z
        .string()
        .trim()
        .url({
            message: "Image must be a valid URL",
        })
        .optional(),
    ISBN: z
        .string()
        .trim()
        .min(10, {
            message: "ISBN must be at least10 characters long",
        })
        .max(13, {
            message: "ISBN must be at most 13 characters long",
        })
        .optional(),
    createdAt: z.date().default(new Date()),
    updatedAt: z.date().default(new Date()),
});

// just normal mongodb id using regex
const bookIDSchema = z.object({
    id: z.coerce.string().regex(/^[0-9a-fA-F]{24}$/, {
        message: "Invalid ID",
    }),
});

export { bookObjectSchema, bookIDSchema };
