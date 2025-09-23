// import dependencies
import { cn } from "@/lib/utils";

// import components
import BookCover from "@/components/modules/books/Cover";

// import types
import type { BookResponseDto } from "@/api/api";

/**
 * BookList component
 * @param books - Array of books to display
 * @param className - Additional CSS classes
 * @returns - A grid of book cards
 */
const BookList = ({
    books,
    className,
}: {
    books: BookResponseDto[];
    className?: string;
}) => {
    if (!books || books.length === 0) {
        return (
            <div
                className={cn(
                    "flex items-center justify-center py-12",
                    className
                )}
            >
                <p className="text-muted-foreground text-sm">No books Found</p>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "grid gap-6 w-full",
                "grid-cols-2",
                "sm:grid-cols-3",
                "md:grid-cols-4",
                "lg:grid-cols-5",
                "xl:grid-cols-6",
                "2xl:grid-cols-7",
                className
            )}
        >
            {books.map((book) => (
                <div key={book.id} className="flex justify-center">
                    <BookCover
                        image={book.cover_url || "/placeholder-book.jpg"}
                        alt={
                            book.title
                                ? `${book.title} by ${
                                      book.author || "Unknown Author"
                                  }`
                                : "Book cover"
                        }
                        id={book.id}
                        className="transition-transform duration-200 hover:scale-105"
                        key={book.id}
                    />
                </div>
            ))}
        </div>
    );
};

export default BookList;
