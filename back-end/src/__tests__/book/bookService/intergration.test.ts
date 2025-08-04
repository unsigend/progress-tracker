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
        tags: ["programming", "best-practices", "software-engineering"],
        ISBN10: "0132350882",
        image: "https://example.com/clean-code.jpg",
        link: "https://example.com/book/clean-code",
    },
    {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        pages: 352,
        tags: ["programming", "career", "software-development"],
        ISBN10: "0201616220",
        image: "https://example.com/pragmatic-programmer.jpg",
        link: "https://example.com/book/pragmatic-programmer",
    },
    {
        title: "Design Patterns",
        author: "Gang of Four",
        pages: 395,
        tags: ["design-patterns", "programming", "software-architecture"],
        ISBN10: "0201633612",
        image: "https://example.com/design-patterns.jpg",
        link: "https://example.com/book/design-patterns",
    },
    {
        title: "Refactoring",
        author: "Martin Fowler",
        pages: 448,
        tags: ["programming", "refactoring", "code-quality"],
        ISBN10: "0134757599",
        image: "https://example.com/refactoring.jpg",
        link: "https://example.com/book/refactoring",
    },
];

const newBookData = {
    title: "Test Driven Development",
    author: "Kent Beck",
    pages: 240,
    tags: ["testing", "programming", "agile"],
    ISBN10: "0321146530",
    image: "https://example.com/tdd.jpg",
    link: "https://example.com/book/tdd",
};

describe("Book Service: Integration Tests", () => {
    beforeEach(async () => {
        await BookModel.deleteMany({});
    });

    describe("Complete Book Lifecycle", () => {
        it("should handle full CRUD operations on a single book", async () => {
            // CREATE - Create a new book
            const createdBook = await BookService.createBook(newBookData);
            expect(createdBook).not.toBeNull();
            expect(createdBook.title).toBe("Test Driven Development");
            expect(createdBook.author).toBe("Kent Beck");
            expect(createdBook._id).toBeDefined();

            const bookId = createdBook._id.toString();

            // READ - Get the created book by ID
            const fetchedBook = await BookService.getBookById(bookId);
            expect(fetchedBook).not.toBeNull();
            expect(fetchedBook!.title).toBe("Test Driven Development");
            expect(fetchedBook!.author).toBe("Kent Beck");

            // UPDATE - Modify the book
            const updateData = {
                title: "Test Driven Development: By Example",
                pages: 250,
                tags: ["testing", "programming", "agile", "examples"],
            };
            const updatedBook = await BookService.updateBook(
                bookId,
                updateData
            );
            expect(updatedBook).not.toBeNull();
            expect(updatedBook!.title).toBe(
                "Test Driven Development: By Example"
            );
            expect(updatedBook!.pages).toBe(250);
            expect(updatedBook!.tags).toEqual([
                "testing",
                "programming",
                "agile",
                "examples",
            ]);
            expect(updatedBook!.author).toBe("Kent Beck"); // Should remain unchanged

            // DELETE - Remove the book
            const deletedBook = await BookService.deleteBookById(bookId);
            expect(deletedBook).not.toBeNull();
            expect(deletedBook!._id.toString()).toBe(bookId);

            // Verify deletion
            const verifyDeleted = await BookService.getBookById(bookId);
            expect(verifyDeleted).toBeNull();
        });

        it("should handle batch operations correctly", async () => {
            // CREATE multiple books
            const createdBooks = [];
            for (const bookData of sampleBooksData) {
                const book = await BookService.createBook(bookData);
                createdBooks.push(book);
            }

            // Verify all books were created
            expect(createdBooks).toHaveLength(4);
            createdBooks.forEach((book, index) => {
                expect(book.title).toBe(sampleBooksData[index].title);
                expect(book.author).toBe(sampleBooksData[index].author);
            });

            // READ - Get all books
            const allBooks = await BookService.getAllBooks({ limit: 10 });
            expect(allBooks).toHaveLength(4);

            // READ - Query books by author
            const martinBooks = await BookService.getAllBooksByQuery(
                { author: "Robert C. Martin" },
                { limit: 10 }
            );
            expect(martinBooks).toHaveLength(1);
            expect(martinBooks[0].title).toBe("Clean Code");

            // UPDATE - Update multiple books by query would require individual updates
            // Let's update the Clean Code book
            const cleanCodeBook = createdBooks.find(
                (book) => book.title === "Clean Code"
            );
            const updatedCleanCode = await BookService.updateBook(
                cleanCodeBook!._id.toString(),
                { pages: 500 }
            );
            expect(updatedCleanCode!.pages).toBe(500);

            // DELETE - Delete books by query
            const deletedCount = await BookService.deleteBookByQuery({
                author: "Martin Fowler",
            });
            expect(deletedCount).toBe(1);

            // Verify deletion affected only the target book
            const remainingBooks = await BookService.getAllBooks({ limit: 10 });
            expect(remainingBooks).toHaveLength(3);
            expect(
                remainingBooks.some((book) => book.title === "Refactoring")
            ).toBe(false);
        });
    });

    describe("Search and Filter Workflows", () => {
        beforeEach(async () => {
            await BookModel.insertMany(sampleBooksData);
        });

        it("should support complex search scenarios", async () => {
            // Search by author
            const martinBooks = await BookService.getAllBooksByQuery(
                { author: "Robert C. Martin" },
                { limit: 10 }
            );
            expect(martinBooks).toHaveLength(1);
            expect(martinBooks[0].title).toBe("Clean Code");

            // Search with sorting
            const booksByPages = await BookService.getAllBooks({
                sortBy: "pages",
                sortOrder: "asc",
                limit: 10,
            });
            expect(booksByPages[0].pages).toBe(352); // The Pragmatic Programmer
            expect(booksByPages[3].pages).toBe(464); // Clean Code

            // Search with limit
            const limitedBooks = await BookService.getAllBooks({ limit: 2 });
            expect(limitedBooks).toHaveLength(2);

            // Search by non-existent criteria
            const nonExistentBooks = await BookService.getAllBooksByQuery(
                { author: "Non-existent Author" },
                { limit: 10 }
            );
            expect(nonExistentBooks).toHaveLength(0);
        });

        it("should handle edge cases in search", async () => {
            // Get book by invalid ID
            const invalidBook = await BookService.getBookById(
                "507f1f77bcf86cd799439011"
            );
            expect(invalidBook).toBeNull();

            // Search with empty query should return all books
            const allBooksQuery = await BookService.getAllBooksByQuery(
                {},
                { limit: 10 }
            );
            expect(allBooksQuery).toHaveLength(4);

            // Search with limit larger than available books
            const moreBooks = await BookService.getAllBooks({ limit: 100 });
            expect(moreBooks).toHaveLength(4);
        });
    });

    describe("Data Consistency Workflows", () => {
        it("should maintain data integrity across operations", async () => {
            // Create initial book
            const book1 = await BookService.createBook(sampleBooksData[0]);
            const book2 = await BookService.createBook(sampleBooksData[1]);

            // Verify initial state
            const initialBooks = await BookService.getAllBooks({ limit: 10 });
            expect(initialBooks).toHaveLength(2);

            // Update one book
            const updatedBook1 = await BookService.updateBook(
                book1._id.toString(),
                { pages: 600 }
            );
            expect(updatedBook1!.pages).toBe(600);

            // Verify other book unchanged
            const unchangedBook2 = await BookService.getBookById(
                book2._id.toString()
            );
            expect(unchangedBook2!.pages).toBe(352);

            // Delete one book
            await BookService.deleteBookById(book1._id.toString());

            // Verify only one book remains
            const finalBooks = await BookService.getAllBooks({ limit: 10 });
            expect(finalBooks).toHaveLength(1);
            expect(finalBooks[0]._id.toString()).toBe(book2._id.toString());
        });

        it("should handle concurrent-like operations correctly", async () => {
            // Create multiple books in sequence
            const books = [];
            for (const data of sampleBooksData) {
                const book = await BookService.createBook(data);
                books.push(book);
            }

            // Perform multiple read operations
            const [allBooks, martinBooks, designBooks] = await Promise.all([
                BookService.getAllBooks({ limit: 10 }),
                BookService.getAllBooksByQuery(
                    { author: "Robert C. Martin" },
                    { limit: 10 }
                ),
                BookService.getAllBooksByQuery(
                    { title: "Design Patterns" },
                    { limit: 10 }
                ),
            ]);

            expect(allBooks).toHaveLength(4);
            expect(martinBooks).toHaveLength(1);
            expect(designBooks).toHaveLength(1);

            // Perform multiple update operations
            const updatePromises = books.slice(0, 2).map((book, index) =>
                BookService.updateBook(book._id.toString(), {
                    pages: 500 + index,
                })
            );

            const updatedBooks = await Promise.all(updatePromises);
            expect(updatedBooks[0]!.pages).toBe(500);
            expect(updatedBooks[1]!.pages).toBe(501);
        });
    });

    describe("Error Handling and Edge Cases", () => {
        it("should handle invalid operations gracefully", async () => {
            // Try to update non-existent book
            const invalidUpdate = await BookService.updateBook(
                "507f1f77bcf86cd799439011",
                { title: "Updated Title" }
            );
            expect(invalidUpdate).toBeNull();

            // Try to delete non-existent book
            const invalidDelete = await BookService.deleteBookById(
                "507f1f77bcf86cd799439011"
            );
            expect(invalidDelete).toBeNull();

            // Delete by query with no matches
            const noDeleteCount = await BookService.deleteBookByQuery({
                author: "Non-existent Author",
            });
            expect(noDeleteCount).toBe(0);
        });

        it("should handle empty database operations", async () => {
            // Ensure database is empty
            await BookModel.deleteMany({});

            // Get all books from empty database
            const emptyBooks = await BookService.getAllBooks({ limit: 10 });
            expect(emptyBooks).toHaveLength(0);

            // Query empty database
            const emptyQuery = await BookService.getAllBooksByQuery(
                { author: "Any Author" },
                { limit: 10 }
            );
            expect(emptyQuery).toHaveLength(0);

            // Delete from empty database
            const emptyDeleteCount = await BookService.deleteBookByQuery({});
            expect(emptyDeleteCount).toBe(0);
        });
    });

    describe("Complex Business Scenarios", () => {
        it("should support library management workflow", async () => {
            // Initial library setup - add multiple books
            const libraryBooks = [];
            for (const data of sampleBooksData) {
                const book = await BookService.createBook(data);
                libraryBooks.push(book);
            }

            // Librarian searches for programming books
            const programmingBooks = await BookService.getAllBooks({
                sortBy: "pages",
                sortOrder: "desc",
                limit: 10,
            });
            expect(programmingBooks).toHaveLength(4);

            // Update book information (e.g., new edition)
            const cleanCodeBook = libraryBooks.find(
                (book) => book.title === "Clean Code"
            );
            const updatedCleanCode = await BookService.updateBook(
                cleanCodeBook!._id.toString(),
                {
                    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
                    pages: 464,
                }
            );
            expect(updatedCleanCode!.title).toBe(
                "Clean Code: A Handbook of Agile Software Craftsmanship"
            );

            // Remove outdated books
            const removedCount = await BookService.deleteBookByQuery({
                author: "Gang of Four",
            });
            expect(removedCount).toBe(1);

            // Final inventory check
            const finalInventory = await BookService.getAllBooks({ limit: 10 });
            expect(finalInventory).toHaveLength(3);
            expect(
                finalInventory.some((book) => book.title.includes("Clean Code"))
            ).toBe(true);
            expect(
                finalInventory.some((book) => book.title === "Design Patterns")
            ).toBe(false);
        });

        it("should support book recommendation workflow", async () => {
            // Setup books with tags
            await BookModel.insertMany(sampleBooksData);

            // User searches for books by specific author
            const martinBooks = await BookService.getAllBooksByQuery(
                { author: "Robert C. Martin" },
                { limit: 5 }
            );
            expect(martinBooks).toHaveLength(1);

            // Get all books sorted by pages (ascending) for beginner-friendly recommendations
            const beginnerBooks = await BookService.getAllBooks({
                sortBy: "pages",
                sortOrder: "asc",
                limit: 2,
            });
            expect(beginnerBooks).toHaveLength(2);
            expect(beginnerBooks[0].pages).toBeLessThanOrEqual(
                beginnerBooks[1].pages || 0
            );

            // Add a new book to recommendations
            const newRecommendation = await BookService.createBook({
                title: "JavaScript: The Good Parts",
                author: "Douglas Crockford",
                pages: 176,
                tags: ["javascript", "programming", "web-development"],
                ISBN10: "0596517742",
            });
            expect(newRecommendation.title).toBe("JavaScript: The Good Parts");

            // Verify total collection
            const totalBooks = await BookService.getAllBooks({ limit: 10 });
            expect(totalBooks).toHaveLength(5);
        });
    });
});
