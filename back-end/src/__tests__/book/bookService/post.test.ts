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

import BookService from "@/services/book/bookService";
import { describe, it, expect, beforeEach } from "@jest/globals";
import BookModel from "@/models/book/bookModel";

const sampleBookData = {
    title: "Clean Architecture",
    author: "Robert C. Martin",
    pages: 432,
    tags: ["architecture", "programming", "software-design"],
    ISBN10: "0134494164",
    image: "https://example.com/clean-architecture.jpg",
    link: "https://example.com/book/clean-architecture",
};

const minimalBookData = {
    title: "Test Book",
};

const invalidBookData = {
    author: "Test Author",
    pages: 200,
    // Missing required title field
};

describe("Book Service: Create Methods", () => {
    beforeEach(async () => {
        await BookModel.deleteMany({});
    });

    describe("createBook()", () => {
        it("should create a book with complete data", async () => {
            const createdBook = await BookService.createBook(sampleBookData);

            expect(createdBook).not.toBeNull();
            expect(createdBook.title).toBe("Clean Architecture");
            expect(createdBook.author).toBe("Robert C. Martin");
            expect(createdBook.pages).toBe(432);
            expect(createdBook.tags).toEqual([
                "architecture",
                "programming",
                "software-design",
            ]);
            expect(createdBook.ISBN10).toBe("0134494164");
            expect(createdBook.image).toBe(
                "https://example.com/clean-architecture.jpg"
            );
            expect(createdBook.link).toBe(
                "https://example.com/book/clean-architecture"
            );
        });

        it("should create a book with minimal required data", async () => {
            const createdBook = await BookService.createBook(minimalBookData);

            expect(createdBook).not.toBeNull();
            expect(createdBook.title).toBe("Test Book");
            expect(createdBook.author).toBeUndefined();
            expect(createdBook.pages).toBeUndefined();
            expect(createdBook.tags).toEqual([]);
            expect(createdBook.ISBN10).toBeUndefined();
        });

        it("should auto-generate createdAt timestamp", async () => {
            const beforeCreate = new Date();
            const createdBook = await BookService.createBook(sampleBookData);
            const afterCreate = new Date();

            expect(createdBook.createdAt).toBeDefined();
            expect(createdBook.createdAt.getTime()).toBeGreaterThanOrEqual(
                beforeCreate.getTime()
            );
            expect(createdBook.createdAt.getTime()).toBeLessThanOrEqual(
                afterCreate.getTime()
            );
        });

        it("should auto-generate unique _id", async () => {
            const book1 = await BookService.createBook({
                title: "Book 1",
            });
            const book2 = await BookService.createBook({
                title: "Book 2",
            });

            expect(book1._id).toBeDefined();
            expect(book2._id).toBeDefined();
            expect(book1._id.toString()).not.toBe(book2._id.toString());
        });

        it("should allow multiple books with same title", async () => {
            const bookData = { title: "Duplicate Title" };

            const book1 = await BookService.createBook(bookData);
            const book2 = await BookService.createBook(bookData);

            expect(book1).not.toBeNull();
            expect(book2).not.toBeNull();
            expect(book1.title).toBe("Duplicate Title");
            expect(book2.title).toBe("Duplicate Title");
            expect(book1._id.toString()).not.toBe(book2._id.toString());
        });

        it("should handle empty tags array", async () => {
            const bookWithEmptyTags = {
                title: "Book with Empty Tags",
                author: "Test Author",
                tags: [],
            };

            const createdBook = await BookService.createBook(bookWithEmptyTags);

            expect(createdBook).not.toBeNull();
            expect(createdBook.tags).toEqual([]);
        });

        it("should handle numeric pages correctly", async () => {
            const bookWithPages = {
                title: "Book with Pages",
                pages: 0,
            };

            const createdBook = await BookService.createBook(bookWithPages);

            expect(createdBook).not.toBeNull();
            expect(createdBook.pages).toBe(0);
        });

        it("should preserve all optional fields", async () => {
            const bookData = {
                title: "Complete Book",
                author: "Test Author",
                pages: 300,
                tags: ["test", "complete"],
                ISBN10: "1234567890",
                image: "http://example.com/image.jpg",
                link: "http://example.com/book",
            };

            const createdBook = await BookService.createBook(bookData);

            expect(createdBook.title).toBe("Complete Book");
            expect(createdBook.author).toBe("Test Author");
            expect(createdBook.pages).toBe(300);
            expect(createdBook.tags).toEqual(["test", "complete"]);
            expect(createdBook.ISBN10).toBe("1234567890");
            expect(createdBook.image).toBe("http://example.com/image.jpg");
            expect(createdBook.link).toBe("http://example.com/book");
        });

        it("should verify book is saved in database", async () => {
            const createdBook = await BookService.createBook(sampleBookData);
            const foundBook = await BookModel.findById(createdBook._id);

            expect(foundBook).not.toBeNull();
            expect(foundBook!.title).toBe("Clean Architecture");
            expect(foundBook!.author).toBe("Robert C. Martin");
        });
    });
});
