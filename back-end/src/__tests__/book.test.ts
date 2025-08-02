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

// dependencies
import { describe, it, expect } from "@jest/globals";
import mongoose from "mongoose";

// services
import BookService from "@/services/book/bookService";

// models
import BookModel from "@/models/bookModel";

describe("BookService", () => {
    // Sample book data for testing
    const sampleBook = {
        title: "Test Book",
        image: "Test Image",
        author: "Test Author",
        tags: ["Test Tag", "Fiction"],
        pages: 100,
        createdAt: new Date(),
    };

    // Clean up after each test
    afterEach(async () => {
        await BookModel.deleteMany({});
    });

    describe("createBook()", () => {
        it("should create a book", async () => {
            // create book
            const bookDocument = await BookService.createBook(sampleBook);
            expect(bookDocument).toBeDefined();
            expect(bookDocument.title).toStrictEqual(sampleBook.title);
            expect(bookDocument.image).toStrictEqual(sampleBook.image);
            expect(bookDocument.author).toStrictEqual(sampleBook.author);
            expect(bookDocument.tags).toStrictEqual(sampleBook.tags);
            expect(bookDocument.pages).toStrictEqual(sampleBook.pages);
            expect(bookDocument.createdAt).toStrictEqual(sampleBook.createdAt);
            expect(bookDocument._id).toBeInstanceOf(mongoose.Types.ObjectId);

            // verify book exists in database
            const foundBook = await BookModel.findById(bookDocument._id);
            expect(foundBook).toBeDefined();
            expect(foundBook?.title).toStrictEqual(sampleBook.title);
            expect(foundBook?.image).toStrictEqual(sampleBook.image);
            expect(foundBook?.author).toStrictEqual(sampleBook.author);
            expect(foundBook?.tags).toStrictEqual(sampleBook.tags);
            expect(foundBook?.pages).toStrictEqual(sampleBook.pages);
            expect(foundBook?.createdAt).toStrictEqual(sampleBook.createdAt);
        });

        it("should not create a book without a title", async () => {
            const invalidBook = {
                ...sampleBook,
                title: "",
            };

            await expect(BookService.createBook(invalidBook)).rejects.toThrow();
        });

        it("should not create a book with missing title", async () => {
            const invalidBook = {
                image: "Test Image",
                author: "Test Author",
                // title is completely missing
            };

            await expect(
                BookService.createBook(invalidBook as any)
            ).rejects.toThrow();
        });

        it("should create a book with only title (minimal required data)", async () => {
            const minimalBook = {
                title: "Minimal Test Book",
            };

            const bookDocument = await BookService.createBook(
                minimalBook as any
            );
            expect(bookDocument).toBeDefined();
            expect(bookDocument.title).toBe("Minimal Test Book");
            expect(bookDocument._id).toBeInstanceOf(mongoose.Types.ObjectId);
            expect(bookDocument.createdAt).toBeInstanceOf(Date);

            // Optional fields should have default values
            expect(bookDocument.tags).toEqual([]);
        });
    });

    describe("getBooks()", () => {
        it("should return empty array when no books exist", async () => {
            const books = await BookService.getBooks();
            expect(books).toBeDefined();
            expect(Array.isArray(books)).toBe(true);
            expect(books.length).toBe(0);
        });

        it("should return all books when books exist", async () => {
            // Create test books
            const book1 = await BookModel.create({
                ...sampleBook,
                title: "Book 1",
            });
            const book2 = await BookModel.create({
                ...sampleBook,
                title: "Book 2",
            });
            const book3 = await BookModel.create({
                ...sampleBook,
                title: "Book 3",
            });

            const books = await BookService.getBooks();
            expect(books).toBeDefined();
            expect(Array.isArray(books)).toBe(true);
            expect(books.length).toBe(3);

            const titles = books.map((book) => book.title);
            expect(titles).toContain("Book 1");
            expect(titles).toContain("Book 2");
            expect(titles).toContain("Book 3");
        });
    });

    describe("getBookById()", () => {
        it("should return a book when valid ID is provided", async () => {
            // Create a test book
            const createdBook = await BookModel.create(sampleBook);

            const foundBook = await BookService.getBookById(
                createdBook._id.toString()
            );
            expect(foundBook).toBeDefined();
            expect(foundBook?._id).toStrictEqual(createdBook._id);
            expect(foundBook?.title).toStrictEqual(sampleBook.title);
            expect(foundBook?.author).toStrictEqual(sampleBook.author);
        });

        it("should return null when book with ID doesn't exist", async () => {
            const nonExistentId = new mongoose.Types.ObjectId().toString();
            const foundBook = await BookService.getBookById(nonExistentId);
            expect(foundBook).toBeNull();
        });

        it("should throw error when invalid ID format is provided", async () => {
            const invalidId = "invalid-id-format";
            await expect(BookService.getBookById(invalidId)).rejects.toThrow();
        });
    });

    describe("updateBook()", () => {
        it("should update a book when valid ID and data are provided", async () => {
            // Create a test book
            const createdBook = await BookModel.create(sampleBook);

            const updateData = {
                title: "Updated Book Title",
                author: "Updated Author",
                pages: 200,
            };

            const updatedBook = await BookService.updateBook(
                createdBook._id.toString(),
                updateData as any
            );
            expect(updatedBook).toBeDefined();
            expect(updatedBook?._id).toStrictEqual(createdBook._id);
            expect(updatedBook?.title).toBe("Updated Book Title");
            expect(updatedBook?.author).toBe("Updated Author");
            expect(updatedBook?.pages).toBe(200);

            // Verify update in database
            const foundBook = await BookModel.findById(createdBook._id);
            expect(foundBook?.title).toBe("Updated Book Title");
            expect(foundBook?.author).toBe("Updated Author");
            expect(foundBook?.pages).toBe(200);
        });

        it("should return null when trying to update non-existent book", async () => {
            const nonExistentId = new mongoose.Types.ObjectId().toString();
            const updateData = { title: "Updated Title" };

            const updatedBook = await BookService.updateBook(
                nonExistentId,
                updateData as any
            );
            expect(updatedBook).toBeNull();
        });

        it("should throw error when invalid ID format is provided", async () => {
            const invalidId = "invalid-id-format";
            const updateData = { title: "Updated Title" };

            await expect(
                BookService.updateBook(invalidId, updateData as any)
            ).rejects.toThrow();
        });

        it("should partially update a book", async () => {
            // Create a test book
            const createdBook = await BookModel.create(sampleBook);

            // Update only the title
            const updateData = { title: "Partially Updated Title" };
            const updatedBook = await BookService.updateBook(
                createdBook._id.toString(),
                updateData as any
            );

            expect(updatedBook).toBeDefined();
            expect(updatedBook?.title).toBe("Partially Updated Title");
            // Other fields should remain unchanged
            expect(updatedBook?.author).toBe(sampleBook.author);
            expect(updatedBook?.pages).toBe(sampleBook.pages);
        });
    });

    describe("deleteBook()", () => {
        it("should delete a book when valid ID is provided", async () => {
            // Create a test book
            const createdBook = await BookModel.create(sampleBook);

            // Verify book exists
            let foundBook = await BookModel.findById(createdBook._id);
            expect(foundBook).toBeDefined();

            // Delete the book
            await BookService.deleteBook(createdBook._id.toString());

            // Verify book is deleted
            foundBook = await BookModel.findById(createdBook._id);
            expect(foundBook).toBeNull();
        });

        it("should not throw error when trying to delete non-existent book", async () => {
            const nonExistentId = new mongoose.Types.ObjectId().toString();

            // Should not throw error
            await expect(
                BookService.deleteBook(nonExistentId)
            ).resolves.not.toThrow();
        });

        it("should throw error when invalid ID format is provided", async () => {
            const invalidId = "invalid-id-format";
            await expect(BookService.deleteBook(invalidId)).rejects.toThrow();
        });
    });

    describe("Integration Tests", () => {
        it("should perform complete CRUD operations flow", async () => {
            // CREATE
            const createdBook = await BookService.createBook(sampleBook);
            expect(createdBook).toBeDefined();
            expect(createdBook._id).toBeInstanceOf(mongoose.Types.ObjectId);

            // READ (getBookById)
            const foundBook = await BookService.getBookById(
                createdBook._id.toString()
            );
            expect(foundBook).toBeDefined();
            expect(foundBook?.title).toBe(sampleBook.title);

            // READ (getBooks)
            const allBooks = await BookService.getBooks();
            expect(allBooks.length).toBe(1);
            expect(allBooks[0].title).toBe(sampleBook.title);

            // UPDATE
            const updateData = { title: "Updated in Integration Test" };
            const updatedBook = await BookService.updateBook(
                createdBook._id.toString(),
                updateData as any
            );
            expect(updatedBook?.title).toBe("Updated in Integration Test");

            // Verify update
            const updatedFoundBook = await BookService.getBookById(
                createdBook._id.toString()
            );
            expect(updatedFoundBook?.title).toBe("Updated in Integration Test");

            // DELETE
            await BookService.deleteBook(createdBook._id.toString());

            // Verify deletion
            const deletedBook = await BookService.getBookById(
                createdBook._id.toString()
            );
            expect(deletedBook).toBeNull();

            const booksAfterDelete = await BookService.getBooks();
            expect(booksAfterDelete.length).toBe(0);
        });

        it("should handle multiple books correctly", async () => {
            // Create multiple books
            const book1 = await BookService.createBook({
                ...sampleBook,
                title: "Book 1",
            });
            const book2 = await BookService.createBook({
                ...sampleBook,
                title: "Book 2",
            });
            const book3 = await BookService.createBook({
                ...sampleBook,
                title: "Book 3",
            });

            // Get all books
            const allBooks = await BookService.getBooks();
            expect(allBooks.length).toBe(3);

            // Update one book
            await BookService.updateBook(book2._id.toString(), {
                title: "Updated Book 2",
            } as any);

            // Delete one book
            await BookService.deleteBook(book1._id.toString());

            // Verify final state
            const finalBooks = await BookService.getBooks();
            expect(finalBooks.length).toBe(2);

            const titles = finalBooks.map((book) => book.title);
            expect(titles).toContain("Updated Book 2");
            expect(titles).toContain("Book 3");
            expect(titles).not.toContain("Book 1");
        });
    });
});
