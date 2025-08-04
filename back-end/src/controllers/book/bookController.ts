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

import { Request, Response } from "express";
import { BookServiceOptionsInterface } from "@/services/book/bookService";
import BookService from "@/services/book/bookService";

const bookController = {
    /**
     * Get all books
     * @route GET /api/books
     * @access Public
     * @description Get all books
     */
    async getBooks(req: Request, res: Response) {
        const { _limit, _sort, _order, _searchBy, _query } = req.query;

        // validate options
        const BookServiceOptions: BookServiceOptionsInterface = {
            limit: _limit ? Number(_limit) : 10,
            sortBy: _sort ? String(_sort) : "createdAt",
            sortOrder: _order ? String(_order) : "desc",
        };

        // validate query
        const query: { [key: string]: string } = {};
        if (_searchBy && _query) {
            query[_searchBy as string] = _query as string;
        }

        try {
            const books = await BookService.getAllBooksByQuery(
                query,
                BookServiceOptions
            );
            res.status(200).json(books);
        } catch (error) {
            throw new Error("Failed to get books");
        }
    },

    /**
     * Get a book by id
     * @route GET /api/books/:id
     * @access Public
     * @description Get a book by id
     */
    async getBookById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const book = await BookService.getBookById(id);
            res.status(200).json(book);
        } catch (error) {
            throw new Error("Failed to get book by id");
        }
    },

    /**
     * Create a book
     * @route POST /api/books
     * @access Public
     * @description Create a book
     */
    async createBook(req: Request, res: Response) {
        try {
            const book = await BookService.createBook({
                ...req.body,
            });
            res.status(201).json(book);
        } catch (error) {
            throw new Error("Failed to create book");
        }
    },

    /**
     * Update a book
     * @route PUT /api/books/:id
     * @access Public
     * @description Update a book
     */
    async updateBook(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const book = await BookService.updateBook(id, req.body);
            res.status(200).json(book);
        } catch (error) {
            throw new Error("Failed to update book");
        }
    },

    /**
     * Delete a book
     * @route DELETE /api/books/:id
     * @access Public
     * @description Delete a book
     */
    async deleteBook(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await BookService.deleteBookById(id);
            res.status(200).json({ message: "Book deleted successfully" });
        } catch (error) {
            throw new Error("Failed to delete book");
        }
    },
};

export default bookController;
