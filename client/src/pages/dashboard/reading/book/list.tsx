// import dependencies
import { Link, useTable, useParsed } from "@refinedev/core";

// import components
import BookShelf from "@/components/modules/books/List";
import SearchBar from "@/components/modules/ui/searchBar";
import { ClipLoader } from "react-spinners";
import SmartPagination from "@/components/modules/ui/smartPagination";

// import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// import types
import type { BookResponseDto } from "@/api/api";

// import constants
import RESOURCES_CONSTANTS from "@/constants/resources";
import ROUTES_CONSTANTS from "@/constants/routes";

/**
 * DashboardLibraryPage component
 * @returns The DashboardLibraryPage component
 */
const DashboardLibraryPage = () => {
    // get parsed URL parameters
    const parsed = useParsed();
    const currentPageFromUrl = parsed?.params?.currentPage;
    const pageSizeFromUrl = parsed?.params?.pageSize;

    // get the books
    const { setCurrentPage, currentPage, pageSize, tableQuery, result } =
        useTable({
            resource: RESOURCES_CONSTANTS.BOOKS,
            pagination: {
                pageSize: parseInt(String(pageSizeFromUrl), 10) || 10,
                currentPage: parseInt(currentPageFromUrl, 10) || 1,
            },
            syncWithLocation: true,
        });

    // get the total pages
    const totalPages = Math.ceil((tableQuery?.data?.total ?? 0) / pageSize);

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col gap-6">
                    {/* Header Title */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-foreground">
                            The Library
                        </h1>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                        {/* Search Section */}
                        <SearchBar
                            placeholder="Search by title, author, or ISBN..."
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                            searchTerm={""}
                            setSearchTerm={() => {}}
                        />

                        {/* Add Book Button */}
                        <div className="flex gap-2">
                            <Link
                                to={ROUTES_CONSTANTS.DASHBOARD()
                                    .READING()
                                    .BOOKS_NEW()}
                            >
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs"
                                >
                                    Add Book
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                {/* Loading State */}
                {tableQuery?.isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <ClipLoader size={40} />
                    </div>
                ) : (
                    <BookShelf books={result.data as BookResponseDto[]} />
                )}
            </CardContent>

            {/* Pagination */}
            <SmartPagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </Card>
    );
};

export default DashboardLibraryPage;
