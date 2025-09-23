// import dependencies
import { Link } from "@refinedev/core";
import { cn } from "@/lib/utils";

// import constants
import ROUTES_CONSTANTS from "@/constants/routes";

/**
 * BookCover component
 * @param image - The image of the book
 * @param id - The id of the book
 * @param alt - The alt of the book
 * @param className - The class name of the book
 */
const BookCoverCard = ({
    image,
    id,
    alt = "Book cover",
    className,
}: {
    image: string;
    id?: string;
    alt?: string;
    className?: string;
}) => {
    const cardContent = (
        <div
            className={cn(
                "group relative w-40 h-52 bg-white rounded-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                "before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gray-300 before:rounded-l-sm",
                className
            )}
        >
            {/* Book spine shadow */}
            <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/10 to-transparent rounded-l-sm" />

            {/* Book cover image */}
            <div className="relative h-full w-full rounded-sm overflow-hidden">
                {image && image.trim() !== "" ? (
                    <img
                        src={image}
                        alt={alt}
                        className="h-full w-full object-cover rounded-sm"
                        loading="lazy"
                        onError={(e) => {
                            // Hide the image and show placeholder if it fails to load
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextElementSibling?.classList.remove(
                                "hidden"
                            );
                        }}
                    />
                ) : null}

                {/* 3D Book Placeholder */}
                <div
                    className={`h-full w-full ${
                        image && image.trim() !== "" ? "hidden" : ""
                    }`}
                >
                    {/* Book cover */}
                    <div className="absolute inset-0 bg-white rounded-sm border border-gray-200 flex items-center justify-center">
                        {/* Book spine */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300 rounded-l-sm" />

                        {/* Book title initial */}
                        <span className="text-4xl font-semibold text-gray-600 uppercase">
                            {alt && alt !== "Book cover" ? alt.charAt(0) : "B"}
                        </span>
                    </div>

                    {/* Book shadow */}
                    <div className="absolute inset-0 bg-white rounded-sm transform translate-x-1 -translate-y-1 -z-10 border border-gray-100" />
                </div>

                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none" />
            </div>
        </div>
    );

    if (id) {
        return (
            <Link
                to={`${ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS_SHOW(id)}`}
                className="inline-block focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm cursor-pointer"
            >
                {cardContent}
            </Link>
        );
    }

    return cardContent;
};

export default BookCoverCard;
