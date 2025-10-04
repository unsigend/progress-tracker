// import dependencies
import { useState } from "react";
import { useGo, useList } from "@refinedev/core";
import { ClipLoader } from "react-spinners";

// import shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

// import components
import BookCoverCard from "@/components/modules/books/Cover";

// import types
import type { UserBooksResponseDto } from "@/api/api";

// import constants
import RESOURCES_CONSTANTS from "@/constants/resources";
import ROUTES_CONSTANTS from "@/constants/routes";

// import icons
import { Plus } from "lucide-react";

const InProgressReading = () => {
    // use the go navigation hook
    const go = useGo();

    // state for showing all books
    const [showAllBooks, setShowAllBooks] = useState(false);

    // get the in progress books
    const { result: inProgressBooks, query } = useList<UserBooksResponseDto>({
        resource: RESOURCES_CONSTANTS.USER_BOOKS,
        filters: [
            {
                field: "",
                operator: "eq",
                value: "IN_PROGRESS",
            },
        ],
    });

    // Show loading animation while query is loading
    if (query.isLoading) {
        return (
            <Card className="min-h-[200px]">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-foreground">
                        In Progress Reading
                    </CardTitle>
                </CardHeader>
                <CardContent className="min-h-[150px] flex items-center justify-center">
                    <ClipLoader
                        color="hsl(var(--primary))"
                        size={40}
                        loading={true}
                    />
                </CardContent>
            </Card>
        );
    }

    const Books = (inProgressBooks.data as unknown as UserBooksResponseDto)
        .books;

    const maxDisplayBooks = 3;
    const displayBooks = showAllBooks ? Books : Books.slice(0, maxDisplayBooks);
    const hasMoreBooks = Books.length > maxDisplayBooks;

    // handle view all click
    const handleViewAllClick = () => {
        setShowAllBooks(!showAllBooks);
    };

    return (
        <Card className="min-h-[200px]">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground flex items-center justify-between">
                    In Progress Reading
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                            go({
                                to: ROUTES_CONSTANTS.DASHBOARD()
                                    .READING()
                                    .BOOKS_LIST(),
                            })
                        }
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[150px]">
                {Books.length > 0 ? (
                    <div className="space-y-4">
                        {displayBooks.map((book) => (
                            <div
                                key={book.userBook.id}
                                className="flex items-center gap-4 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                            >
                                {/* Left Container - Book Cover */}
                                <div className="flex-shrink-0">
                                    <BookCoverCard
                                        image={book.book.cover_url}
                                        id={book.userBook.id}
                                        alt={book.book.title}
                                        className="w-25 h-32"
                                    />
                                </div>

                                {/* Right Container - Book Info and Progress */}
                                <div className="flex-1 min-w-0 lg:px-8">
                                    <div className="space-y-2">
                                        {/* Book Title and Author */}
                                        <div>
                                            <h3 className="font-semibold text-foreground text-sm leading-tight truncate">
                                                {book.book.title.includes(":")
                                                    ? book.book.title.split(
                                                          ":"
                                                      )[0]
                                                    : book.book.title}
                                            </h3>
                                            <p className="text-xs text-muted-foreground truncate">
                                                by {book.book.author}
                                            </p>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="space-y-1">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-muted-foreground">
                                                    {book.userBook.current_page}{" "}
                                                    / {book.book.pages} pages
                                                </span>
                                                <span className="font-medium text-foreground">
                                                    {
                                                        book.userBook
                                                            .total_minutes
                                                    }
                                                    %
                                                </span>
                                            </div>
                                            <Progress
                                                value={
                                                    book.userBook.total_minutes
                                                }
                                                className="h-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* View All / Show Less Button */}
                        {hasMoreBooks && (
                            <div className="flex justify-center pt-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="px-6"
                                    onClick={handleViewAllClick}
                                >
                                    {showAllBooks ? "Show Less" : `View More`}
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-muted-foreground">
                            <p className="text-lg">Currently reading</p>
                            <p className="text-sm">
                                Your active books will show up here
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default InProgressReading;
