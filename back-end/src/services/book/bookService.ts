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

import { Book as BookType } from "@/types/book";
import BookModel from "@/models/book/bookModel";

// internal API options
// sortBy: sort by field
// sortOrder: sort order
// limit: limit the number of books
interface BookServiceOptions {
    sortBy?: "createdAt" | "updatedAt" | "pages";
    sortOrder?: "asc" | "desc";
    limit?: number;
}

/**
 * Internal API implementation
 * @param query - query object with key-value pairs
 * @param options - options object
 * @returns - array of books which match the query
 */
async function _getAllBooks(
    query: {
        [key: string]: string;
    },
    options: BookServiceOptions
) {
    const { sortBy = "createdAt", sortOrder = "desc", limit = 10 } = options;

    const books = await BookModel.find(query)
        .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
        .limit(limit);
    return books;
}

const BookService = {
    // Create operations

    /**
     * Create a new book
     * @param book - book object
     * @returns - created book object or null if creation failed
     */
    createBook: async (book: BookType) => {
        const newBook = await BookModel.create(book);
        return newBook;
    },

    // Get operations

    /**
     * Get all books
     * @param options - options object
     * @returns - array of books or empty array if no books found
     */
    getAllBooks: async (options: BookServiceOptions) => {
        return _getAllBooks({}, options);
    },

    /**
     * Get all books by query
     * @param query - query object with key-value pairs
     * @param options - options object
     * @returns - array of books or empty array if no books found
     */
    getAllBooksByQuery: async (
        query: { [key: string]: string },
        options: BookServiceOptions
    ) => {
        return _getAllBooks(query, options);
    },

    /**
     * Get a book by id
     * @param id - book id
     * @returns - book object or null if not found
     */
    getBookById: async (id: string) => {
        const book = await BookModel.findById(id);
        return book;
    },

    // Update operations

    /**
     * Update a book
     * @param id - book id
     * @param book - book object
     * @returns - updated book object or null if not found
     */
    updateBook: async (id: string, book: BookType) => {
        const updatedBook = await BookModel.findByIdAndUpdate(id, book, {
            new: true,
        });
        return updatedBook;
    },

    // Delete operations

    /**
     * Delete a book by id
     * @param id - book id
     * @returns - deleted book object or null if not found
     */
    deleteBookById: async (id: string) => {
        const deletedBook = await BookModel.findByIdAndDelete(id);
        return deletedBook;
    },

    /**
     * Delete a book by query
     * @param query - query object with key-value pairs
     * @returns - number of deleted books
     */
    deleteBookByQuery: async (query: { [key: string]: string }) => {
        try {
            const deletedBooks = await BookModel.deleteMany(query);
            return deletedBooks.deletedCount;
        } catch (error) {
            throw error;
        }
    },
};

export default BookService;
export type { BookServiceOptions as BookServiceOptionsInterface };
