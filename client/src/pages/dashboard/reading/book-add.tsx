/* eslint-disable @typescript-eslint/no-unused-vars */
// import components
import { toast } from "sonner";
import BookEditCard from "@/components/modules/books/bookEditCard";

// import dependencies
import { useState } from "react";
import { useGo } from "@refinedev/core";
import { useCreate } from "@refinedev/core";

// import types
import type { CreateBookDto, UpdateBookDto } from "@/api/api";

// import constants
import RESOURCES_CONSTANTS from "@/constants/resources";
import ROUTES_CONSTANTS from "@/constants/routes";

// import utils
import errorUtils from "@/utils/error";

const DashboardReadingAddBookPage = () => {
    const go = useGo();

    const [formData, setFormData] = useState<CreateBookDto>({
        title: "",
        author: "",
        description: "",
        ISBN10: "",
        ISBN13: "",
        pages: 0,
        cover_url: "",
    });

    const { mutate: createBook } = useCreate({
        resource: RESOURCES_CONSTANTS.BOOKS,
        mutationOptions: {
            onError: (error) => {
                toast.error(errorUtils.extractErrorMessage(error));
            },
            onSuccess: () => {
                toast.success("Book created successfully");
                go({
                    to: ROUTES_CONSTANTS.READING_LIBRARY,
                });
            },
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // remove empty fields
        const filteredFormData = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== "")
        );

        // if pages is 0, remove it
        if (filteredFormData.pages === 0) {
            delete filteredFormData.pages;
        }

        createBook({
            values: filteredFormData,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <BookEditCard
                    title="Add New Book"
                    description="Fill in the details to add a new book to the public library"
                    formData={formData}
                    setFormData={
                        setFormData as React.Dispatch<
                            React.SetStateAction<CreateBookDto | UpdateBookDto>
                        >
                    }
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default DashboardReadingAddBookPage;
