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

// Constants for validation
const VALIDATION_CONSTANTS = {
    MIN_PAGES: 0,
    MAX_PAGES: 10000,
    ISBN10_LENGTH: 10,
    MAX_TITLE_LENGTH: 200,
    MAX_AUTHOR_LENGTH: 100,
    MAX_TAGS_COUNT: 20,
} as const;

function validatePages(pages: number): boolean {
    if (
        pages < VALIDATION_CONSTANTS.MIN_PAGES ||
        pages > VALIDATION_CONSTANTS.MAX_PAGES
    ) {
        return false;
    }
    return true;
}

function validateISBN10(ISBN10: string): boolean {
    if (ISBN10.length !== VALIDATION_CONSTANTS.ISBN10_LENGTH) {
        return false;
    }
    return true;
}

function validateTags(tags: string[]): boolean {
    if (tags.length > VALIDATION_CONSTANTS.MAX_TAGS_COUNT) {
        return false;
    }
    return true;
}

function validateTitle(title: string): boolean {
    if (title.length > VALIDATION_CONSTANTS.MAX_TITLE_LENGTH) {
        return false;
    }
    return true;
}

function validateAuthor(author: string): boolean {
    if (author.length > VALIDATION_CONSTANTS.MAX_AUTHOR_LENGTH) {
        return false;
    }
    return true;
}

function validateLink(link: string): boolean {
    if (!link.startsWith("http") && !link.startsWith("https")) {
        return false;
    }
    return true;
}

function validateBookDataPost(req: Request, res: Response, next: NextFunction) {
    const { title, author, pages, tags, ISBN10, link } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    } else {
        if (!validateTitle(title)) {
            return res.status(400).json({ error: "Title is invalid" });
        }
    }

    if (author && !validateAuthor(author)) {
        return res.status(400).json({ error: "Author is invalid" });
    }

    if (tags && !validateTags(tags)) {
        return res.status(400).json({ error: "Tags is invalid" });
    }

    if (pages && !validatePages(pages)) {
        return res.status(400).json({ error: "Pages is invalid" });
    }

    if (ISBN10 && !validateISBN10(ISBN10)) {
        return res.status(400).json({ error: "ISBN10 is invalid" });
    }

    if (link && !validateLink(link)) {
        return res.status(400).json({ error: "Link is invalid" });
    }

    next();
}

function validateBookDataUpdate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { title, author, pages, tags, ISBN10, link } = req.body;

    if (title && !validateTitle(title)) {
        return res.status(400).json({ error: "Title is invalid" });
    }

    if (author && !validateAuthor(author)) {
        return res.status(400).json({ error: "Author is invalid" });
    }

    if (pages && !validatePages(pages)) {
        return res.status(400).json({ error: "Pages is invalid" });
    }

    if (tags && !validateTags(tags)) {
        return res.status(400).json({ error: "Tags is invalid" });
    }

    if (ISBN10 && !validateISBN10(ISBN10)) {
        return res.status(400).json({ error: "ISBN10 is invalid" });
    }

    if (link && !validateLink(link)) {
        return res.status(400).json({ error: "Link is invalid" });
    }

    next();
}

export { validateBookDataPost, validateBookDataUpdate };
