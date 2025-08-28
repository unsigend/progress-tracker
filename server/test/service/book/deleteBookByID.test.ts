import {
    describe,
    test,
    expect,
    beforeAll,
    afterAll,
    afterEach,
} from "@jest/globals";
import bookService from "@/service/book.service";
import BookModel from "@/models/book.model";
import mongoose from "mongoose";
import httpErrors from "http-errors";

describe("service/book/book.service.ts  -  deleteBookByID()", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI!);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await BookModel.deleteMany({});
    });

    test("should delete an existing book successfully", async () => {
        const book = {
            title: "Book to Delete",
            author: "Test Author",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const createdBook = await BookModel.create(book);
        const bookId = createdBook._id.toString();

        const deletedBook = await bookService.deleteBookByID(bookId);

        expect(deletedBook.title).toBe("Book to Delete");
        expect(deletedBook.author).toBe("Test Author");

        const foundBooks = await BookModel.find({ title: "Book to Delete" });
        expect(foundBooks).toHaveLength(0);
    });

    test("should delete book with all fields", async () => {
        const book = {
            title: "Complete Book to Delete",
            author: "Full Author",
            description: "A complete book description",
            pages: 300,
            image: "https://example.com/book.jpg",
            ISBN: "978-0123456789",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const createdBook = await BookModel.create(book);
        const bookId = createdBook._id.toString();

        const deletedBook = await bookService.deleteBookByID(bookId);

        expect(deletedBook.title).toBe("Complete Book to Delete");
        expect(deletedBook.author).toBe("Full Author");
        expect(deletedBook.description).toBe("A complete book description");
        expect(deletedBook.pages).toBe(300);
        expect(deletedBook.image).toBe("https://example.com/book.jpg");
        expect(deletedBook.ISBN).toBe("978-0123456789");
    });

    test("should delete book with only required fields", async () => {
        const book = {
            title: "Minimal Book to Delete",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const createdBook = await BookModel.create(book);
        const bookId = createdBook._id.toString();

        const deletedBook = await bookService.deleteBookByID(bookId);

        expect(deletedBook.title).toBe("Minimal Book to Delete");
        expect(deletedBook.author).toBeUndefined();
        expect(deletedBook.description).toBeUndefined();
        expect(deletedBook.pages).toBeUndefined();
        expect(deletedBook.image).toBeUndefined();
        expect(deletedBook.ISBN).toBeUndefined();
    });

    test("should throw NotFound error when book does not exist", async () => {
        const nonExistentId = new mongoose.Types.ObjectId().toString();

        await expect(bookService.deleteBookByID(nonExistentId)).rejects.toThrow(
            httpErrors.NotFound
        );
        await expect(bookService.deleteBookByID(nonExistentId)).rejects.toThrow(
            "Book does not exist"
        );
    });

    test("should handle valid ObjectId formats", async () => {
        const book = {
            title: "ObjectId Test Book",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const createdBook = await BookModel.create(book);
        const bookId = createdBook._id.toString();

        expect(mongoose.Types.ObjectId.isValid(bookId)).toBe(true);

        const deletedBook = await bookService.deleteBookByID(bookId);
        expect(deletedBook.title).toBe("ObjectId Test Book");
    });

    test("should handle database operations correctly", async () => {
        const book = {
            title: "Database Delete Test",
            author: "DB Author",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const createdBook = await BookModel.create(book);
        const bookId = createdBook._id.toString();

        const beforeDelete = await BookModel.findById(bookId);
        expect(beforeDelete?.title).toBe("Database Delete Test");

        const deletedBook = await bookService.deleteBookByID(bookId);
        expect(deletedBook.title).toBe("Database Delete Test");

        const afterDelete = await BookModel.findById(bookId);
        expect(afterDelete).toBeNull();
    });

    test("should return the deleted book document", async () => {
        const book = {
            title: "Return Test Book",
            author: "Return Author",
            pages: 250,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const createdBook = await BookModel.create(book);
        const bookId = createdBook._id.toString();

        const deletedBook = await bookService.deleteBookByID(bookId);

        expect(deletedBook.title).toBe("Return Test Book");
        expect(deletedBook.author).toBe("Return Author");
        expect(deletedBook.pages).toBe(250);
        expect(deletedBook.createdAt).toBeDefined();
        expect(deletedBook.updatedAt).toBeDefined();
    });

    test("should preserve all field types in returned document", async () => {
        const book = {
            title: "Type Test Book",
            author: "Author Name",
            description: "A test description",
            pages: 500,
            image: "https://example.com/image.jpg",
            ISBN: "978-0123456789",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const createdBook = await BookModel.create(book);
        const bookId = createdBook._id.toString();

        const deletedBook = await bookService.deleteBookByID(bookId);

        expect(typeof deletedBook.title).toBe("string");
        expect(typeof deletedBook.author).toBe("string");
        expect(typeof deletedBook.description).toBe("string");
        expect(typeof deletedBook.pages).toBe("number");
        expect(typeof deletedBook.image).toBe("string");
        expect(typeof deletedBook.ISBN).toBe("string");
        expect(deletedBook.createdAt).toBeInstanceOf(Date);
        expect(deletedBook.updatedAt).toBeInstanceOf(Date);
    });

    test("should handle books with special characters in title", async () => {
        const book = {
            title: "Special Book: !@#$%^&*()_+{}|:<>?[]\\;'\",./<>",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const createdBook = await BookModel.create(book);
        const bookId = createdBook._id.toString();

        const deletedBook = await bookService.deleteBookByID(bookId);
        expect(deletedBook.title).toBe(
            "Special Book: !@#$%^&*()_+{}|:<>?[]\\;'\",./<>"
        );
    });

    test("should handle books with unicode characters", async () => {
        const book = {
            title: "编程之美 - 프로그래밍의 아름다움 - プログラミングの美しさ",
            author: "作者名 - 저자명 - 著者名",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const createdBook = await BookModel.create(book);
        const bookId = createdBook._id.toString();

        const deletedBook = await bookService.deleteBookByID(bookId);
        expect(deletedBook.title).toBe(
            "编程之美 - 프로그래밍의 아름다움 - プログラミングの美しさ"
        );
        expect(deletedBook.author).toBe("作者名 - 저자명 - 著者名");
    });

    test("should handle books with very long content", async () => {
        const longTitle = "Long Title ".repeat(100);
        const longDescription = "Long description ".repeat(200);

        const book = {
            title: longTitle,
            description: longDescription,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const createdBook = await BookModel.create(book);
        const bookId = createdBook._id.toString();

        const deletedBook = await bookService.deleteBookByID(bookId);
        expect(deletedBook.title).toBe(longTitle);
        expect(deletedBook.description).toBe(longDescription);
    });

    test("should handle books with valid page ranges", async () => {
        const testCases = [1, 100, 500, 1500, 3000];

        for (const pages of testCases) {
            const book = {
                title: `Book with ${pages} pages`,
                pages: pages,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const createdBook = await BookModel.create(book);
            const bookId = createdBook._id.toString();

            const deletedBook = await bookService.deleteBookByID(bookId);
            expect(deletedBook.pages).toBe(pages);
            expect(deletedBook.title).toBe(`Book with ${pages} pages`);
        }
    });

    test("should handle books with empty optional fields", async () => {
        const book = {
            title: "Empty Fields Book",
            author: "",
            description: "",
            image: "",
            ISBN: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const createdBook = await BookModel.create(book);
        const bookId = createdBook._id.toString();

        const deletedBook = await bookService.deleteBookByID(bookId);
        expect(deletedBook.title).toBe("Empty Fields Book");
        expect(deletedBook.author).toBe("");
        expect(deletedBook.description).toBe("");
        expect(deletedBook.image).toBe("");
        expect(deletedBook.ISBN).toBe("");
    });

    test("should handle deleting multiple books quickly", async () => {
        const books = [];
        for (let i = 0; i < 5; i++) {
            books.push({
                title: `Bulk Delete Book ${i}`,
                author: `Author ${i}`,
                pages: i * 100 + 100,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        const createdBooks = await BookModel.insertMany(books);

        const deletedBooks = await Promise.all(
            createdBooks.map((book) =>
                bookService.deleteBookByID(book._id.toString())
            )
        );

        expect(deletedBooks).toHaveLength(5);
        deletedBooks.forEach((book, index) => {
            expect(book.title).toBe(`Bulk Delete Book ${index}`);
            expect(book.pages).toBe(index * 100 + 100);
        });

        // Verify all books are deleted from database
        const remainingBooks = await BookModel.find({});
        expect(remainingBooks).toHaveLength(0);
    });

    test("should maintain data integrity with concurrent deletes", async () => {
        const books = await BookModel.insertMany([
            {
                title: "Concurrent Delete Book 1",
                author: "Author 1",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Concurrent Delete Book 2",
                author: "Author 2",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        const book1Id = books[0]._id.toString();
        const book2Id = books[1]._id.toString();

        const [deleted1, deleted2] = await Promise.all([
            bookService.deleteBookByID(book1Id),
            bookService.deleteBookByID(book2Id),
        ]);

        expect(deleted1.title).toBe("Concurrent Delete Book 1");
        expect(deleted2.title).toBe("Concurrent Delete Book 2");
        expect(deleted1.author).toBe("Author 1");
        expect(deleted2.author).toBe("Author 2");

        const remainingBooks = await BookModel.find({});
        expect(remainingBooks).toHaveLength(0);
    });
});
