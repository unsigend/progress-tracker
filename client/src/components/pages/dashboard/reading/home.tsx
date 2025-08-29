// import dependencies
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

// import api
import booksAPI from "@/api/books";

// import components
import BookShelf from "@/components/ui/bookShelf";
import ErrorMessage from "@/components/ui/errorMessage";

const ReadingHomePage = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["books"],
        queryFn: booksAPI.getBooks,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="w-6 h-6 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <ErrorMessage
                message="Failed to get books"
                onRetry={() => refetch()}
            />
        );
    }

    return <BookShelf books={data} />;
};

export default ReadingHomePage;
