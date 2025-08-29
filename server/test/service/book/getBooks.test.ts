import {
    describe,
    test,
    expect,
    beforeAll,
    afterAll,
    beforeEach,
    afterEach,
} from "@jest/globals";
import bookService from "@/service/book.service";
import { BookType, BookQueryParamsType } from "@root/shared/types";
import BookModel from "@/models/book.model";
import mongoose from "mongoose";

describe("service/book/book.service.ts  -  getBooks()", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI!);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        const testBooks = [
            {
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                description: "A classic American novel",
                pages: 180,
                image: "https://example.com/gatsby.jpg",
                ISBN: "978-0743273565",
                createdAt: new Date("2023-01-01T00:00:00.000Z"),
                updatedAt: new Date("2023-01-01T00:00:00.000Z"),
            },
            {
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                description: "A novel about racial injustice",
                pages: 376,
                image: "https://example.com/mockingbird.jpg",
                ISBN: "978-0061120084",
                createdAt: new Date("2023-01-02T00:00:00.000Z"),
                updatedAt: new Date("2023-01-02T00:00:00.000Z"),
            },
            {
                title: "1984",
                author: "George Orwell",
                description: "A dystopian social science fiction novel",
                pages: 328,
                image: "https://example.com/1984.jpg",
                ISBN: "978-0451524935",
                createdAt: new Date("2023-01-03T00:00:00.000Z"),
                updatedAt: new Date("2023-01-03T00:00:00.000Z"),
            },
            {
                title: "Pride and Prejudice",
                author: "Jane Austen",
                description: "A romantic novel of manners",
                pages: 432,
                image: "https://example.com/pride.jpg",
                ISBN: "978-0141439518",
                createdAt: new Date("2023-01-04T00:00:00.000Z"),
                updatedAt: new Date("2023-01-04T00:00:00.000Z"),
            },
            {
                title: "The Catcher in the Rye",
                author: "J.D. Salinger",
                description: "A controversial coming-of-age story",
                pages: 277,
                image: "https://example.com/catcher.jpg",
                ISBN: "978-0316769174",
                createdAt: new Date("2023-01-05T00:00:00.000Z"),
                updatedAt: new Date("2023-01-05T00:00:00.000Z"),
            },
        ];

        await BookModel.insertMany(testBooks);
    });

    afterEach(async () => {
        await BookModel.deleteMany({});
    });

    test("should get all books with default parameters", async () => {
        const queryObject: BookQueryParamsType = {};
        const books = await bookService.getBooks(queryObject);

        expect(books).toBeDefined();
        expect(Array.isArray(books)).toBe(true);
        expect(books.length).toBe(5);

        expect(new Date(books[0].createdAt!).getTime()).toBeGreaterThanOrEqual(
            new Date(books[1].createdAt!).getTime()
        );
    });

    test("should handle empty query object", async () => {
        const books = await bookService.getBooks({});

        expect(books).toBeDefined();
        expect(Array.isArray(books)).toBe(true);
        expect(books.length).toBe(5);
    });

    test("should handle null/undefined query object", async () => {
        const books = await bookService.getBooks(null as any);

        expect(books).toBeDefined();
        expect(Array.isArray(books)).toBe(true);
        expect(books.length).toBe(5);
    });

    test("should sort books by title ascending", async () => {
        const queryObject: BookQueryParamsType = {
            sortBy: "title",
            sortOrder: "asc",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(5);
        expect(books[0].title).toBe("1984");
        expect(books[1].title).toBe("Pride and Prejudice");
        expect(books[2].title).toBe("The Catcher in the Rye");
        expect(books[3].title).toBe("The Great Gatsby");
        expect(books[4].title).toBe("To Kill a Mockingbird");
    });

    test("should sort books by title descending", async () => {
        const queryObject: BookQueryParamsType = {
            sortBy: "title",
            sortOrder: "desc",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(5);
        expect(books[0].title).toBe("To Kill a Mockingbird");
        expect(books[1].title).toBe("The Great Gatsby");
        expect(books[2].title).toBe("The Catcher in the Rye");
        expect(books[3].title).toBe("Pride and Prejudice");
        expect(books[4].title).toBe("1984");
    });

    test("should sort books by createdAt ascending", async () => {
        const queryObject: BookQueryParamsType = {
            sortBy: "createdAt",
            sortOrder: "asc",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(5);
        expect(books[0].title).toBe("The Great Gatsby");
        expect(books[1].title).toBe("To Kill a Mockingbird");
        expect(books[2].title).toBe("1984");
        expect(books[3].title).toBe("Pride and Prejudice");
        expect(books[4].title).toBe("The Catcher in the Rye");
    });

    test("should sort books by createdAt descending (default)", async () => {
        const queryObject: BookQueryParamsType = {
            sortBy: "createdAt",
            sortOrder: "desc",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(5);
        expect(books[0].title).toBe("The Catcher in the Rye");
        expect(books[1].title).toBe("Pride and Prejudice");
        expect(books[2].title).toBe("1984");
        expect(books[3].title).toBe("To Kill a Mockingbird");
        expect(books[4].title).toBe("The Great Gatsby");
    });

    test("should sort books by ISBN ascending", async () => {
        const queryObject: BookQueryParamsType = {
            sortBy: "ISBN",
            sortOrder: "asc",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(5);
        expect(books[0].ISBN).toBe("978-0061120084");
        expect(books[1].ISBN).toBe("978-0141439518");
        expect(books[2].ISBN).toBe("978-0316769174");
        expect(books[3].ISBN).toBe("978-0451524935");
        expect(books[4].ISBN).toBe("978-0743273565");
    });

    test("should sort books by ISBN descending", async () => {
        const queryObject: BookQueryParamsType = {
            sortBy: "ISBN",
            sortOrder: "desc",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(5);
        expect(books[0].ISBN).toBe("978-0743273565");
        expect(books[1].ISBN).toBe("978-0451524935");
        expect(books[2].ISBN).toBe("978-0316769174");
        expect(books[3].ISBN).toBe("978-0141439518");
        expect(books[4].ISBN).toBe("978-0061120084");
    });

    test("should handle pagination - first page", async () => {
        const queryObject: BookQueryParamsType = {
            page: 1,
            limit: 2,
            sortBy: "title",
            sortOrder: "asc",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(2);
        expect(books[0].title).toBe("1984");
        expect(books[1].title).toBe("Pride and Prejudice");
    });

    test("should handle pagination - second page", async () => {
        const queryObject: BookQueryParamsType = {
            page: 2,
            limit: 2,
            sortBy: "title",
            sortOrder: "asc",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(2);
        expect(books[0].title).toBe("The Catcher in the Rye");
        expect(books[1].title).toBe("The Great Gatsby");
    });

    test("should handle pagination - third page", async () => {
        const queryObject: BookQueryParamsType = {
            page: 3,
            limit: 2,
            sortBy: "title",
            sortOrder: "asc",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(1);
        expect(books[0].title).toBe("To Kill a Mockingbird");
    });

    test("should handle pagination - page beyond available data", async () => {
        const queryObject: BookQueryParamsType = {
            page: 10,
            limit: 2,
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(0);
    });

    test("should handle different limit values", async () => {
        const limits = [1, 3, 5, 10];

        for (const limit of limits) {
            const queryObject: BookQueryParamsType = { limit };
            const books = await bookService.getBooks(queryObject);

            expect(books.length).toBeLessThanOrEqual(limit);
            expect(books.length).toBeLessThanOrEqual(5);
        }
    });

    test("should handle large limit value", async () => {
        const queryObject: BookQueryParamsType = {
            limit: 100,
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(5);
    });

    test("should search books by title - exact match", async () => {
        const queryObject: BookQueryParamsType = {
            search: "1984",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(1);
        expect(books[0].title).toBe("1984");
    });

    test("should search books by title - partial match", async () => {
        const queryObject: BookQueryParamsType = {
            search: "Great",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(1);
        expect(books[0].title).toBe("The Great Gatsby");
    });

    test("should search books by title - case insensitive", async () => {
        const queryObject: BookQueryParamsType = {
            search: "gatsby",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(1);
        expect(books[0].title).toBe("The Great Gatsby");
    });

    test("should search books by author - exact match", async () => {
        const queryObject: BookQueryParamsType = {
            search: "Harper Lee",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(1);
        expect(books[0].author).toBe("Harper Lee");
    });

    test("should search books by author - partial match", async () => {
        const queryObject: BookQueryParamsType = {
            search: "Orwell",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(1);
        expect(books[0].author).toBe("George Orwell");
    });

    test("should search books by author - case insensitive", async () => {
        const queryObject: BookQueryParamsType = {
            search: "jane austen",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(1);
        expect(books[0].author).toBe("Jane Austen");
    });

    test("should search books by ISBN - exact match", async () => {
        const queryObject: BookQueryParamsType = {
            search: "978-0743273565",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(1);
        expect(books[0].ISBN).toBe("978-0743273565");
        expect(books[0].title).toBe("The Great Gatsby");
    });

    test("should search books by ISBN - without hyphens", async () => {
        await BookModel.create({
            title: "Book Without Hyphens",
            author: "Test Author",
            ISBN: "9780123456789",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const queryObject: BookQueryParamsType = {
            search: "9780123456789",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(1);
        expect(books[0].ISBN).toBe("9780123456789");
        expect(books[0].title).toBe("Book Without Hyphens");
    });

    test("should search and find multiple books matching criteria", async () => {
        const queryObject: BookQueryParamsType = {
            search: "The",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books.length).toBeGreaterThan(1);
        books.forEach((book) => {
            expect(book.title.toLowerCase()).toContain("the");
        });
    });

    test("should return empty array for no search matches", async () => {
        const queryObject: BookQueryParamsType = {
            search: "NonexistentBook",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(0);
    });

    test("should handle search with whitespace", async () => {
        const queryObject: BookQueryParamsType = {
            search: "  gatsby  ",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(1);
        expect(books[0].title).toBe("The Great Gatsby");
    });

    test("should handle empty search string", async () => {
        const queryObject: BookQueryParamsType = {
            search: "",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(5);
    });

    test("should handle search string with only whitespace", async () => {
        const queryObject: BookQueryParamsType = {
            search: "   ",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(5);
    });

    test("should combine search and sorting", async () => {
        const queryObject: BookQueryParamsType = {
            search: "The",
            sortBy: "title",
            sortOrder: "asc",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books.length).toBeGreaterThan(1);

        for (let i = 0; i < books.length - 1; i++) {
            expect(
                books[i].title.localeCompare(books[i + 1].title)
            ).toBeLessThanOrEqual(0);
        }
    });

    test("should combine search and pagination", async () => {
        const queryObject: BookQueryParamsType = {
            search: "The",
            page: 1,
            limit: 1,
            sortBy: "title",
            sortOrder: "asc",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(1);
        expect(books[0].title).toContain("The");
    });

    test("should combine all parameters", async () => {
        const queryObject: BookQueryParamsType = {
            search: "The",
            sortBy: "createdAt",
            sortOrder: "desc",
            page: 1,
            limit: 2,
        };
        const books = await bookService.getBooks(queryObject);

        expect(books.length).toBeLessThanOrEqual(2);

        books.forEach((book) => {
            expect(book.title.toLowerCase()).toContain("the");
        });

        if (books.length > 1) {
            expect(
                new Date(books[0].createdAt!).getTime()
            ).toBeGreaterThanOrEqual(new Date(books[1].createdAt!).getTime());
        }
    });

    test("should handle search with special characters", async () => {
        await BookModel.create({
            title: "Book with Special: !@#$%^&*()",
            author: "Special Author",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const queryObject: BookQueryParamsType = {
            search: "Special:",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(1);
        expect(books[0].title).toBe("Book with Special: !@#$%^&*()");
    });

    test("should handle search with unicode characters", async () => {
        await BookModel.create({
            title: "编程之美",
            author: "作者名",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const queryObject: BookQueryParamsType = {
            search: "编程",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(1);
        expect(books[0].title).toBe("编程之美");
    });

    test("should handle very large page numbers", async () => {
        const queryObject: BookQueryParamsType = {
            page: 999999,
            limit: 10,
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(0);
    });

    test("should handle very large limit numbers", async () => {
        const queryObject: BookQueryParamsType = {
            limit: 999999,
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(5);
    });

    test("should handle page 0 (should default to page 1)", async () => {
        const queryObject: BookQueryParamsType = {
            page: 0,
            limit: 2,
            sortBy: "title",
            sortOrder: "asc",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(2);
        expect(books[0].title).toBe("1984");
        expect(books[1].title).toBe("Pride and Prejudice");
    });

    test("should handle limit 0 (should default to 10)", async () => {
        const queryObject: BookQueryParamsType = {
            limit: 0,
        };
        const books = await bookService.getBooks(queryObject);

        expect(books).toHaveLength(5);
    });

    test("should return books with all required fields", async () => {
        const books = await bookService.getBooks({});

        books.forEach((book) => {
            expect(book.title).toBeDefined();
            expect(typeof book.title).toBe("string");
            expect(book.createdAt).toBeDefined();
            expect(book.updatedAt).toBeDefined();
        });
    });

    test("should return books as lean objects for performance", async () => {
        const books = await bookService.getBooks({});

        books.forEach((book) => {
            expect(typeof (book as any).save).toBe("undefined");
            expect(typeof (book as any).remove).toBe("undefined");
        });
    });

    test("should maintain consistency across multiple calls", async () => {
        const queryObject: BookQueryParamsType = {
            sortBy: "title",
            sortOrder: "asc",
        };

        const books1 = await bookService.getBooks(queryObject);
        const books2 = await bookService.getBooks(queryObject);

        expect(books1.length).toBe(books2.length);
        books1.forEach((book, index) => {
            expect(book.title).toBe(books2[index].title);
        });
    });

    test("should handle concurrent requests", async () => {
        const queryObject: BookQueryParamsType = {
            sortBy: "createdAt",
            sortOrder: "desc",
        };

        const [books1, books2, books3] = await Promise.all([
            bookService.getBooks(queryObject),
            bookService.getBooks(queryObject),
            bookService.getBooks(queryObject),
        ]);

        expect(books1.length).toBe(books2.length);
        expect(books2.length).toBe(books3.length);
        expect(books1[0].title).toBe(books2[0].title);
        expect(books2[0].title).toBe(books3[0].title);
    });

    test("should search across title and author fields", async () => {
        const queryObject: BookQueryParamsType = {
            search: "Lee",
        };
        const books = await bookService.getBooks(queryObject);

        expect(books.length).toBeGreaterThanOrEqual(1);
        books.forEach((book) => {
            const matchesTitle = book.title.toLowerCase().includes("lee");
            const matchesAuthor = book.author?.toLowerCase().includes("lee");
            expect(matchesTitle || matchesAuthor).toBe(true);
        });
    });

    test("should handle search with regex special characters safely", async () => {
        const queryObject: BookQueryParamsType = {
            search: ".*",
        };
        const books = await bookService.getBooks(queryObject);

        expect(Array.isArray(books)).toBe(true);
    });

    test("should handle combination of invalid ISBN search", async () => {
        const queryObject: BookQueryParamsType = {
            search: "invalid-isbn-123",
        };
        const books = await bookService.getBooks(queryObject);

        expect(Array.isArray(books)).toBe(true);
        expect(books).toHaveLength(0);
    });
});
