// import components
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import BookEditForm from "../components/BookEditForm";

// import dependencies
import { useState, useEffect } from "react";
import { useForm, useParsed, useShow } from "@refinedev/core";

// import types
import type { UpdateBookDto } from "@/api/api";

// import constants
import RESOURCES_CONSTANTS from "@/constants/resources";

// import utils
import errorUtils from "@/utils/error";
import genericUtils from "@/utils/generic";

const DashboardReadingEditBookPage = () => {
    // setup hooks
    const { query, result } = useShow();
    const { onFinish } = useForm({
        id: useParsed().id,
        resource: RESOURCES_CONSTANTS.BOOKS,
        redirect: "show",
        action: "edit",
        errorNotification: false,
        successNotification: false,
        onMutationError(error) {
            toast.error(errorUtils.extractErrorMessage(error));
        },
        onMutationSuccess() {
            toast.success("Book updated successfully");
        },
    });

    const [formData, setFormData] = useState<UpdateBookDto>({
        title: "",
        author: "",
        description: "",
        ISBN10: "",
        ISBN13: "",
        pages: 0,
        cover_url: "",
    });

    useEffect(() => {
        if (result) {
            setFormData((prevFormData) =>
                genericUtils.safelyAssignObject(
                    prevFormData,
                    result as UpdateBookDto
                )
            );
        }
    }, [result]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // remove empty fields
        const filteredFormData = genericUtils.removeEmptyFields(formData);
        onFinish(filteredFormData);
    };

    if (query?.isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <ClipLoader size={40} color="hsl(var(--foreground))" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <BookEditForm
                    title="Edit Book"
                    description="Fill in the details to change the book"
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                    action="edit"
                />
            </div>
        </div>
    );
};

export default DashboardReadingEditBookPage;
