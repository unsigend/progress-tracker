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
    ISBN13_LENGTH: 13,
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

function validateISBN(ISBN: string): boolean {
    if (
        ISBN.length !== VALIDATION_CONSTANTS.ISBN10_LENGTH &&
        ISBN.length !== VALIDATION_CONSTANTS.ISBN13_LENGTH
    ) {
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
    const { title, author, pages, tags, ISBN, link } = req.body;

    // validate title
    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    } else {
        if (!validateTitle(title)) {
            return res.status(400).json({ error: "Title is invalid" });
        }
    }

    // validate author
    if (author && !validateAuthor(author)) {
        return res.status(400).json({ error: "Author is invalid" });
    }

    // validate tags
    if (tags && !validateTags(tags)) {
        return res.status(400).json({ error: "Tags is invalid" });
    }

    // validate pages
    if (pages && !validatePages(pages)) {
        return res.status(400).json({ error: "Pages is invalid" });
    }

    // validate ISBN
    if (ISBN && !validateISBN(ISBN)) {
        return res.status(400).json({ error: "ISBN is invalid" });
    }

    // validate link
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
    let { title, author, pages, tags, ISBN, link } = req.body;

    // validate title
    if (title && !validateTitle(title)) {
        return res.status(400).json({ error: "Title is invalid" });
    }

    // validate author
    if (author && !validateAuthor(author)) {
        return res.status(400).json({ error: "Author is invalid" });
    }

    // validate pages
    if (pages && !validatePages(pages)) {
        return res.status(400).json({ error: "Pages is invalid" });
    }

    // validate tags
    if (tags && !validateTags(tags)) {
        return res.status(400).json({ error: "Tags is invalid" });
    }

    // validate ISBN
    if (ISBN && !validateISBN(ISBN)) {
        return res.status(400).json({ error: "ISBN is invalid" });
    }

    // validate link
    if (link && !validateLink(link)) {
        return res.status(400).json({ error: "Link is invalid" });
    }

    next();
}

export { validateBookDataPost, validateBookDataUpdate };
