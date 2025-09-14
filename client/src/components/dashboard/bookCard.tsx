// import dependencies
import { Link, useLocation } from "react-router";

import { cn } from "@/lib/utils";

interface BookCardProps {
    image: string;
    link?: string;
    alt?: string;
    className?: string;
}

/**
 * BookCard component
 * @param image - The image of the book
 * @param link - The link of the book it should be the id of the book
 * @param alt - The alt of the book
 * @param className - The class name of the book
 */
const BookCard = ({
    image,
    link,
    alt = "Book cover",
    className,
}: BookCardProps) => {
    // get the location
    const location = useLocation();

    const cardContent = (
        <div
            className={cn(
                "group relative w-36 h-52 bg-white rounded-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                "before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-b before:from-gray-200 before:via-gray-300 before:to-gray-400 before:rounded-l-sm",
                "after:absolute after:inset-y-1 after:left-1 after:w-px after:bg-gradient-to-b after:from-transparent after:via-white/50 after:to-transparent",
                className
            )}
        >
            {/* Book spine shadow */}
            <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/10 to-transparent rounded-l-sm" />

            {/* Book cover image */}
            <div className="relative h-full w-full rounded-sm overflow-hidden">
                <img
                    src={image}
                    alt={alt}
                    className="h-full w-full object-cover rounded-sm"
                    loading="lazy"
                />

                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none" />
            </div>
        </div>
    );

    if (link) {
        return (
            <Link
                to={`${location.pathname}${link}`}
                className="inline-block focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm cursor-pointer"
            >
                {cardContent}
            </Link>
        );
    }

    return cardContent;
};

export default BookCard;
