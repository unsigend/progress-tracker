import BookCard from "@/components/ui/bookCard";
import type { BookType } from "@root/shared/types";

interface BookShelfProps {
    books: BookType[];
    className?: string;
}

const BookShelf = ({ books, className = "" }: BookShelfProps) => {
    return (
        <div
            className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 ${className}`}
        >
            {books.map((book) => (
                <BookCard
                    key={book._id}
                    imageURL={book.image}
                    link={`/books/${book.title}`}
                />
            ))}
        </div>
    );
};

export default BookShelf;
