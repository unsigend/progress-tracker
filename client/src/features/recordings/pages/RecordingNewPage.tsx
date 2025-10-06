// import dependencies
import { useState } from "react";
import { useList, useForm } from "@refinedev/core";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

// import components
import RecordingNewCard from "@/features/recordings/components/New";

// import types
import type {
    BookProgressDto,
    CreateRecordingDto,
    UserBooksResponseDto,
} from "@/api/api";

// import constants
import RESOURCES_CONSTANTS from "@/constants/resources";

// import utils
import errorUtils from "@/utils/error";

const DashboardReadingRecordingNewPage = () => {
    const { onFinish } = useForm({
        resource: RESOURCES_CONSTANTS.READING_RECORDINGS,
        redirect: "list",
        action: "create",
        errorNotification: false,
        successNotification: false,
        onMutationError(error) {
            toast.error(errorUtils.extractErrorMessage(error));
        },
        onMutationSuccess() {
            toast.success("Recording created successfully");
        },
    });

    // form state
    const [formData, setFormData] = useState<CreateRecordingDto>({
        user_book_id: "",
        date: new Date().toISOString(),
        pages: 0,
        minutes: 0,
        notes: "",
    });

    // get the user books
    const { result: userBooks, query } = useList<UserBooksResponseDto>({
        resource: RESOURCES_CONSTANTS.USER_BOOKS,
    });

    let selectableUserBooks;
    if (query.isSuccess && userBooks.data) {
        // filter out the completed books
        const userBooksData = userBooks.data as unknown as UserBooksResponseDto;
        selectableUserBooks = userBooksData.books
            .filter((book: BookProgressDto) => {
                return book.userBook.status !== "COMPLETED";
            })
            .map((book: BookProgressDto) => ({
                id: book.userBook.id,
                title: book.book.title,
                author: book.book.author,
            }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onFinish(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {query.isLoading || !selectableUserBooks ? (
                    <div className="flex items-center justify-center py-12">
                        <ClipLoader
                            color="hsl(var(--primary))"
                            size={40}
                            loading={true}
                        />
                    </div>
                ) : (
                    <RecordingNewCard
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        userBooks={selectableUserBooks}
                    />
                )}
            </div>
        </div>
    );
};

export default DashboardReadingRecordingNewPage;
