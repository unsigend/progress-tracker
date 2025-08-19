// import dependencies
import httpErrors from "http-errors";

// import types
import { BookType } from "@root/shared/types";

// import models
import BookModel from "@/models/book.model";

const bookService = {
    getBookByID: async (id: string) => {
        const book = await BookModel.findById(id);
        if (!book) {
            throw new httpErrors.NotFound("Book not found");
        }
        return book;
    },

    getBooks: async () => {
        const books = await BookModel.find();
        return books;
    },

    createBook: async (book: BookType) => {
        const newBook = await BookModel.create(book);
        return newBook;
    },

    updateBook: async (id: string, book: BookType) => {
        const updatedBook = await BookModel.findByIdAndUpdate(id, book, {
            new: true,
        });
        if (!updatedBook) {
            throw new httpErrors.NotFound("Book not found");
        }
        return updatedBook;
    },

    deleteBookByID: async (id: string) => {
        const deletedBook = await BookModel.findByIdAndDelete(id);
        if (!deletedBook) {
            throw new httpErrors.NotFound("Book does not exist");
        }
        return deletedBook;
    },
};

export default bookService;
