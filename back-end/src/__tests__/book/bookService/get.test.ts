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

const sampleBooksData = [
    {
        title: "The Rust Programming Language",
        author: "Steve Klabnik",
        pages: 552,
        tags: ["systems", "programming", "rust"],
        ISBN10: "1593278284",
    },
    {
        title: "Clean Code",
        author: "Robert C. Martin",
        pages: 464,
        tags: ["programming", "best-practices", "software-engineering"],
        ISBN10: "0132350882",
    },
    {
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        pages: 176,
        tags: ["javascript", "programming", "web-development"],
        ISBN10: "0596517742",
    },
    {
        title: "Design Patterns",
        author: "Gang of Four",
        pages: 395,
        tags: ["design-patterns", "programming", "software-architecture"],
        ISBN10: "0201633612",
    },
    {
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        pages: 1312,
        tags: ["algorithms", "computer-science", "data-structures"],
        ISBN10: "0262033844",
    },
];

describe("Book Service: Get Methods", () => {
    beforeEach(async () => {
        await BookModel.deleteMany({});
    });

    describe("getAllBooks()", () => {
        it("should return all books when no books exist", async () => {
            const options = { limit: 10 };
            const books = await BookService.getAllBooks(options);

            expect(books).toEqual([]);
            expect(books).toHaveLength(0);
        });

        it("should return all books when books exist", async () => {
            // Insert sample data
            await BookModel.insertMany(sampleBooksData);

            const options = { limit: 10 };
            const books = await BookService.getAllBooks(options);

            expect(books).toHaveLength(5);
            expect(books[0]).toHaveProperty("title");
            expect(books[0]).toHaveProperty("author");
            expect(books[0]).toHaveProperty("pages");
        });

        it("should confirm limit option", async () => {
            await BookModel.insertMany(sampleBooksData);

            const options = { limit: 3 };
            const books = await BookService.getAllBooks(options);

            expect(books).toHaveLength(3);
        });

        it("should sort by createdAt desc by default", async () => {
            await BookModel.insertMany(sampleBooksData);

            const options = { limit: 10 };
            const books = await BookService.getAllBooks(options);

            expect(books).toHaveLength(5);
            // Should be sorted by createdAt in descending order by default
            for (let i = 1; i < books.length; i++) {
                expect(books[i - 1].createdAt >= books[i].createdAt).toBe(true);
            }
        });

        it("should sort by pages ascending when specified", async () => {
            await BookModel.insertMany(sampleBooksData);

            const options = {
                sortBy: "pages" as const,
                sortOrder: "asc" as const,
                limit: 10,
            };
            const books = await BookService.getAllBooks(options);

            expect(books).toHaveLength(5);
            expect(books[0].pages).toBe(176);
            expect(books[4].pages).toBe(1312);
        });
    });

    describe("getAllBooksByQuery()", () => {
        beforeEach(async () => {
            await BookModel.insertMany(sampleBooksData);
        });

        it("should return books matching author query", async () => {
            const query = { author: "Robert C. Martin" };
            const options = { limit: 10 };
            const books = await BookService.getAllBooksByQuery(query, options);

            expect(books).toHaveLength(1);
            expect(books[0].title).toBe("Clean Code");
            expect(books[0].author).toBe("Robert C. Martin");
        });

        it("should return books matching title query", async () => {
            const query = { title: "The Rust Programming Language" };
            const options = { limit: 10 };
            const books = await BookService.getAllBooksByQuery(query, options);

            expect(books).toHaveLength(1);
            expect(books[0].title).toBe("The Rust Programming Language");
            expect(books[0].author).toBe("Steve Klabnik");
        });

        it("should return empty array for non-matching query", async () => {
            const query = { author: "Non-existent Author" };
            const options = { limit: 10 };
            const books = await BookService.getAllBooksByQuery(query, options);

            expect(books).toEqual([]);
            expect(books).toHaveLength(0);
        });

        it("should respect sorting options in query", async () => {
            const query = {};
            const options = {
                sortBy: "pages" as const,
                sortOrder: "desc" as const,
                limit: 3,
            };
            const books = await BookService.getAllBooksByQuery(query, options);

            expect(books).toHaveLength(3);
            expect(books[0].pages).toBe(1312);
            expect(books[1].pages).toBe(552);
            expect(books[2].pages).toBe(464);
        });
    });

    describe("getBookById()", () => {
        let createdBook: any;

        beforeEach(async () => {
            const bookData = sampleBooksData[0];
            createdBook = await BookModel.create(bookData);
        });

        it("should return book when valid ID is provided", async () => {
            const book = await BookService.getBookById(
                createdBook._id.toString()
            );

            expect(book).not.toBeNull();
            expect(book!._id.toString()).toBe(createdBook._id.toString());
            expect(book!.title).toBe("The Rust Programming Language");
            expect(book!.author).toBe("Steve Klabnik");
            expect(book!.pages).toBe(552);
        });

        it("should return null when invalid ID is provided", async () => {
            const invalidId = "507f1f77bcf86cd799439011";
            const book = await BookService.getBookById(invalidId);

            expect(book).toBeNull();
        });

        it("should return book with all properties", async () => {
            const book = await BookService.getBookById(
                createdBook._id.toString()
            );

            expect(book).toHaveProperty("_id");
            expect(book).toHaveProperty("title");
            expect(book).toHaveProperty("author");
            expect(book).toHaveProperty("pages");
            expect(book).toHaveProperty("tags");
            expect(book).toHaveProperty("ISBN10");
            expect(book).toHaveProperty("createdAt");
        });
    });
});
