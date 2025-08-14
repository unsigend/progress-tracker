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

// dependencies
import axios from "axios";

// API endpoints
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// types
import type { Book } from "@/types/Book";

const BookAPI = {
    getBooks: async (queryParams: Record<string, string>): Promise<Book[]> => {
        const response = await axios.get(`${BASE_URL}/api/books`, {
            params: queryParams,
        });
        return response.data;
    },

    getBookById: async (id: string): Promise<Book> => {
        const response = await axios.get(`${BASE_URL}/api/books/${id}`);
        return response.data;
    },

    createBook: async (book: Book): Promise<Book> => {
        const response = await axios.post(`${BASE_URL}/api/books`, book);
        return response.data;
    },

    updateBook: async (id: string, book: Book): Promise<Book> => {
        const response = await axios.put(`${BASE_URL}/api/books/${id}`, book);
        return response.data;
    },

    deleteBook: async (id: string): Promise<void> => {
        await axios.delete(`${BASE_URL}/api/books/${id}`);
    },
};

export default BookAPI;
