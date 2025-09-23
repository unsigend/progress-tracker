import { Link } from "@refinedev/core";
import { ArrowLeft } from "lucide-react";

/**
 * BackLink component
 * @param to - The link to the previous page
 * @returns The BackLink component
 */
function BackLink({ to }: { to: string }) {
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
