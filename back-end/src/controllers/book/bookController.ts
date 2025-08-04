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
    async getBooks(req: Request, res: Response) {},

    /**
     * Get a book by id
     * @route GET /api/books/:id
     * @access Public
     * @description Get a book by id
     */
    async getBookById(req: Request, res: Response) {},

    /**
     * Create a book
     * @route POST /api/books
     * @access Public
     * @description Create a book
     */
    async createBook(req: Request, res: Response) {},

    /**
     * Update a book
     * @route PUT /api/books/:id
     * @access Public
     * @description Update a book
     */
    async updateBook(req: Request, res: Response) {},

    /**
     * Delete a book
     * @route DELETE /api/books/:id
     * @access Public
     * @description Delete a book
     */
    async deleteBook(req: Request, res: Response) {},
};

export default bookController;
