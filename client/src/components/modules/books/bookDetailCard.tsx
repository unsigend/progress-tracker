// import components
import BookCard from "@/components/modules/books/bookCard";

// import types
import type { BookResponseDto } from "@/api/api";

/**
 * BookDetailCard component
 * @param book - The book to display
 * @returns The BookDetailCard component
 */
const BookDetailCard = ({ book }: { book: BookResponseDto }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-12">
            {/* Book Information - Left Side */}
            <div className="flex-1 max-w-4xl space-y-8">
                {/* Title */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
                        {book.title || "Untitled"}
                    </h1>
                </div>

                {/* Author */}
                {book.author && (
                    <div>
                        <h2 className="text-base md:text-lg text-gray-600">
                            by {book.author}
                        </h2>
                    </div>
                )}

                {/* Description */}
                {book.description && (
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                            Description
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                            {book.description}
                        </p>
                    </div>
                )}

                {/* Additional Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                    {/* Pages */}
                    {book.pages && (
                        <div>
                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                Pages
                            </h4>
                            <p className="text-gray-700">{book.pages}</p>
                        </div>
                    )}

                    {/* ISBN 10 */}
                    {book.ISBN10 && (
                        <div>
                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                ISBN 10
                            </h4>
                            <p className="text-gray-700 font-mono text-sm">
                                {book.ISBN10}
                            </p>
                        </div>
                    )}

                    {/* ISBN 13 */}
                    {book.ISBN13 && (
                        <div>
                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                ISBN 13
                            </h4>
                            <p className="text-gray-700 font-mono text-sm">
                                {book.ISBN13}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Book Image - Right Side */}
            <div className="flex justify-center lg:justify-start lg:flex-shrink-0">
                <BookCard
                    image={book.cover_url || "/placeholder-book.jpg"}
                    alt={book.title || "Book cover"}
                    className="w-40 h-52 md:w-48 md:h-64"
                />
            </div>
        </div>
    );
};

export default BookDetailCard;
