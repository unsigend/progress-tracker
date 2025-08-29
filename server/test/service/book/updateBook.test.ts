import {
    describe,
    test,
    expect,
    beforeAll,
    afterAll,
    afterEach,
} from "@jest/globals";
import bookService from "@/service/book.service";
import { BookType } from "@root/shared/types";
import BookModel from "@/models/book.model";
import mongoose from "mongoose";
import httpErrors from "http-errors";

describe("service/book/book.service.ts  -  updateBook()", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI!);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await BookModel.deleteMany({});
    });

    test("should update a book with all fields", async () => {
        const originalBook = await BookModel.create({
            title: "Original Title",
            author: "Original Author",
            description: "Original description",
            pages: 100,
            image: "https://example.com/original.jpg",
            ISBN: "978-0123456789",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const bookId = originalBook._id.toString();

        const updateData: Partial<BookType> = {
            title: "Updated Title",
            author: "Updated Author",
            description: "Updated description with more details",
            pages: 500,
            image: "https://example.com/updated.jpg",
            ISBN: "978-9876543210",
        };

        const updatedBook = await bookService.updateBook(
            bookId,
            updateData as BookType
        );

        expect(updatedBook.title).toBe("Updated Title");
        expect(updatedBook.author).toBe("Updated Author");
        expect(updatedBook.description).toBe(
            "Updated description with more details"
        );
        expect(updatedBook.pages).toBe(500);
        expect(updatedBook.image).toBe("https://example.com/updated.jpg");
        expect(updatedBook.ISBN).toBe("978-9876543210");
        expect(updatedBook.updatedAt).toBeDefined();
        expect(updatedBook.createdAt).toEqual(originalBook.createdAt);
    });

    test("should update only specific fields", async () => {
        const originalBook = await BookModel.create({
            title: "Complete Book",
            author: "Full Author",
            description: "Complete description",
            pages: 300,
            image: "https://example.com/complete.jpg",
            ISBN: "978-1111111111",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const bookId = originalBook._id.toString();

        const updateData: Partial<BookType> = {
            title: "Partially Updated Title",
            pages: 450,
        };

        const updatedBook = await bookService.updateBook(
            bookId,
            updateData as BookType
        );

        expect(updatedBook.title).toBe("Partially Updated Title");
        expect(updatedBook.pages).toBe(450);
        expect(updatedBook.author).toBe("Full Author");
        expect(updatedBook.description).toBe("Complete description");
        expect(updatedBook.image).toBe("https://example.com/complete.jpg");
        expect(updatedBook.ISBN).toBe("978-1111111111");
    });

    test("should update only the title", async () => {
        const originalBook = await BookModel.create({
            title: "Old Title",
            author: "Author Name",
            pages: 200,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const bookId = originalBook._id.toString();

        const updateData: Partial<BookType> = {
            title: "Brand New Title",
        };

        const updatedBook = await bookService.updateBook(
            bookId,
            updateData as BookType
        );

        expect(updatedBook.title).toBe("Brand New Title");
        expect(updatedBook.author).toBe("Author Name");
        expect(updatedBook.pages).toBe(200);
    });

    test("should throw NotFound error when book does not exist", async () => {
        const nonExistentId = new mongoose.Types.ObjectId().toString();
        const updateData: Partial<BookType> = {
            title: "Updated Title",
        };

        await expect(
            bookService.updateBook(nonExistentId, updateData as BookType)
        ).rejects.toThrow(httpErrors.NotFound);
        await expect(
            bookService.updateBook(nonExistentId, updateData as BookType)
        ).rejects.toThrow("Book not found");
    });

    test("should handle updating with empty optional fields", async () => {
        const originalBook = await BookModel.create({
            title: "Book with Data",
            author: "Some Author",
            description: "Some description",
            image: "https://example.com/image.jpg",
            ISBN: "978-1234567890",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const bookId = originalBook._id.toString();

        const updateData: Partial<BookType> = {
            title: "Updated Book",
            author: "",
            description: "",
            image: "",
            ISBN: "",
        };

        const updatedBook = await bookService.updateBook(
            bookId,
            updateData as BookType
        );

        expect(updatedBook.title).toBe("Updated Book");
        expect(updatedBook.author).toBe("");
        expect(updatedBook.description).toBe("");
        expect(updatedBook.image).toBe("");
        expect(updatedBook.ISBN).toBe("");
    });

    test("should handle updating with very long content", async () => {
        const originalBook = await BookModel.create({
            title: "Short Title",
            description: "Short description",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const bookId = originalBook._id.toString();

        const longTitle = "Very Long Title ".repeat(100);
        const longDescription = "Very long description ".repeat(200);

        const updateData: Partial<BookType> = {
            title: longTitle,
            description: longDescription,
        };

        const updatedBook = await bookService.updateBook(
            bookId,
            updateData as BookType
        );

        expect(updatedBook.title).toBe(longTitle);
        expect(updatedBook.description).toBe(longDescription);
    });

    test("should handle special characters in updated fields", async () => {
        const originalBook = await BookModel.create({
            title: "Normal Title",
            author: "Normal Author",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const bookId = originalBook._id.toString();

        const updateData: Partial<BookType> = {
            title: "Special Characters: !@#$%^&*()_+{}|:<>?[]\\;'\",./<>",
            author: "Author with Special: äöü ñ ç",
        };

        const updatedBook = await bookService.updateBook(
            bookId,
            updateData as BookType
        );

        expect(updatedBook.title).toBe(
            "Special Characters: !@#$%^&*()_+{}|:<>?[]\\;'\",./<>"
        );
        expect(updatedBook.author).toBe("Author with Special: äöü ñ ç");
    });

    test("should handle unicode characters in updates", async () => {
        const originalBook = await BookModel.create({
            title: "English Title",
            author: "English Author",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const bookId = originalBook._id.toString();

        const updateData: Partial<BookType> = {
            title: "编程之美 - 프로그래밍의 아름다움 - プログラミングの美しさ",
            author: "作者名 - 저자명 - 著者名",
        };

        const updatedBook = await bookService.updateBook(
            bookId,
            updateData as BookType
        );

        expect(updatedBook.title).toBe(
            "编程之美 - 프로그래밍의 아름다움 - プログラミングの美しさ"
        );
        expect(updatedBook.author).toBe("作者名 - 저자명 - 著者名");
    });

    test("should update pages with various valid numbers", async () => {
        const testCases = [1, 100, 500, 1500, 3000];

        for (const pages of testCases) {
            const originalBook = await BookModel.create({
                title: `Book with ${pages} pages original`,
                pages: 50,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            const bookId = originalBook._id.toString();

            const updateData: Partial<BookType> = {
                title: `Book with ${pages} pages updated`,
                pages: pages,
            };

            const updatedBook = await bookService.updateBook(
                bookId,
                updateData as BookType
            );

            expect(updatedBook.pages).toBe(pages);
            expect(updatedBook.title).toBe(`Book with ${pages} pages updated`);

            await BookModel.findByIdAndDelete(bookId);
        }
    });

    test("should preserve data types correctly after update", async () => {
        const originalBook = await BookModel.create({
            title: "Original Book",
            author: "Original Author",
            description: "Original description",
            pages: 100,
            image: "https://example.com/original.jpg",
            ISBN: "978-0000000000",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const bookId = originalBook._id.toString();

        const updateData: Partial<BookType> = {
            title: "Updated Book",
            author: "Updated Author",
            description: "Updated description",
            pages: 250,
            image: "https://example.com/updated.jpg",
            ISBN: "978-1111111111",
        };

        const updatedBook = await bookService.updateBook(
            bookId,
            updateData as BookType
        );

        expect(typeof updatedBook.title).toBe("string");
        expect(typeof updatedBook.author).toBe("string");
        expect(typeof updatedBook.description).toBe("string");
        expect(typeof updatedBook.pages).toBe("number");
        expect(typeof updatedBook.image).toBe("string");
        expect(typeof updatedBook.ISBN).toBe("string");
        expect(updatedBook.createdAt).toBeInstanceOf(Date);
        expect(updatedBook.updatedAt).toBeInstanceOf(Date);
    });

    test("should preserve createdAt when updating", async () => {
        const originalBook = await BookModel.create({
            title: "Timestamp Test Book",
            createdAt: new Date("2023-01-01T00:00:00.000Z"),
            updatedAt: new Date("2023-01-01T00:00:00.000Z"),
        });
        const bookId = originalBook._id.toString();
        const originalCreatedAt = originalBook.createdAt;

        const updateData: Partial<BookType> = {
            title: "Updated Timestamp Test Book",
        };

        const updatedBook = await bookService.updateBook(
            bookId,
            updateData as BookType
        );

        expect(updatedBook.createdAt).toEqual(originalCreatedAt);
        expect(updatedBook.updatedAt).toBeDefined();
        expect(updatedBook.updatedAt).toBeInstanceOf(Date);
        expect(updatedBook.title).toBe("Updated Timestamp Test Book");
    });

    test("should handle database operations correctly", async () => {
        const originalBook = await BookModel.create({
            title: "Database Update Test",
            author: "DB Author",
            pages: 200,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const bookId = originalBook._id.toString();

        const beforeUpdate = await BookModel.findById(bookId);
        expect(beforeUpdate?.title).toBe("Database Update Test");

        const updateData: Partial<BookType> = {
            title: "Updated Database Test",
            author: "Updated DB Author",
            pages: 300,
        };

        const updatedBook = await bookService.updateBook(
            bookId,
            updateData as BookType
        );

        expect(updatedBook.title).toBe("Updated Database Test");
        expect(updatedBook.author).toBe("Updated DB Author");
        expect(updatedBook.pages).toBe(300);

        const afterUpdate = await BookModel.findById(bookId);
        expect(afterUpdate?.title).toBe("Updated Database Test");
        expect(afterUpdate?.author).toBe("Updated DB Author");
        expect(afterUpdate?.pages).toBe(300);
    });

    test("should handle whitespace-only fields in updates", async () => {
        const originalBook = await BookModel.create({
            title: "Original Whitespace Test",
            author: "Original Author",
            description: "Original description",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const bookId = originalBook._id.toString();

        const updateData: Partial<BookType> = {
            title: "Updated Whitespace Test",
            author: "   ",
            description: "\t\n\r",
        };

        const updatedBook = await bookService.updateBook(
            bookId,
            updateData as BookType
        );

        expect(updatedBook.title).toBe("Updated Whitespace Test");
        expect(updatedBook.author).toBe("   ");
        expect(updatedBook.description).toBe("\t\n\r");
    });

    test("should handle malformed URLs in image field updates", async () => {
        const originalBook = await BookModel.create({
            title: "URL Test Book",
            image: "https://example.com/good-url.jpg",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const bookId = originalBook._id.toString();

        const updateData: Partial<BookType> = {
            image: "not-a-valid-url-at-all",
        };

        const updatedBook = await bookService.updateBook(
            bookId,
            updateData as BookType
        );

        expect(updatedBook.image).toBe("not-a-valid-url-at-all");
    });

    test("should handle invalid ISBN format in updates", async () => {
        const originalBook = await BookModel.create({
            title: "ISBN Test Book",
            ISBN: "978-1234567890",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const bookId = originalBook._id.toString();

        const updateData: Partial<BookType> = {
            ISBN: "definitely-not-a-valid-isbn-123",
        };

        const updatedBook = await bookService.updateBook(
            bookId,
            updateData as BookType
        );

        expect(updatedBook.ISBN).toBe("definitely-not-a-valid-isbn-123");
    });

    test("should handle concurrent updates correctly", async () => {
        const book1 = await BookModel.create({
            title: "Concurrent Book 1",
            author: "Author 1",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const book2 = await BookModel.create({
            title: "Concurrent Book 2",
            author: "Author 2",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const book1Id = book1._id.toString();
        const book2Id = book2._id.toString();

        const update1Promise = bookService.updateBook(book1Id, {
            title: "Updated Concurrent Book 1",
            author: "Updated Author 1",
        } as BookType);

        const update2Promise = bookService.updateBook(book2Id, {
            title: "Updated Concurrent Book 2",
            author: "Updated Author 2",
        } as BookType);

        const [updatedBook1, updatedBook2] = await Promise.all([
            update1Promise,
            update2Promise,
        ]);

        expect(updatedBook1.title).toBe("Updated Concurrent Book 1");
        expect(updatedBook1.author).toBe("Updated Author 1");
        expect(updatedBook2.title).toBe("Updated Concurrent Book 2");
        expect(updatedBook2.author).toBe("Updated Author 2");

        const dbBook1 = await BookModel.findById(book1Id);
        const dbBook2 = await BookModel.findById(book2Id);

        expect(dbBook1?.title).toBe("Updated Concurrent Book 1");
        expect(dbBook2?.title).toBe("Updated Concurrent Book 2");
    });

    test("should handle updating multiple books sequentially", async () => {
        const books = [];
        for (let i = 0; i < 5; i++) {
            books.push(
                await BookModel.create({
                    title: `Sequential Book ${i}`,
                    author: `Author ${i}`,
                    pages: i * 100 + 100,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
            );
        }

        const updatedBooks = [];
        for (let i = 0; i < books.length; i++) {
            const bookId = books[i]._id.toString();
            const updateData: Partial<BookType> = {
                title: `Updated Sequential Book ${i}`,
                author: `Updated Author ${i}`,
                pages: i * 100 + 200,
            };

            const updatedBook = await bookService.updateBook(
                bookId,
                updateData as BookType
            );
            updatedBooks.push(updatedBook);
        }

        expect(updatedBooks).toHaveLength(5);
        updatedBooks.forEach((book, index) => {
            expect(book.title).toBe(`Updated Sequential Book ${index}`);
            expect(book.author).toBe(`Updated Author ${index}`);
            expect(book.pages).toBe(index * 100 + 200);
        });
    });

    test("should return the updated document with new option", async () => {
        const originalBook = await BookModel.create({
            title: "Original for New Option Test",
            author: "Original Author",
            pages: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const bookId = originalBook._id.toString();

        const updateData: Partial<BookType> = {
            title: "Updated for New Option Test",
            author: "Updated Author",
            pages: 300,
        };

        const updatedBook = await bookService.updateBook(
            bookId,
            updateData as BookType
        );

        expect(updatedBook.title).toBe("Updated for New Option Test");
        expect(updatedBook.author).toBe("Updated Author");
        expect(updatedBook.pages).toBe(300);

        expect(updatedBook.title).not.toBe(originalBook.title);
        expect(updatedBook.author).not.toBe(originalBook.author);
        expect(updatedBook.pages).not.toBe(originalBook.pages);
    });
});
