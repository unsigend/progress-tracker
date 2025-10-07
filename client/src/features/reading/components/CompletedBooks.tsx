// import dependencies
import { ClipLoader } from "react-spinners";

// import shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import components
import BookGrid from "@/features/books/components/BookGrid";

// import types
import type { UserBooksResponseDto } from "@/lib/api/api";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

const CompletedBooks = ({
    completedBooks,
    isLoading = false,
}: {
    completedBooks: UserBooksResponseDto;
    isLoading?: boolean;
}) => {
    // Show loading animation while data is loading
    if (isLoading) {
        return (
            <Card className="min-h-[200px]">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-foreground">
                        Completed Books
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
    return (
        <Card className="min-h-[200px]">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">
                    Completed Books
                </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[150px]">
                {completedBooks.books.length > 0 ? (
                    <div className="space-y-6">
                        {/* Summary Bar */}
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-foreground">
                                        {completedBooks.totalCount}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Books Completed
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-border"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-foreground">
                                        {completedBooks.books
                                            .reduce(
                                                (sum, book) =>
                                                    sum + book.book.pages,
                                                0
                                            )
                                            .toLocaleString()}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Pages Read
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Book Library */}
                        <div>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-foreground">
                                    Your Library
                                </h3>
                            </div>
                            <BookGrid
                                books={completedBooks.books.map(
                                    (book, index) => ({
                                        cover_url: book.book.cover_url,
                                        id: completedBooks.books[index].userBook
                                            .id,
                                        title: book.book.title,
                                        author: book.book.author,
                                    })
                                )}
                                to={(id) =>
                                    `${ROUTES_CONSTANTS.DASHBOARD()
                                        .READING()
                                        .RECORDINGS_SHOW(id)}`
                                }
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-muted-foreground">
                            <p className="text-lg">
                                Your completed reading journey
                            </p>
                            <p className="text-sm">
                                Books will appear here once you finish them
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default CompletedBooks;
