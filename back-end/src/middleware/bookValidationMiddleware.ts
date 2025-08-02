/**
 * MIT License
 *
 * Copyright (c) 2025 Qiu Yixiang
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Request, Response, NextFunction } from "express";

// Validation helper functions
const validateTitle = (
    title: any,
    isRequired: boolean = true
): { isValid: boolean; message?: string; value?: string } => {
    if (!title) {
        if (isRequired) {
            return { isValid: false, message: "Title is required" };
        }
        return { isValid: true };
    }

    const trimmedTitle = title.toString().trim();
    if (isRequired && !trimmedTitle) {
        return { isValid: false, message: "Title is required" };
    }

    return { isValid: true, value: trimmedTitle };
};

const validateAuthor = (
    author: any
): { isValid: boolean; message?: string; value?: string } => {
    if (!author) {
        return { isValid: true };
    }

    const trimmedAuthor = author.toString().trim();
    return { isValid: true, value: trimmedAuthor };
};

const validateImage = (
    image: any
): { isValid: boolean; message?: string; value?: string } => {
    if (!image) {
        return { isValid: true };
    }

    const trimmedImage = image.toString().trim();
    return { isValid: true, value: trimmedImage };
};

const validateTags = (
    tags: any
): { isValid: boolean; message?: string; value?: string[] } => {
    if (!tags) {
        return { isValid: true };
    }

    if (!Array.isArray(tags)) {
        return { isValid: false, message: "Tags must be an array" };
    }

    const trimmedTags = tags
        .map((tag: any) => tag.toString().trim())
        .filter((tag) => tag.length > 0);
    return { isValid: true, value: trimmedTags };
};

const validatePages = (
    pages: any
): { isValid: boolean; message?: string; value?: number } => {
    if (!pages && pages !== 0) {
        return { isValid: true };
    }

    const intPage: number = parseInt(pages.toString());
    if (isNaN(intPage)) {
        return { isValid: false, message: "Pages must be a number" };
    }

    if (intPage <= 0 || intPage > 5000) {
        return { isValid: false, message: "Pages must be between 1 and 5000" };
    }

    return { isValid: true, value: intPage };
};

// Middleware for creating a book (title is required)
export const validateCreateBook = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, author, image, tags, pages } = req.body;
    const validatedData: any = {};

    // Validate title
    const titleValidation = validateTitle(title, true);
    if (!titleValidation.isValid) {
        return res.status(400).json({ message: titleValidation.message });
    }
    if (titleValidation.value !== undefined) {
        validatedData.title = titleValidation.value;
    }

    // Validate author
    const authorValidation = validateAuthor(author);
    if (!authorValidation.isValid) {
        return res.status(400).json({ message: authorValidation.message });
    }
    if (authorValidation.value !== undefined) {
        validatedData.author = authorValidation.value;
    }

    // Validate image
    const imageValidation = validateImage(image);
    if (!imageValidation.isValid) {
        return res.status(400).json({ message: imageValidation.message });
    }
    if (imageValidation.value !== undefined) {
        validatedData.image = imageValidation.value;
    }

    // Validate tags
    const tagsValidation = validateTags(tags);
    if (!tagsValidation.isValid) {
        return res.status(400).json({ message: tagsValidation.message });
    }
    if (tagsValidation.value !== undefined) {
        validatedData.tags = tagsValidation.value;
    }

    // Validate pages
    const pagesValidation = validatePages(pages);
    if (!pagesValidation.isValid) {
        return res.status(400).json({ message: pagesValidation.message });
    }
    if (pagesValidation.value !== undefined) {
        validatedData.pages = pagesValidation.value;
    }

    // Add timestamp for creation
    validatedData.createdAt = new Date();

    // Replace req.body with validated data
    req.body = validatedData;
    next();
};

// Middleware for updating a book
export const validateUpdateBook = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, author, image, tags, pages } = req.body;
    const validatedData: any = {};

    // Validate title
    if (title !== undefined) {
        const titleValidation = validateTitle(title, false);
        if (!titleValidation.isValid) {
            return res.status(400).json({ message: titleValidation.message });
        }
        if (titleValidation.value !== undefined) {
            validatedData.title = titleValidation.value;
        }
    }

    // Validate author
    if (author !== undefined) {
        const authorValidation = validateAuthor(author);
        if (!authorValidation.isValid) {
            return res.status(400).json({ message: authorValidation.message });
        }
        if (authorValidation.value !== undefined) {
            validatedData.author = authorValidation.value;
        }
    }

    // Validate image
    if (image !== undefined) {
        const imageValidation = validateImage(image);
        if (!imageValidation.isValid) {
            return res.status(400).json({ message: imageValidation.message });
        }
        if (imageValidation.value !== undefined) {
            validatedData.image = imageValidation.value;
        }
    }

    // Validate tags
    if (tags !== undefined) {
        const tagsValidation = validateTags(tags);
        if (!tagsValidation.isValid) {
            return res.status(400).json({ message: tagsValidation.message });
        }
        if (tagsValidation.value !== undefined) {
            validatedData.tags = tagsValidation.value;
        }
    }

    // Validate pages
    if (pages !== undefined) {
        const pagesValidation = validatePages(pages);
        if (!pagesValidation.isValid) {
            return res.status(400).json({ message: pagesValidation.message });
        }
        if (pagesValidation.value !== undefined) {
            validatedData.pages = pagesValidation.value;
        }
    }

    // Replace req.body with validated data
    req.body = validatedData;
    next();
};
