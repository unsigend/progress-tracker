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
import { useEffect, useState } from "react";
import { Loader2, Plus, Search } from "lucide-react";

// API services
import BookAPI from "@/api/books";

// components
import BookShelf from "@/components/ui/bookShelf";
import ErrorMessage from "@/components/ui/errorMessage";
import SearchBar from "@/components/ui/searchBar";
import { Button } from "@/components/ui/button";

const BookLibrary = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await BookAPI.getBooks({});
                setBooks(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const bookList = books || [];

    // Handle search functionality
    const handleSearch = (value: string) => {
        setSearchQuery(value);
        // TODO: Implement search logic
    };

    const handleClearSearch = () => {
        setSearchQuery("");
        // TODO: Reset search results
    };

    const handleSearchSubmit = () => {
        // TODO: Implement search submission logic
        console.log("Search submitted:", searchQuery);
    };

    // Handle add book functionality
    const handleAddBook = () => {
        // TODO: Implement add book functionality
        console.log("Add book clicked");
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="border-b border-gray-200 pb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                    Book Library
                </h1>
                <p className="mt-2 text-gray-600">
                    Discover new books and add them to your library to track
                    your reading progress
                </p>
            </div>

            {/* Search and Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center ">
                <div className="flex gap-2 flex-1 max-w-lg items-center">
                    <SearchBar
                        placeholder="Search books by title, author, or ISBN..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        onClear={handleClearSearch}
                        variant="outline"
                        size="default"
                        containerClassName="flex-1"
                    />
                    <Button
                        onClick={handleSearchSubmit}
                        variant="outline"
                        size="lg"
                        className="gap-2 h-10"
                    >
                        <Search className="h-4 w-4" />
                        Search
                    </Button>
                </div>
                <Button
                    onClick={handleAddBook}
                    variant="default"
                    size="default"
                    className="gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Create Book
                </Button>
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
                    onRetry={() => window.location.reload()}
                    retryText="Reload Books"
                />
            ) : (
                <BookShelf books={bookList} />
            )}
        </div>
    );
};

export default BookLibrary;
