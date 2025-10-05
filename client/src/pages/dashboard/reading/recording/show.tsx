// import dependencies
import { useBack, useParsed, useShow, useGo, useDelete } from "@refinedev/core";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

// import components
import BackLink from "@/components/modules/ui/backButton";
import RecordingShowCard from "@/components/modules/reading/recording/Show";
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
import type { UserBookResponseDto } from "@/api/api";

const DashboardReadingRecordingShowPage = () => {
    // get the id from the parsed url
    const globalID = useParsed().id;

    // navigate functions
    const go = useGo();
    const back = useBack();

    // get user book data
    const { query: userBookQuery, result: userBookResult } = useShow({
        resource: RESOURCES_CONSTANTS.USER_BOOKS,
        id: globalID,
    });

    // delete user book mutation
    const { mutate: deleteUserBook } = useDelete();
    // state for delete confirmation dialog
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    /**
     * On click delete button, will pop up the delete confirmation dialog
     */
    const onClickDeleteButton = () => {
        setShowDeleteDialog(true);
    };

    /**
     * On confirm delete, will delete the user book
     */
    const confirmDelete = () => {
        if (!globalID) return;
        deleteUserBook({
            resource: RESOURCES_CONSTANTS.USER_BOOKS,
            id: globalID,
            successNotification: {
                type: "success",
                message: "Recording deleted successfully",
            },
        });
        // navigate to the reading home page
        go({
            to: ROUTES_CONSTANTS.DASHBOARD().READING().HOME(),
        });
    };

    // render the content
    const renderContent = () => {
        if (userBookQuery?.isLoading) {
            return (
                <div className="flex justify-center items-center py-12">
                    <ClipLoader size={40} color="hsl(var(--foreground))" />
                </div>
            );
        }

        if (userBookQuery?.isError || !userBookResult) {
            return (
                <div className="flex justify-center items-center py-12">
                    <p className="text-gray-500">Recording not found</p>
                </div>
            );
        }
        return (
            <RecordingShowCard
                UserBook={userBookResult as UserBookResponseDto}
            />
        );
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-7xl">
                <Card>
                    <CardContent className="p-8 md:p-12">
                        {/* Navigation Buttons */}
                        <div className="mb-6 flex justify-between items-center">
                            {/* Back to Recordings */}
                            <BackLink onClick={back} />

                            {/* Dropdown Menu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        Actions
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem
                                        onClick={onClickDeleteButton}
                                    >
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
                    title="Delete Recording"
                    description="Are you sure you want to delete this recording? This action cannot be undone."
                    onConfirm={confirmDelete}
                />
            </div>
        </div>
    );
};

export default DashboardReadingRecordingShowPage;
