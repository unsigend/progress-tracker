// import dependencies
import { cn } from "@/lib/utils";

// import components
import BookCard from "@/components/modules/books/bookCard";

// import types
import type { BookResponseDto } from "@/api/api";

/**
 * BookShelf component
 * @param books - Array of books to display
 * @param className - Additional CSS classes
 * @param baseUrl - The base url of the book default is ""
 * @returns - A grid of book cards
 */
const BookShelf = ({
    books,
    className,
    baseUrl = "",
}: {
    books: BookResponseDto[];
    className?: string;
    baseUrl?: string;
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
                // Responsive grid columns
                "grid-cols-2", // Mobile: 2 columns
                "sm:grid-cols-3", // Small: 3 columns
                "md:grid-cols-4", // Medium: 4 columns
                "lg:grid-cols-5", // Large: 5 columns
                "xl:grid-cols-6", // Extra large: 6 columns
                "2xl:grid-cols-7", // 2X large: 7 columns
                className
            )}
        >
            {books.map((book) => (
                <div key={book.id} className="flex justify-center">
                    <BookCard
                        image={book.cover_url || "/placeholder-book.jpg"}
                        alt={
                            book.title
                                ? `${book.title} by ${
                                      book.author || "Unknown Author"
                                  }`
                                : "Book cover"
                        }
                        link={`${baseUrl}/${book.id}`}
                        className="transition-transform duration-200 hover:scale-105"
                        key={book.id}
                    />
                </div>
            ))}
        </div>
    );
};

export default BookShelf;
