// import dependencies
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";

// import components
import BookShelf from "@/components/dashboard/bookShelf";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

// import api
import bookAPI from "@/api/book";

// import query types
import { type BookQueryType } from "@root/shared/types";

const DashboardLibraryPage = () => {
    // state for query object
    const [queryObject, setQueryObject] = useState<BookQueryType>({});
    // state for search input
    const [searchInput, setSearchInput] = useState<string>("");

    // use Query to get all books
    const { data, error, isLoading } = useQuery({
        queryKey: ["books", queryObject],
        queryFn: () => bookAPI.getAllBooks(queryObject),
    });

    if (error) {
        toast.error(error.message);
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setQueryObject({ ...queryObject, search: searchInput });
    };

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
                            onSubmit={handleSearch}
                            className="flex gap-2 flex-1 max-w-md"
                        >
                            <Input
                                type="text"
                                placeholder="Search by title, author, or ISBN..."
                                className="flex-1"
                                value={searchInput}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setSearchInput(e.target.value)}
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
                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <ClipLoader
                            color="#6b7280"
                            size={40}
                            speedMultiplier={0.8}
                        />
                    </div>
                ) : (
                    <BookShelf books={data} />
                )}
            </CardContent>
        </Card>
    );
};

export default DashboardLibraryPage;
