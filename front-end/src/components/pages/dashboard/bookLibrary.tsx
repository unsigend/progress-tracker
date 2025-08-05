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
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

// API services
import BookAPI from "@/api/books";

// components
import BookShelf from "@/components/ui/bookShelf";
import ErrorMessage from "@/components/ui/errorMessage";

const BookLibrary = () => {
    const {
        data: books,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["books"],
        queryFn: () => BookAPI.getBooks({}),
    });

    const bookList = books || [];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="border-b border-gray-200 pb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                    Book Library
                </h1>
                <p className="mt-2 text-gray-600">
                    Track your reading progress and discover new books
                </p>
            </div>

            {/* Book List */}
            {isLoading ? (
                <div className="flex justify-center items-center h-full">
                    <Loader2 className="w-6 h-6 animate-spin" />
                </div>
            ) : error ? (
                <ErrorMessage
                    title="Failed to Load Books"
                    message={`We couldn't retrieve your book library: ${error.message}`}
                    icon="alert"
                    variant="default"
                    size="full"
                    showRetry
                    onRetry={() => refetch()}
                    retryText="Reload Books"
                />
            ) : (
                <BookShelf books={bookList} />
            )}
        </div>
    );
};

export default BookLibrary;
