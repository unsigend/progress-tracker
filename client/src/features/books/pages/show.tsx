// import dependencies
import {
    useDelete,
    useBack,
    useParsed,
    useShow,
    useGo,
    useCreate,
} from "@refinedev/core";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { toast } from "sonner";

// import components
import BackButton from "@/components/common/BackButton";
import BookShowCard from "../components/BookShowCard";
import DeleteDialog from "@/components/common/DeleteDialog";

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
import RESOURCES_CONSTANTS from "@/lib/constants/resources";
import ROUTES_CONSTANTS from "@/lib/constants/routes";

// import types
import type { BookResponseDto } from "@/lib/api/api";

// import utils
import errorUtils from "@/lib/utils/error";

const BookDetailsPage = () => {
    // get the id from the parsed url
    const globalID = useParsed().id;

    // create track book mutation
    const { mutate: createTrackBook } = useCreate({
        resource: RESOURCES_CONSTANTS.USER_BOOKS,
        mutationOptions: {
            retry: false,
            onSuccess: () => {
                toast.success("Book tracked successfully");
            },
            onError: (error) => {
                toast.error(errorUtils.extractErrorMessage(error));
            },
        },
    });

    // navigate functions
    const go = useGo();
    const back = useBack();

    // get the book data
    const { query, result } = useShow();
    // delete book mutation
    const { mutate: deleteBook } = useDelete();
    // state for delete confirmation dialog
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    /**
     * On click add button, will navigate to the add page
     */
    const onClickAddButton = () => {
        // track the book to the current user
        createTrackBook({
            values: {
                id: globalID,
            },
        });
    };

    /**
     * On click edit button, will navigate to the edit page
     */
    const onClickEditButton = () => {
        if (!globalID) return;
        go({
            to: `${ROUTES_CONSTANTS.DASHBOARD()
                .READING()
                .BOOKS_EDIT(String(globalID))}`,
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
        if (!globalID) return;
        deleteBook({
            resource: RESOURCES_CONSTANTS.BOOKS,
            id: globalID,
            successNotification: {
                type: "success",
                message: "Book deleted successfully",
            },
        });
        // navigate to the library page
        go({
            to: ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS_LIST(),
        });
    };

    // render the content
    const renderContent = () => {
        if (query?.isLoading) {
            return (
                <div className="flex justify-center items-center py-12">
                    <ClipLoader size={40} color="hsl(var(--foreground))" />
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

        return <BookShowCard book={result as BookResponseDto} />;
    };

    return (
        <div className="max-w-7xl px-4 lg:mt-12">
            <Card>
                <CardContent className="p-8 md:p-12">
                    {/* Navigation Buttons */}
                    <div className="mb-6 flex justify-between items-center">
                        {/* Back to Library */}
                        <BackButton onClick={back} />

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
