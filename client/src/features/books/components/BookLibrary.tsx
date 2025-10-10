// import dependencies
import { Link } from "react-router";
import { useState } from "react";

// import components
import BookGrid from "@/features/books/components/BookGrid";
import SearchBar from "@/components/common/SearchBar";

// import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SmartPagination from "@/components/common/SmartPagination";

// import types
import type { AllBookResponseDto } from "@/lib/api/api";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

/**
 * BookLibrary component
 * @returns The BookLibrary component
 */
const BookLibrary = ({
    books,
    isLoading,
    currentPage,
    totalPages,
    setCurrentPage,
    searchSubmit,
}: {
    books: AllBookResponseDto;
    isLoading: boolean;
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
    searchSubmit: (term: string) => void;
}) => {
    // state for search term
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <Card>
            <CardHeader className="pb-4">
                {/* Library Title - Centered above search */}
                <div className="flex justify-center mb-6">
                    <h1
                        className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900
                    dark:from-gray-50 dark:via-gray-200 dark:to-gray-50 bg-clip-text text-transparent"
                    >
                        The Library
                    </h1>
                </div>

                {/* Search Section - Centered */}
                <div className="flex justify-center mb-4">
                    <div className="w-full max-w-2xl">
                        <SearchBar
                            placeholder="Search by title, author, or ISBN..."
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            onClear={() => {
                                setSearchTerm("");
                                searchSubmit("");
                            }}
                            size="large"
                            onSubmit={(e) => {
                                e.preventDefault();
                                searchSubmit(searchTerm);
                            }}
                        />
                    </div>
                </div>

                {/* Add Book Button - Right Aligned */}
                <div className="flex justify-end mb-4">
                    <Link
                        to={ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS_NEW()}
                    >
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            Add Book
                        </Button>
                    </Link>
                </div>
            </CardHeader>

            <CardContent>
                {/* Loading State */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <Spinner className="size-6" />
                    </div>
                ) : (
                    <BookGrid books={books.books} />
                )}
            </CardContent>

            <div className="mt-5">
                {/* Pagination */}
                <SmartPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </Card>
    );
};

export default BookLibrary;
