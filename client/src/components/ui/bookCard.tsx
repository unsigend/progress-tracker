import { Link } from "react-router";

interface BookCardProps {
    imageURL: string | undefined;
    link: string;
    className?: string;
}

const BookCard = ({ imageURL, link, className = "" }: BookCardProps) => {
    return (
        <Link
            to={link}
            className={`group block transition-all duration-200 hover:scale-102 hover:-translate-y-0.5 ${className}`}
        >
            <div className="relative w-40 h-52 bg-white rounded-sm shadow-sm hover:shadow-md transition-all duration-200">
                {/* Book Cover Image Only */}
                <img
                    src={imageURL || ""}
                    alt="Book cover"
                    className="w-full h-full object-cover rounded-sm"
                />

                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-sm" />
            </div>
        </Link>
    );
};

export default BookCard;
