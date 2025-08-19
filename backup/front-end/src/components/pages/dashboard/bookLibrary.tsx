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
import { useState } from "react";
import { Loader2, Plus, Search } from "lucide-react";

// components
import BookShelf from "@/components/ui/bookShelf";
import ErrorMessage from "@/components/ui/errorMessage";
import SearchBar from "@/components/ui/searchBar";
import { Button } from "@/components/ui/button";

// hooks
import useBooks from "@/hooks/useBooks";

const BookLibrary = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [_searchQuery, _setSearchQuery] = useState("");

    const [books, isLoading, error] = useBooks({
        search: _searchQuery,
    });

    const bookList = books || [];

    const handleSearchSubmit = () => {
        _setSearchQuery(searchQuery);
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
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClear={() => {
                            setSearchQuery("");
                            _setSearchQuery("");
                        }}
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
                    onClick={() => {}}
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
