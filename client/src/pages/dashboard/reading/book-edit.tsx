/* eslint-disable @typescript-eslint/no-unused-vars */
// import components
import { toast } from "sonner";
import BookEditCard from "@/components/modules/books/bookEditCard";
import { ClipLoader } from "react-spinners";

// import dependencies
import { useState, useEffect } from "react";
import { useGo, useOne, useParsed, useUpdate } from "@refinedev/core";

// import types
import type { UpdateBookDto } from "@/api/api";

// import constants
import RESOURCES_CONSTANTS from "@/constants/resources";
import ROUTES_CONSTANTS from "@/constants/routes";

// import utils
import errorUtils from "@/utils/error";

const DashboardReadingEditBookPage = () => {
    const go = useGo();

    const { id } = useParsed();

    const { query, result } = useOne({
        resource: RESOURCES_CONSTANTS.BOOKS,
        id: id,
    });

    const [formData, setFormData] = useState<UpdateBookDto>({
        title: result?.title || "",
        author: result?.author || "",
        description: result?.description || "",
        ISBN10: result?.ISBN10 || "",
        ISBN13: result?.ISBN13 || "",
        pages: result?.pages || 0,
        cover_url: result?.cover_url || "",
    });

    useEffect(() => {
        if (result) {
            setFormData({
                title: result.title || "",
                author: result.author || "",
                description: result.description || "",
                ISBN10: result.ISBN10 || "",
                ISBN13: result.ISBN13 || "",
                pages: result.pages || 0,
                cover_url: result.cover_url || "",
            });
        }
    }, [result]);

    const { mutate: updateBook } = useUpdate({
        resource: RESOURCES_CONSTANTS.BOOKS,
        id: id,
        mutationOptions: {
            onError: (error) => {
                toast.error(errorUtils.extractErrorMessage(error));
            },
            onSuccess: () => {
                toast.success("Book updated successfully");
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
        } else {
            filteredFormData.pages =
                parseInt(filteredFormData.pages as string, 10) || 0;
        }

        updateBook({
            values: filteredFormData,
        });
    };

    if (query?.isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <ClipLoader size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <BookEditCard
                    title="Edit Book"
                    description="Fill in the details to change the book"
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default DashboardReadingEditBookPage;
