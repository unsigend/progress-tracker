// import dependencies
import {
    useBack,
    useParsed,
    useShow,
    useGo,
    useDelete,
    useInvalidate,
} from "@refinedev/core";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { toast } from "sonner";

// import components
import BackButton from "@/components/common/BackButton";
import RecordingShow from "@/features/recordings/components/Show";
import DeleteDialog from "@/components/common/DeleteDialog";
import RecordingList from "@/features/recordings/components/List";

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
import type {
    UserBookResponseDto,
    BookResponseDto,
    RecordingsResponseDto,
} from "@/lib/api/api";

// import api
import apiClient from "@/lib/api/apiClient";

// import utils
import errorUtils from "@/lib/utils/error";

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

    // get book data
    const { query: bookQuery, result: bookResult } = useShow({
        resource: RESOURCES_CONSTANTS.BOOKS,
        id: (userBookResult as UserBookResponseDto)?.book_id,
    });

    // get recordings data
    const { query: recordingsQuery, result: recordingsResult } = useShow({
        resource: RESOURCES_CONSTANTS.READING_RECORDINGS,
        id: globalID,
    });

    // use invalidate
    const invalidate = useInvalidate();

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

    /**
     * Handle safe merge action
     */
    const handleSafeMerge = async () => {
        if (!globalID) return;

        try {
            await apiClient.api.userBookControllerDeleteAllRecordings(
                globalID as string
            );
            invalidate({
                resource: RESOURCES_CONSTANTS.READING_RECORDINGS,
                invalidates: ["detail"],
                id: globalID,
            });
        } catch (error) {
            toast.error(errorUtils.extractErrorMessage(error));
        }
    };

    // render the content
    const renderContent = () => {
        const isLoading =
            userBookQuery?.isLoading ||
            bookQuery?.isLoading ||
            recordingsQuery?.isLoading;

        if (isLoading) {
            return (
                <div className="flex justify-center items-center py-12">
                    <ClipLoader size={40} color="hsl(var(--foreground))" />
                </div>
            );
        }

        if (
            userBookQuery?.isError ||
            !userBookResult ||
            bookQuery?.isError ||
            !bookResult
        ) {
            return (
                <div className="flex justify-center items-center py-12">
                    <p className="text-gray-500">Recording not found</p>
                </div>
            );
        }

        const userBook = userBookResult as UserBookResponseDto;
        const book = bookResult as BookResponseDto;
        const recordings =
            recordingsQuery?.isSuccess && recordingsResult
                ? (recordingsResult as unknown as RecordingsResponseDto)
                      .recordings
                : [];

        return (
            <div>
                <RecordingShow
                    userBook={userBook}
                    book={book}
                    isLoading={isLoading}
                />
                <RecordingList
                    recordings={recordings}
                    isLoading={recordingsQuery?.isLoading || false}
                    onSafeMerge={handleSafeMerge}
                />
            </div>
        );
    };

    return (
        <div className="flex items-center justify-center md:p-4">
            <div className="w-full max-w-7xl">
                <Card>
                    <CardContent className="p-8 md:p-12">
                        {/* Navigation Buttons */}
                        <div className="mb-6 flex justify-between items-center">
                            {/* Back to Recordings */}
                            <BackButton onClick={back} />

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
