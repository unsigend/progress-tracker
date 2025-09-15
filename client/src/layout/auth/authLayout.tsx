import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

interface AuthLayoutProps {
    children: React.ReactNode;
    leftContent: React.ReactNode;
}

/**
 * AuthLayout component
 * @param children - The children to render
 * @param leftContent - The left content to render
 * @returns The AuthLayout component
 */
const AuthLayout = ({ children, leftContent }: AuthLayoutProps) => {
    return (
        <div className="relative grid md:grid-cols-2 min-h-[600px]">
            <Link
                to="/"
                className="absolute top-6 left-6 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>

            <div className="bg-gray-50/50 p-8 flex items-center justify-center">
                <div className="w-full max-w-sm">{leftContent}</div>
            </div>

            <div className="p-8 flex items-center justify-center">
                <div className="w-full max-w-sm">{children}</div>
            </div>
        </div>
    );
};

export default AuthLayout;
