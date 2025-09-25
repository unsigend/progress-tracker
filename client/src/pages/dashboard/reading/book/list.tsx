// import dependencies
import { Link, useList } from "@refinedev/core";

// import components
import BookShelf from "@/components/modules/books/List";
import SearchBar from "@/components/modules/ui/searchBar";
import { ClipLoader } from "react-spinners";

// import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext,
} from "@/components/ui/pagination";

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
    // get the books
    const { query, result } = useList({
        resource: RESOURCES_CONSTANTS.BOOKS,
    });

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
                {query?.isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <ClipLoader size={40} />
                    </div>
                ) : (
                    <BookShelf books={result.data as BookResponseDto[]} />
                )}
            </CardContent>

            {/* Pagination */}
            <Pagination>
                <PaginationContent>
                    {/* Previous Page */}
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={() => {}} />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>

                    {/* Next Page */}
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => {}} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </Card>
    );
};

export default DashboardLibraryPage;
