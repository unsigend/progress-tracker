// import dependencies
import { Link, useTable, useParsed } from "@refinedev/core";
import { useState } from "react";

// import components
import BookGrid from "../components/BookGrid";
import SearchBar from "@/components/common/SearchBar";
import { ClipLoader } from "react-spinners";
import SmartPagination from "@/components/common/SmartPagination";

// import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// import types
import type { AllBookResponseDto } from "@/lib/api/api";

// import constants
import RESOURCES_CONSTANTS from "@/lib/constants/resources";
import ROUTES_CONSTANTS from "@/lib/constants/routes";

/**
 * BookListPage component
 * @returns The BookListPage component
 */
const BookListPage = () => {
    // get parsed URL parameters
    const parsed = useParsed();
    const currentPageFromUrl = parsed?.params?.currentPage;
    const pageSizeFromUrl = parsed?.params?.pageSize;
    const searchTermFromUrl = parsed?.params?.filters?.[0]?.value
        ? decodeURIComponent(parsed.params.filters[0].value)
        : undefined;

    // get the books
    const {
        setCurrentPage,
        currentPage,
        pageSize,
        setFilters,
        tableQuery,
        result,
    } = useTable({
        resource: RESOURCES_CONSTANTS.BOOKS,
        pagination: {
            pageSize: parseInt(String(pageSizeFromUrl), 10) || 21,
            currentPage: parseInt(currentPageFromUrl, 10) || 1,
        },
        filters: {
            initial: [
                {
                    field: "title",
                    operator: "contains",
                    value: searchTermFromUrl || "",
                },
            ],
        },
        syncWithLocation: true,
    });

    // get the total pages
    const totalPages = Math.ceil((result.total ?? 0) / pageSize);
    const [searchTerm, setSearchTerm] = useState(searchTermFromUrl || "");

    // clear search function
    const clearSearch = () => {
        setSearchTerm("");
        setFilters([], "replace");
    };

    return (
        <Card>
            <CardHeader className="pb-4">
                {/* Library Title - Centered above search */}
                <div className="flex justify-center mb-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-gray-50 dark:via-gray-200 dark:to-gray-50 bg-clip-text text-transparent">
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
                            onClear={clearSearch}
                            size="large"
                            onSubmit={(e) => {
                                e.preventDefault();
                                setCurrentPage(1);

                                if (searchTerm.trim()) {
                                    setFilters([
                                        {
                                            field: "title",
                                            operator: "contains",
                                            value: encodeURIComponent(
                                                searchTerm
                                            ),
                                        },
                                    ]);
                                } else {
                                    setFilters([], "replace");
                                }
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
                {tableQuery?.isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <ClipLoader size={40} color="hsl(var(--foreground))" />
                    </div>
                ) : (
                    <BookGrid
                        books={
                            (result.data as unknown as AllBookResponseDto)
                                .books || []
                        }
                    />
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

export default BookListPage;
