// import components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * SearchBar component
 * @param placeholder - string to display in the input field
 * @param onSubmit - function to handle the submit event
 * @param searchTerm - string to display in the input field
 * @param setSearchTerm - function to handle the change event
 * @returns SearchBar component
 */

const SearchBar = ({
    placeholder,
    onSubmit,
    searchTerm,
    setSearchTerm,
}: {
    placeholder: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
}) => {
    return (
        <form onSubmit={onSubmit} className="flex gap-2 flex-1 max-w-md">
            <Input
                type="text"
                placeholder={placeholder}
                className="flex-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" variant="default" className="px-6">
                Search
            </Button>
        </form>
    );
};

export default SearchBar;
