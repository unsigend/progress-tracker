// import dependencies
import { Link } from "@refinedev/core";

// import icons
import { ArrowLeft } from "lucide-react";

/**
 * BackLink component return a button or a link with same style
 * @param to - The link to the previous page
 * @param onClick - The function to call when the button is clicked
 * @returns The BackLink component
 */
function BackLink({ to = "", onClick }: { to?: string; onClick?: () => void }) {
    /**
     * If the onClick function is provided, return a button with the onClick function
     * and the ArrowLeft icon
     */
    if (onClick) {
        return (
            <button
                onClick={onClick}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
        );
    }

    /**
     * If the onClick function is not provided, return a link with the to prop
     * and the ArrowLeft icon
     */
    return (
        <Link
            to={to}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
    );
}

export default BackLink;
