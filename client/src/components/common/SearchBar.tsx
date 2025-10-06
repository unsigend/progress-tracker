// import components
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

/**
 * SearchBar component with modern design
 * @param placeholder - string to display in the input field
 * @param onSubmit - function to handle the submit event
 * @param searchTerm - string to display in the input field
 * @param setSearchTerm - function to handle the change event
 * @param size - size variant: "default" or "large"
 * @returns SearchBar component
 */

const SearchBar = ({
    placeholder,
    searchTerm,
    setSearchTerm,
    onSubmit,
    onClear,
    size = "default",
}: {
    placeholder: string;
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onClear: () => void;
    size?: "default" | "large";
}) => {
    const isLarge = size === "large";

    return (
        <div className="w-full flex justify-center px-4">
            <form
                className={`relative flex items-center w-full ${
                    isLarge ? "max-w-4xl" : "max-w-md"
                }`}
                onSubmit={onSubmit}
            >
                {/* Main pill-shaped container */}
                <div className="relative w-full bg-gray-50 rounded-full shadow-lg overflow-hidden">
                    {/* Search input */}
                    <Input
                        type="text"
                        placeholder={placeholder}
                        className={`border-0 shadow-none focus:ring-0 focus:outline-none focus:border-0 bg-transparent rounded-none placeholder:text-gray-400 transition-all duration-200 w-full ${
                            isLarge
                                ? "h-14 pl-6 pr-16 text-lg py-4"
                                : "h-10 pl-4 pr-12 text-sm py-2"
                        }`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Clear button (when there's text) */}
                    {searchTerm && onClear && (
                        <button
                            type="button"
                            className={`absolute right-12 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 rounded-full transition-all duration-200 flex items-center justify-center ${
                                isLarge ? "w-10 h-10" : "w-8 h-8"
                            }`}
                            onClick={onClear}
                        >
                            <X
                                className={`text-gray-400 mr-2 ${
                                    isLarge ? "h-5 w-5" : "h-4 w-4"
                                }`}
                            />
                        </button>
                    )}

                    {/* Circular search button */}
                    <button
                        type="submit"
                        className={`absolute right-1 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-900 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
                            isLarge ? "h-12 w-12" : "h-8 w-8"
                        }`}
                    >
                        <Search
                            className={`text-white ${
                                isLarge ? "h-6 w-6" : "h-4 w-4"
                            }`}
                        />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
