// import dependencies
import { useDelete, useGo, useParsed } from "@refinedev/core";
import { useOne } from "@refinedev/core";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

// import components
import BackLink from "@/components/modules/ui/backButton";
import BookDetailCard from "@/components/modules/books/bookShowCard";
import DeleteDialog from "@/components/modules/ui/deleteDialog";

// import shadcn/ui components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import constants
import RESOURCES_CONSTANTS from "@/constants/resources";
import ROUTES_CONSTANTS from "@/constants/routes";

// import types
import type { BookResponseDto } from "@/api/api";

const BookDetailsPage = () => {
    // get the id from the parsed url
    const { id } = useParsed();

    const go = useGo();

    // get the book data
    const { query, result } = useOne({
        resource: RESOURCES_CONSTANTS.BOOKS,
        id: id,
    });

    // delete book mutation
    const { mutate: deleteBook } = useDelete();

    // state for delete confirmation dialog
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    /**
     * On click add button, will navigate to the add page
     */
    const onClickAddButton = () => {
        // TODO: Implement add book functionality
    };

    /**
     * On click edit button, will navigate to the edit page
     */
    const onClickEditButton = () => {
        if (!id) return;
        go({
            to: `${ROUTES_CONSTANTS.READING_LIBRARY_EDIT}/${id}`,
        });
    };

    /**
     * On click delete button, will pop up the delete confirmation dialog
     */
    const onClickDeleteButton = () => {
        setShowDeleteDialog(true);
    };

    /**
     * On confirm delete, will delete the book
     */
    const confirmDelete = () => {
        if (!id) return;
        deleteBook({
            resource: RESOURCES_CONSTANTS.BOOKS,
            id: id,
            successNotification: {
                type: "success",
                message: "Book deleted successfully",
            },
        });
        // navigate to the library page
        go({
            to: ROUTES_CONSTANTS.READING_LIBRARY,
        });
    };

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

                        {/* Dropdown Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    Actions
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={onClickAddButton}>
                                    Add
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={onClickEditButton}>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={onClickDeleteButton}>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {renderContent()}
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <DeleteDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                title="Delete Book"
                description="Are you sure you want to delete this book? This action cannot be undone."
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default BookDetailsPage;
