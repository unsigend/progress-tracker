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

describe("service/book/book.service.ts  -  createBook()", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI!);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await BookModel.deleteMany({});
    });

    test("should create a book with only required fields", async () => {
        const book: BookType = {
            title: "Test Book",
        };

        const newBook = await bookService.createBook(book);
        expect(newBook).toBeDefined();
        expect(newBook.title).toBe(book.title);
        expect(newBook.createdAt).toBeDefined();
        expect(newBook.updatedAt).toBeDefined();
        expect(newBook.author).toBeUndefined();
        expect(newBook.description).toBeUndefined();
        expect(newBook.pages).toBeUndefined();
        expect(newBook.image).toBeUndefined();
        expect(newBook.ISBN).toBeUndefined();
    });

    test("should create a book with all fields", async () => {
        const book: BookType = {
            title: "Operating Systems: Three Easy Pieces",
            author: "Remzi H. Arpaci-Dusseau",
            description:
                "OSTEP (oh step), or the 'the comet book', represents the culmination of years of teaching intro to operating systems to both undergraduates and graduates at the University of Wisconsin-Madison Computer Sciences department for nearly 25 years.The book is organized around three concepts fundamental to OS construction",
            pages: 747,
            image: "https://m.media-amazon.com/images/I/51-5yXrrWmL._AC_UF1000,1000_QL80_.jpg",
            ISBN: "978-1985086593",
        };

        const newBook = await bookService.createBook(book);
        expect(newBook).toBeDefined();
        expect(newBook.title).toBe(book.title);
        expect(newBook.author).toBe(book.author);
        expect(newBook.description).toBe(book.description);
        expect(newBook.pages).toBe(book.pages);
        expect(newBook.image).toBe(book.image);
        expect(newBook.ISBN).toBe(book.ISBN);
        expect(newBook.createdAt).toBeDefined();
        expect(newBook.updatedAt).toBeDefined();
    });

    test("should create a book with partial fields", async () => {
        const book: BookType = {
            title: "Clean Code",
            author: "Robert C. Martin",
            pages: 464,
        };

        const newBook = await bookService.createBook(book);
        expect(newBook.title).toBe(book.title);
        expect(newBook.author).toBe(book.author);
        expect(newBook.pages).toBe(book.pages);
        expect(newBook.description).toBeUndefined();
        expect(newBook.image).toBeUndefined();
        expect(newBook.ISBN).toBeUndefined();
    });

    test("should create a book with ISBN only", async () => {
        const book: BookType = {
            title: "The Pragmatic Programmer",
            ISBN: "978-0201616224",
        };

        const newBook = await bookService.createBook(book);
        expect(newBook.title).toBe(book.title);
        expect(newBook.ISBN).toBe(book.ISBN);
        expect(newBook.author).toBeUndefined();
        expect(newBook.pages).toBeUndefined();
    });

    test("should automatically set createdAt and updatedAt", async () => {
        const book: BookType = {
            title: "Test Book for Dates",
        };

        const newBook = await bookService.createBook(book);
        expect(newBook.createdAt).toBeDefined();
        expect(newBook.updatedAt).toBeDefined();
        expect(newBook.createdAt).toBeInstanceOf(Date);
        expect(newBook.updatedAt).toBeInstanceOf(Date);
    });

    test("should create multiple books independently", async () => {
        const book1: BookType = {
            title: "Book One",
            author: "Author One",
        };

        const book2: BookType = {
            title: "Book Two",
            author: "Author Two",
            pages: 200,
        };

        const newBook1 = await bookService.createBook(book1);
        const newBook2 = await bookService.createBook(book2);

        expect(newBook1.title).toBe("Book One");
        expect(newBook2.title).toBe("Book Two");
        expect(newBook1).not.toBe(newBook2);
        expect(newBook2.pages).toBe(200);
        expect(newBook1.pages).toBeUndefined();
    });

    test("should handle empty optional fields", async () => {
        const book: BookType = {
            title: "Minimal Book",
            author: "",
            description: "",
            image: "",
            ISBN: "",
        };

        const newBook = await bookService.createBook(book);
        expect(newBook.title).toBe("Minimal Book");
        expect(newBook.author).toBe("");
        expect(newBook.description).toBe("");
        expect(newBook.image).toBe("");
        expect(newBook.ISBN).toBe("");
    });

    test("should handle database operations correctly", async () => {
        const book: BookType = {
            title: "Database Test Book",
            author: "Test Author",
            pages: 300,
        };

        const newBook = await bookService.createBook(book);

        expect(newBook.title).toBe("Database Test Book");
        expect(newBook.author).toBe("Test Author");
        expect(newBook.pages).toBe(300);

        const savedBooks = await BookModel.find({
            title: "Database Test Book",
        });
        expect(savedBooks).toHaveLength(1);
        expect(savedBooks[0].author).toBe("Test Author");
    });

    test("should handle MongoDB document creation", async () => {
        const book: BookType = {
            title: "MongoDB Test",
            author: "Test Author",
        };

        const newBook = await bookService.createBook(book);

        expect(newBook.createdAt).toBeDefined();
        expect(newBook.updatedAt).toBeDefined();
        expect(newBook.createdAt).toBeInstanceOf(Date);
        expect(newBook.updatedAt).toBeInstanceOf(Date);
    });

    test("should preserve all field types correctly", async () => {
        const book: BookType = {
            title: "Type Test Book",
            author: "Author Name",
            description: "A test description",
            pages: 250,
            image: "https://example.com/image.jpg",
            ISBN: "978-0123456789",
        };

        const newBook = await bookService.createBook(book);

        expect(typeof newBook.title).toBe("string");
        expect(typeof newBook.author).toBe("string");
        expect(typeof newBook.description).toBe("string");
        expect(typeof newBook.pages).toBe("number");
        expect(typeof newBook.image).toBe("string");
        expect(typeof newBook.ISBN).toBe("string");
        expect(newBook.createdAt).toBeInstanceOf(Date);
        expect(newBook.updatedAt).toBeInstanceOf(Date);
    });

    test("should handle very long title", async () => {
        const longTitle = "A".repeat(1000);
        const book: BookType = {
            title: longTitle,
        };

        const newBook = await bookService.createBook(book);
        expect(newBook.title).toBe(longTitle);
        expect(newBook.title.length).toBe(1000);
    });

    test("should handle very long description", async () => {
        const longDescription = "Lorem ipsum ".repeat(500);
        const book: BookType = {
            title: "Book with Long Description",
            description: longDescription,
        };

        const newBook = await bookService.createBook(book);
        expect(newBook.description).toBe(longDescription);
    });

    test("should handle valid small page numbers", async () => {
        const book: BookType = {
            title: "Short Book",
            pages: 1,
        };

        const newBook = await bookService.createBook(book);
        expect(newBook.pages).toBe(1);
    });

    test("should handle valid medium page numbers", async () => {
        const book: BookType = {
            title: "Medium Book",
            pages: 500,
        };

        const newBook = await bookService.createBook(book);
        expect(newBook.pages).toBe(500);
    });

    test("should handle valid large page numbers", async () => {
        const book: BookType = {
            title: "Large Book",
            pages: 3000,
        };

        const newBook = await bookService.createBook(book);
        expect(newBook.pages).toBe(3000);
    });

    test("should handle special characters in title", async () => {
        const book: BookType = {
            title: "Book with Special Characters: !@#$%^&*()_+{}|:<>?[]\\;'\",./<>",
        };

        const newBook = await bookService.createBook(book);
        expect(newBook.title).toBe(book.title);
    });

    test("should handle unicode characters", async () => {
        const book: BookType = {
            title: "编程之美 - 프로그래밍의 아름다움 - プログラミングの美しさ",
            author: "作者名 - 저자명 - 著者名",
        };

        const newBook = await bookService.createBook(book);
        expect(newBook.title).toBe(book.title);
        expect(newBook.author).toBe(book.author);
    });

    test("should handle malformed URLs in image field", async () => {
        const book: BookType = {
            title: "Book with Bad URL",
            image: "not-a-valid-url",
        };

        const newBook = await bookService.createBook(book);
        expect(newBook.image).toBe("not-a-valid-url");
    });

    test("should handle whitespace-only fields", async () => {
        const book: BookType = {
            title: "Valid Title",
            author: "   ",
            description: "\t\n\r",
        };

        const newBook = await bookService.createBook(book);
        expect(newBook.title).toBe("Valid Title");
        expect(newBook.author).toBe("   ");
        expect(newBook.description).toBe("\t\n\r");
    });

    test("should handle invalid ISBN format", async () => {
        const book: BookType = {
            title: "Book with Invalid ISBN",
            ISBN: "invalid-isbn-123",
        };

        const newBook = await bookService.createBook(book);
        expect(newBook.ISBN).toBe("invalid-isbn-123");
    });

    test("should handle duplicate book creation", async () => {
        const book: BookType = {
            title: "Duplicate Book",
            author: "Same Author",
            ISBN: "978-0123456789",
        };

        const firstBook = await bookService.createBook(book);
        const secondBook = await bookService.createBook(book);

        expect(firstBook.title).toBe(secondBook.title);
        expect(firstBook).not.toBe(secondBook);
        expect(firstBook.createdAt).not.toBe(secondBook.createdAt);
    });

    test("should handle creating many books quickly", async () => {
        const books: BookType[] = [];
        for (let i = 0; i < 10; i++) {
            books.push({
                title: `Bulk Book ${i}`,
                author: `Author ${i}`,
                pages: i * 100,
            });
        }

        const createdBooks = await Promise.all(
            books.map((book) => bookService.createBook(book))
        );

        expect(createdBooks).toHaveLength(10);
        createdBooks.forEach((book, index) => {
            expect(book.title).toBe(`Bulk Book ${index}`);
            expect(book.pages).toBe(index * 100);
        });
    });

    test("should maintain data integrity with concurrent creates", async () => {
        const createBook1 = bookService.createBook({
            title: "Concurrent Book 1",
            author: "Author 1",
        });

        const createBook2 = bookService.createBook({
            title: "Concurrent Book 2",
            author: "Author 2",
        });

        const [book1, book2] = await Promise.all([createBook1, createBook2]);

        expect(book1.title).toBe("Concurrent Book 1");
        expect(book2.title).toBe("Concurrent Book 2");
        expect(book1.author).toBe("Author 1");
        expect(book2.author).toBe("Author 2");
    });
});
