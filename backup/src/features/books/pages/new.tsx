// import components
import BookEditForm from "../components/BookEditForm";

// import dependencies
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "@refinedev/core";

// import types
import type { CreateBookDto, UpdateBookDto } from "@/lib/api/api";

// import constants
import RESOURCES_CONSTANTS from "@/lib/constants/resources";

// import utils
import genericUtils from "@/lib/utils/generic";
import errorUtils from "@/lib/utils/error";

const DashboardReadingNewBookPage = () => {
    const { onFinish } = useForm({
        resource: RESOURCES_CONSTANTS.BOOKS,
        redirect: "list",
        action: "create",
        errorNotification: false,
        successNotification: false,
        onMutationError(error) {
            toast.error(errorUtils.extractErrorMessage(error));
        },
        onMutationSuccess() {
            toast.success("Book created successfully");
        },
    });

    const [formData, setFormData] = useState<CreateBookDto>({
        title: "",
        author: "",
        description: "",
        ISBN10: "",
        ISBN13: "",
        pages: undefined,
        cover_url: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // remove empty fields
        const filteredFormData = genericUtils.removeEmptyFields(formData);
        onFinish(filteredFormData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <BookEditForm
                    title="Add New Book"
                    description="Fill in the details to add a new book to the public library"
                    formData={formData}
                    setFormData={
                        setFormData as React.Dispatch<
                            React.SetStateAction<CreateBookDto | UpdateBookDto>
                        >
                    }
                    onSubmit={handleSubmit}
                    action="add"
                />
            </div>
        </div>
    );
};

export default DashboardReadingNewBookPage;
