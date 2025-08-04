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
        title: "Clean Code",
        author: "Robert C. Martin",
        pages: 464,
        tags: ["programming", "best-practices"],
        ISBN10: "0132350882",
    },
    {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        pages: 352,
        tags: ["programming", "career"],
        ISBN10: "0201616220",
    },
    {
        title: "Design Patterns",
        author: "Gang of Four",
        pages: 395,
        tags: ["design-patterns", "programming"],
        ISBN10: "0201633612",
    },
    {
        title: "Refactoring",
        author: "Martin Fowler",
        pages: 448,
        tags: ["programming", "refactoring"],
        ISBN10: "0134757599",
    },
    {
        title: "Code Complete",
        author: "Steve McConnell",
        pages: 960,
        tags: ["programming", "software-construction"],
        ISBN10: "0735619670",
    },
];

describe("Book Service: Delete Methods", () => {
    beforeEach(async () => {
        await BookModel.deleteMany({});
    });

    describe("deleteBookById()", () => {
        let createdBook: any;

        beforeEach(async () => {
            createdBook = await BookModel.create(sampleBooksData[0]);
        });

        it("should delete a book by valid ID", async () => {
            const deletedBook = await BookService.deleteBookById(
                createdBook._id.toString()
            );

            expect(deletedBook).not.toBeNull();
            expect(deletedBook!._id.toString()).toBe(
                createdBook._id.toString()
            );
            expect(deletedBook!.title).toBe("Clean Code");
            expect(deletedBook!.author).toBe("Robert C. Martin");
        });

        it("should return null when book ID does not exist", async () => {
            const invalidId = "507f1f77bcf86cd799439011";
            const deletedBook = await BookService.deleteBookById(invalidId);

            expect(deletedBook).toBeNull();
        });

        it("should remove book from database after deletion", async () => {
            await BookService.deleteBookById(createdBook._id.toString());

            const bookFromDb = await BookModel.findById(createdBook._id);
            expect(bookFromDb).toBeNull();
        });

        it("should return the complete deleted book object", async () => {
            const deletedBook = await BookService.deleteBookById(
                createdBook._id.toString()
            );

            expect(deletedBook).not.toBeNull();
            expect(deletedBook).toHaveProperty("_id");
            expect(deletedBook).toHaveProperty("title");
            expect(deletedBook).toHaveProperty("author");
            expect(deletedBook).toHaveProperty("pages");
            expect(deletedBook).toHaveProperty("tags");
            expect(deletedBook).toHaveProperty("ISBN10");
            expect(deletedBook).toHaveProperty("createdAt");
        });

        it("should only delete the specified book", async () => {
            const anotherBook = await BookModel.create(sampleBooksData[1]);

            await BookService.deleteBookById(createdBook._id.toString());

            const remainingBook = await BookModel.findById(anotherBook._id);
            expect(remainingBook).not.toBeNull();
            expect(remainingBook!.title).toBe("The Pragmatic Programmer");
        });
    });

    describe("deleteBookByQuery()", () => {
        beforeEach(async () => {
            await BookModel.insertMany(sampleBooksData);
        });

        it("should delete books by author query", async () => {
            const query = { author: "Robert C. Martin" };
            const deletedCount = await BookService.deleteBookByQuery(query);

            expect(deletedCount).toBe(1);

            const remainingBooks = await BookModel.find(query);
            expect(remainingBooks).toHaveLength(0);
        });

        it("should delete books by title query", async () => {
            const query = { title: "Clean Code" };
            const deletedCount = await BookService.deleteBookByQuery(query);

            expect(deletedCount).toBe(1);

            const remainingBooks = await BookModel.find(query);
            expect(remainingBooks).toHaveLength(0);
        });

        it("should delete multiple books with same author", async () => {
            // Add another book by Robert C. Martin
            await BookModel.create({
                title: "Clean Architecture",
                author: "Robert C. Martin",
                pages: 432,
                tags: ["architecture", "programming"],
                ISBN10: "0134494164",
            });

            const query = { author: "Robert C. Martin" };
            const deletedCount = await BookService.deleteBookByQuery(query);

            expect(deletedCount).toBe(2);

            const remainingBooks = await BookModel.find(query);
            expect(remainingBooks).toHaveLength(0);
        });

        it("should return 0 when no books match query", async () => {
            const query = { author: "Non-existent Author" };
            const deletedCount = await BookService.deleteBookByQuery(query);

            expect(deletedCount).toBe(0);

            const totalBooks = await BookModel.countDocuments({});
            expect(totalBooks).toBe(5); // All original books should remain
        });

        it("should delete all books with empty query", async () => {
            const query = {};
            const deletedCount = await BookService.deleteBookByQuery(query);

            expect(deletedCount).toBe(5);

            const remainingBooks = await BookModel.find({});
            expect(remainingBooks).toHaveLength(0);
        });

        it("should delete books by ISBN10 query", async () => {
            const query = { ISBN10: "0132350882" };
            const deletedCount = await BookService.deleteBookByQuery(query);

            expect(deletedCount).toBe(1);

            const remainingBooks = await BookModel.find(query);
            expect(remainingBooks).toHaveLength(0);
        });

        it("should not affect other books when deleting by specific query", async () => {
            const query = { author: "Martin Fowler" };
            const deletedCount = await BookService.deleteBookByQuery(query);

            expect(deletedCount).toBe(1);

            const remainingBooks = await BookModel.find({});
            expect(remainingBooks).toHaveLength(4);

            // Verify the correct book was deleted
            const deletedBook = await BookModel.findOne({
                title: "Refactoring",
            });
            expect(deletedBook).toBeNull();
        });

        it("should handle complex query with multiple fields", async () => {
            const query = {
                author: "Robert C. Martin",
                title: "Clean Code",
            };
            const deletedCount = await BookService.deleteBookByQuery(query);

            expect(deletedCount).toBe(1);

            const remainingBooks = await BookModel.find({});
            expect(remainingBooks).toHaveLength(4);
        });

        it("should delete books by pages field", async () => {
            // Delete books with exactly 464 pages
            const query = { pages: "464" }; // Note: query uses string values
            const deletedCount = await BookService.deleteBookByQuery(query);

            // This should delete Clean Code which has 464 pages
            expect(deletedCount).toBe(1);

            const remainingBooks = await BookModel.find({});
            expect(remainingBooks).toHaveLength(4);
        });

        it("should verify database state after deletion", async () => {
            const query = { author: "Andrew Hunt" };
            await BookService.deleteBookByQuery(query);

            const allBooks = await BookModel.find({});
            const titles = allBooks.map((book) => book.title);

            expect(titles).not.toContain("The Pragmatic Programmer");
            expect(titles).toContain("Clean Code");
            expect(titles).toContain("Design Patterns");
            expect(titles).toContain("Refactoring");
            expect(titles).toContain("Code Complete");
        });
    });
});
