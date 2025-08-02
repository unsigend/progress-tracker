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
import BookModel from "@/models/bookModel";

const BookService = {
    async getBooks() {
        try {
            const books = await BookModel.find();
            return books;
        } catch (error: any) {
            throw new Error(error.message);
        }
    },
    async getBookById(id: string) {
        try {
            const book = await BookModel.findById(id);
            return book;
        } catch (error: any) {
            throw new Error(error.message);
        }
    },
    async createBook(book: BookType) {
        const newBook = new BookModel(book);
        try {
            await newBook.save();
            return newBook;
        } catch (error: any) {
            throw new Error(error.message);
        }
    },
    async updateBook(id: string, book: BookType) {
        try {
            const updatedBook = await BookModel.findByIdAndUpdate(id, book, {
                new: true,
            });
            return updatedBook;
        } catch (error: any) {
            throw new Error(error.message);
        }
    },
    async deleteBook(id: string) {
        try {
            await BookModel.findByIdAndDelete(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    },
};

export default BookService;
