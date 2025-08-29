import BookCard from "@/components/ui/bookCard";
import type { BookWithId } from "@/types/frontend";

interface BookShelfProps {
    books: BookWithId[];
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
                    link={`/books/${book._id}`}
                />
            ))}
        </div>
    );
};

export default BookShelf;
