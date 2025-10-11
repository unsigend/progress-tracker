// import dependencies
import { useState } from "react";
import { useNavigate } from "react-router";

// import shadcn/ui components
import { toast } from "sonner";

// import components
import RecordingNewCard from "@/features/recordings/components/New";

// import types
import {
    type RecordingCreateDto,
    ReadingStatus,
    type UserBooksResponseDto,
} from "@/lib/api/api";

// import hooks
import { useUserBooks } from "@/hooks/use-user-books";
import { useCreateRecording } from "@/hooks/use-recordings";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

const RecordingNewPage = () => {
    const navigate = useNavigate();

    // form data state
    const [formData, setFormData] = useState<RecordingCreateDto>({
        date: "",
        pages: 0,
        minutes: 0,
        notes: "",
    });

    // user book id state
    const [userBookId, setUserBookId] = useState<string>("");

    // get the selectable user books
    const { data: userBooks, isLoading } = useUserBooks({
        value: ReadingStatus.IN_PROGRESS,
    });

    // create recording
    const { mutate: createRecording } = useCreateRecording(userBookId);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createRecording(formData, {
            onSuccess: () => {
                toast.success("Recording created successfully");
                navigate(ROUTES_CONSTANTS.DASHBOARD().READING().HOME());
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <RecordingNewCard
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                    userBooks={userBooks as UserBooksResponseDto}
                    isLoading={isLoading}
                    userBookId={userBookId}
                    setUserBookId={setUserBookId}
                />
            </div>
        </div>
    );
};

export default RecordingNewPage;
