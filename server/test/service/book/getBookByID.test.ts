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

describe("service/book/book.service.ts  -  getBookByID()", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI!);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await BookModel.deleteMany({});
    });

    test("should get a book by valid ID with all fields", async () => {
        const bookData = {
            title: "Complete Test Book",
            author: "Test Author",
            description: "A comprehensive test book description",
            pages: 500,
            image: "https://example.com/test-book.jpg",
            ISBN: "978-1234567890",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const createdBook = await BookModel.create(bookData);
        const bookId = createdBook._id.toString();

        const retrievedBook = await bookService.getBookByID(bookId);

        expect(retrievedBook).toBeDefined();
        expect(retrievedBook.title).toBe("Complete Test Book");
        expect(retrievedBook.author).toBe("Test Author");
        expect(retrievedBook.description).toBe(
            "A comprehensive test book description"
        );
        expect(retrievedBook.pages).toBe(500);
        expect(retrievedBook.image).toBe("https://example.com/test-book.jpg");
        expect(retrievedBook.ISBN).toBe("978-1234567890");
        expect(retrievedBook.createdAt).toBeDefined();
        expect(retrievedBook.updatedAt).toBeDefined();
    });

    test("should get a book by valid ID with only required fields", async () => {
        const bookData = {
            title: "Minimal Test Book",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const createdBook = await BookModel.create(bookData);
        const bookId = createdBook._id.toString();

        const retrievedBook = await bookService.getBookByID(bookId);

        expect(retrievedBook).toBeDefined();
        expect(retrievedBook.title).toBe("Minimal Test Book");
        expect(retrievedBook.author).toBeUndefined();
        expect(retrievedBook.description).toBeUndefined();
        expect(retrievedBook.pages).toBeUndefined();
        expect(retrievedBook.image).toBeUndefined();
        expect(retrievedBook.ISBN).toBeUndefined();
        expect(retrievedBook.createdAt).toBeDefined();
        expect(retrievedBook.updatedAt).toBeDefined();
    });

    test("should throw NotFound error when book does not exist", async () => {
        const nonExistentId = new mongoose.Types.ObjectId().toString();

        await expect(bookService.getBookByID(nonExistentId)).rejects.toThrow(
            httpErrors.NotFound
        );
        await expect(bookService.getBookByID(nonExistentId)).rejects.toThrow(
            "Book not found"
        );
    });

    test("should handle books with special characters in fields", async () => {
        const bookData = {
            title: "Special Characters: !@#$%^&*()_+{}|:<>?[]\\;'\",./<>",
            author: "Author with Special: äöü ñ ç",
            description:
                "Description with symbols: ~`!@#$%^&*()_+-={}[]|\\:;\"'<>?,./",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const createdBook = await BookModel.create(bookData);
        const bookId = createdBook._id.toString();

        const retrievedBook = await bookService.getBookByID(bookId);

        expect(retrievedBook.title).toBe(
            "Special Characters: !@#$%^&*()_+{}|:<>?[]\\;'\",./<>"
        );
        expect(retrievedBook.author).toBe("Author with Special: äöü ñ ç");
        expect(retrievedBook.description).toBe(
            "Description with symbols: ~`!@#$%^&*()_+-={}[]|\\:;\"'<>?,./"
        );
    });

    test("should handle books with unicode characters", async () => {
        const bookData = {
            title: "编程之美 - 프로그래밍의 아름다움 - プログラミングの美しさ",
            author: "作者名 - 저자명 - 著者名",
            description: "多语言描述 - 다국어 설명 - 多言語の説明",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const createdBook = await BookModel.create(bookData);
        const bookId = createdBook._id.toString();

        const retrievedBook = await bookService.getBookByID(bookId);

        expect(retrievedBook.title).toBe(
            "编程之美 - 프로그래밍의 아름다움 - プログラミングの美しさ"
        );
        expect(retrievedBook.author).toBe("作者名 - 저자명 - 著者名");
        expect(retrievedBook.description).toBe(
            "多语言描述 - 다국어 설명 - 多言語の説明"
        );
    });

    test("should handle books with very long content", async () => {
        const longTitle = "Very Long Title ".repeat(100);
        const longDescription = "Very long description ".repeat(200);
        const longAuthor = "Very Long Author Name ".repeat(50);

        const bookData = {
            title: longTitle,
            author: longAuthor,
            description: longDescription,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const createdBook = await BookModel.create(bookData);
        const bookId = createdBook._id.toString();

        const retrievedBook = await bookService.getBookByID(bookId);

        expect(retrievedBook.title).toBe(longTitle);
        expect(retrievedBook.author).toBe(longAuthor);
        expect(retrievedBook.description).toBe(longDescription);
        expect(retrievedBook.title.length).toBe(longTitle.length);
        expect(retrievedBook.description!.length).toBe(longDescription.length);
    });

    test("should handle books with various valid page numbers", async () => {
        const testCases = [1, 100, 500, 1500, 3000];

        for (const pages of testCases) {
            const bookData = {
                title: `Book with ${pages} pages`,
                pages: pages,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const createdBook = await BookModel.create(bookData);
            const bookId = createdBook._id.toString();

            const retrievedBook = await bookService.getBookByID(bookId);

            expect(retrievedBook.pages).toBe(pages);
            expect(retrievedBook.title).toBe(`Book with ${pages} pages`);

            await BookModel.findByIdAndDelete(bookId);
        }
    });

    test("should preserve all field types correctly", async () => {
        const bookData = {
            title: "Type Test Book",
            author: "Author Name",
            description: "A test description",
            pages: 250,
            image: "https://example.com/image.jpg",
            ISBN: "978-0123456789",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const createdBook = await BookModel.create(bookData);
        const bookId = createdBook._id.toString();

        const retrievedBook = await bookService.getBookByID(bookId);

        expect(typeof retrievedBook.title).toBe("string");
        expect(typeof retrievedBook.author).toBe("string");
        expect(typeof retrievedBook.description).toBe("string");
        expect(typeof retrievedBook.pages).toBe("number");
        expect(typeof retrievedBook.image).toBe("string");
        expect(typeof retrievedBook.ISBN).toBe("string");
        expect(retrievedBook.createdAt).toBeInstanceOf(Date);
        expect(retrievedBook.updatedAt).toBeInstanceOf(Date);
    });

    test("should handle books with empty optional fields", async () => {
        const bookData = {
            title: "Empty Fields Book",
            author: "",
            description: "",
            image: "",
            ISBN: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const createdBook = await BookModel.create(bookData);
        const bookId = createdBook._id.toString();

        const retrievedBook = await bookService.getBookByID(bookId);

        expect(retrievedBook.title).toBe("Empty Fields Book");
        expect(retrievedBook.author).toBe("");
        expect(retrievedBook.description).toBe("");
        expect(retrievedBook.image).toBe("");
        expect(retrievedBook.ISBN).toBe("");
    });

    test("should handle books with whitespace-only fields", async () => {
        const bookData = {
            title: "Whitespace Test Book",
            author: "   ",
            description: "\t\n\r",
            image: "  \n  ",
            ISBN: "\t\t",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const createdBook = await BookModel.create(bookData);
        const bookId = createdBook._id.toString();

        const retrievedBook = await bookService.getBookByID(bookId);

        expect(retrievedBook.title).toBe("Whitespace Test Book");
        expect(retrievedBook.author).toBe("   ");
        expect(retrievedBook.description).toBe("\t\n\r");
        expect(retrievedBook.image).toBe("  \n  ");
        expect(retrievedBook.ISBN).toBe("\t\t");
    });

    test("should handle books with malformed URLs in image field", async () => {
        const bookData = {
            title: "Malformed URL Test",
            image: "not-a-valid-url-at-all",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const createdBook = await BookModel.create(bookData);
        const bookId = createdBook._id.toString();

        const retrievedBook = await bookService.getBookByID(bookId);

        expect(retrievedBook.image).toBe("not-a-valid-url-at-all");
        expect(retrievedBook.title).toBe("Malformed URL Test");
    });

    test("should handle books with invalid ISBN format", async () => {
        const bookData = {
            title: "Invalid ISBN Test",
            ISBN: "definitely-not-a-valid-isbn-123",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const createdBook = await BookModel.create(bookData);
        const bookId = createdBook._id.toString();

        const retrievedBook = await bookService.getBookByID(bookId);

        expect(retrievedBook.ISBN).toBe("definitely-not-a-valid-isbn-123");
        expect(retrievedBook.title).toBe("Invalid ISBN Test");
    });

    test("should handle valid ObjectId formats", async () => {
        const bookData = {
            title: "ObjectId Test Book",
            author: "Test Author",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const createdBook = await BookModel.create(bookData);
        const bookId = createdBook._id.toString();

        expect(mongoose.Types.ObjectId.isValid(bookId)).toBe(true);

        const retrievedBook = await bookService.getBookByID(bookId);

        expect(retrievedBook.title).toBe("ObjectId Test Book");
        expect(retrievedBook.author).toBe("Test Author");
    });

    test("should handle database operations correctly", async () => {
        const bookData = {
            title: "Database Get Test",
            author: "DB Author",
            pages: 300,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const createdBook = await BookModel.create(bookData);
        const bookId = createdBook._id.toString();

        const beforeGet = await BookModel.findById(bookId);
        expect(beforeGet?.title).toBe("Database Get Test");

        const retrievedBook = await bookService.getBookByID(bookId);

        expect(retrievedBook.title).toBe("Database Get Test");
        expect(retrievedBook.author).toBe("DB Author");
        expect(retrievedBook.pages).toBe(300);

        const afterGet = await BookModel.findById(bookId);
        expect(afterGet?.title).toBe("Database Get Test");
    });

    test("should return consistent data with database document", async () => {
        const bookData = {
            title: "Consistency Test Book",
            author: "Consistency Author",
            description: "Testing data consistency",
            pages: 400,
            image: "https://example.com/consistency.jpg",
            ISBN: "978-9876543210",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const createdBook = await BookModel.create(bookData);
        const bookId = createdBook._id.toString();

        const retrievedBook = await bookService.getBookByID(bookId);
        const directDbBook = await BookModel.findById(bookId);

        expect(retrievedBook.title).toBe(directDbBook?.title);
        expect(retrievedBook.author).toBe(directDbBook?.author);
        expect(retrievedBook.description).toBe(directDbBook?.description);
        expect(retrievedBook.pages).toBe(directDbBook?.pages);
        expect(retrievedBook.image).toBe(directDbBook?.image);
        expect(retrievedBook.ISBN).toBe(directDbBook?.ISBN);
        expect(retrievedBook.createdAt?.getTime()).toBe(
            directDbBook?.createdAt?.getTime()
        );
        expect(retrievedBook.updatedAt?.getTime()).toBe(
            directDbBook?.updatedAt?.getTime()
        );
    });

    test("should handle retrieving multiple books by different IDs", async () => {
        const books = [];
        for (let i = 0; i < 5; i++) {
            books.push(
                await BookModel.create({
                    title: `Multiple Get Book ${i}`,
                    author: `Author ${i}`,
                    pages: i * 100 + 100,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
            );
        }

        const retrievedBooks = [];
        for (let i = 0; i < books.length; i++) {
            const bookId = books[i]._id.toString();
            const retrievedBook = await bookService.getBookByID(bookId);
            retrievedBooks.push(retrievedBook);
        }

        expect(retrievedBooks).toHaveLength(5);
        retrievedBooks.forEach((book, index) => {
            expect(book.title).toBe(`Multiple Get Book ${index}`);
            expect(book.author).toBe(`Author ${index}`);
            expect(book.pages).toBe(index * 100 + 100);
        });
    });

    test("should handle concurrent retrieval of different books", async () => {
        const book1 = await BookModel.create({
            title: "Concurrent Get Book 1",
            author: "Author 1",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const book2 = await BookModel.create({
            title: "Concurrent Get Book 2",
            author: "Author 2",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const book1Id = book1._id.toString();
        const book2Id = book2._id.toString();

        const [retrievedBook1, retrievedBook2] = await Promise.all([
            bookService.getBookByID(book1Id),
            bookService.getBookByID(book2Id),
        ]);

        expect(retrievedBook1.title).toBe("Concurrent Get Book 1");
        expect(retrievedBook1.author).toBe("Author 1");
        expect(retrievedBook2.title).toBe("Concurrent Get Book 2");
        expect(retrievedBook2.author).toBe("Author 2");

        expect(retrievedBook1).not.toEqual(retrievedBook2);
    });

    test("should handle retrieving the same book multiple times", async () => {
        const bookData = {
            title: "Same Book Multiple Gets",
            author: "Same Author",
            pages: 200,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const createdBook = await BookModel.create(bookData);
        const bookId = createdBook._id.toString();

        const [get1, get2, get3] = await Promise.all([
            bookService.getBookByID(bookId),
            bookService.getBookByID(bookId),
            bookService.getBookByID(bookId),
        ]);

        expect(get1.title).toBe("Same Book Multiple Gets");
        expect(get2.title).toBe("Same Book Multiple Gets");
        expect(get3.title).toBe("Same Book Multiple Gets");

        expect(get1.author).toBe(get2.author);
        expect(get2.author).toBe(get3.author);
        expect(get1.pages).toBe(get2.pages);
        expect(get2.pages).toBe(get3.pages);
    });

    test("should maintain data integrity after retrieval", async () => {
        const bookData = {
            title: "Integrity Test Book",
            author: "Integrity Author",
            description: "Testing data integrity",
            pages: 350,
            image: "https://example.com/integrity.jpg",
            ISBN: "978-1111111111",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const createdBook = await BookModel.create(bookData);
        const bookId = createdBook._id.toString();

        const retrievedBook = await bookService.getBookByID(bookId);

        const afterRetrievalDb = await BookModel.findById(bookId);

        expect(afterRetrievalDb?.title).toBe("Integrity Test Book");
        expect(afterRetrievalDb?.author).toBe("Integrity Author");
        expect(afterRetrievalDb?.description).toBe("Testing data integrity");
        expect(afterRetrievalDb?.pages).toBe(350);
        expect(afterRetrievalDb?.image).toBe(
            "https://example.com/integrity.jpg"
        );
        expect(afterRetrievalDb?.ISBN).toBe("978-1111111111");

        expect(retrievedBook.title).toBe(afterRetrievalDb?.title);
        expect(retrievedBook.author).toBe(afterRetrievalDb?.author);
    });

    test("should handle books created and retrieved immediately", async () => {
        const bookData = {
            title: "Immediate Retrieval Test",
            author: "Immediate Author",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const createdBook = await BookModel.create(bookData);
        const bookId = createdBook._id.toString();

        const retrievedBook = await bookService.getBookByID(bookId);

        expect(retrievedBook.title).toBe("Immediate Retrieval Test");
        expect(retrievedBook.author).toBe("Immediate Author");
        expect(retrievedBook.createdAt).toBeDefined();
        expect(retrievedBook.updatedAt).toBeDefined();
    });
});
