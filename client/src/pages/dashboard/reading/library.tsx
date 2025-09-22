// import dependencies
import { Link, useList } from "@refinedev/core";

// import components
import BookShelf from "@/components/modules/books/bookShelf";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ClipLoader } from "react-spinners";

import { BookResponseDto } from "@/api/api";

const DashboardLibraryPage = () => {
    const { query, result } = useList({
        resource: "books",
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

                    {/* Search Section */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                        <form
                            onSubmit={() => {}}
                            className="flex gap-2 flex-1 max-w-md"
                        >
                            <Input
                                type="text"
                                placeholder="Search by title, author, or ISBN..."
                                className="flex-1"
                                value={""}
                                onChange={() => {}}
                            />
                            <Button
                                type="submit"
                                variant="default"
                                className="px-6"
                            >
                                Search
                            </Button>
                        </form>

                        <div className="flex gap-2">
                            <Link to="/dashboard/reading/library/add">
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
        </Card>
    );
};

export default DashboardLibraryPage;
