// import dependencies
import { useParsed } from "@refinedev/core";
import { useOne } from "@refinedev/core";
import { ClipLoader } from "react-spinners";

// import components
import BackLink from "@/components/modules/ui/backButton";
import BookDetailCard from "@/components/modules/books/bookDetailCard";

// import shadcn/ui components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// import constants
import RESOURCES_CONSTANTS from "@/constants/resources";
import ROUTES_CONSTANTS from "@/constants/routes";

// import types
import type { BookResponseDto } from "@/api/api";

const BookDetailsPage = () => {
    // get the id from the parsed url
    const { id } = useParsed();

    // get the book data
    const { query, result } = useOne({
        resource: RESOURCES_CONSTANTS.BOOKS,
        id: id,
    });

    // render the content
    const renderContent = () => {
        if (query?.isLoading) {
            return (
                <div className="flex justify-center items-center py-12">
                    <ClipLoader size={40} />
                </div>
            );
        }

        if (query?.isError || !result) {
            return (
                <div className="flex justify-center items-center py-12">
                    <p className="text-gray-500">Book not found</p>
                </div>
            );
        }

        return <BookDetailCard book={result as BookResponseDto} />;
    };

    return (
        <div className="max-w-7xl px-4 lg:mt-12">
            <Card>
                <CardContent className="p-8 md:p-12">
                    {/* Navigation Buttons */}
                    <div className="mb-6 flex justify-between items-center">
                        {/* Back to Library */}
                        <BackLink to={ROUTES_CONSTANTS.READING_LIBRARY} />

                        {/* Add Book */}
                        {!query?.isLoading && result && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="cursor-pointer"
                            >
                                Add
                            </Button>
                        )}
                    </div>

                    {renderContent()}
                </CardContent>
            </Card>
        </div>
    );
};

export default BookDetailsPage;
