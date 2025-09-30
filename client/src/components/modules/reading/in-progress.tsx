// import dependencies
import { useList } from "@refinedev/core";

// import icons
import { BookOpen } from "lucide-react";

// import shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import constants
import RESOURCES_CONSTANTS from "@/constants/resources";

// import components
import BookShelf from "@/components/modules/books/List";
import { ClipLoader } from "react-spinners";

// import types
import type { UserBooksResponseDto } from "@/api/api";
import type { BookResponseDto } from "@/api/api";

const InProgressReading = () => {
    const { result, query } = useList({
        resource: RESOURCES_CONSTANTS.USER_BOOKS,
        filters: [{ field: "status", operator: "eq", value: "NOT_STARTED" }],
    });

    let books: BookResponseDto[] = [];

    if (query.isSuccess) {
        books = (result.data as unknown as UserBooksResponseDto).books.map(
            (book) => book.book
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <BookOpen className="w-5 h-5" />
                    In Progress
                </CardTitle>
            </CardHeader>
            <CardContent>
                {query.isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <ClipLoader size={40} />
                    </div>
                ) : (
                    <BookShelf books={books} />
                )}
            </CardContent>
        </Card>
    );
};

export default InProgressReading;
