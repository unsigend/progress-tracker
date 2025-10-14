// import dependencies
import { useParams } from "react-router";
import { useState, useEffect } from "react";

// import shadcn/ui components
import { toast } from "sonner";

// import components
import BookEditForm from "@/features/books/components/BookEditForm";

// import hooks
import { useBook, useUpdateBook } from "@/hooks/use-books";

// import types
import type { BookUpdateDto } from "@/lib/api/api";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

// import utils
import errorUtils from "@/lib/utils/error";

const BookEditPage = () => {
    const { id } = useParams();
    const { data: book, isLoading } = useBook(id ?? "");
    const { mutate: updateBook } = useUpdateBook(id ?? "");
    const [formData, setFormData] = useState<BookUpdateDto>({
        title: "",
        author: "",
        description: "",
        ISBN10: "",
        ISBN13: "",
        pages: NaN,
        cover_url: "",
        cover: undefined,
    });

    useEffect(() => {
        setFormData(
            book ?? {
                title: "",
                author: "",
                description: "",
                ISBN10: "",
                ISBN13: "",
                pages: NaN,
                cover_url: "",
                cover: undefined,
            }
        );
    }, [book]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateBook(formData, {
            onSuccess: () => {
                toast.success("Book updated successfully");
                // Force a full page reload to clear browser image cache
                window.location.href = ROUTES_CONSTANTS.DASHBOARD()
                    .READING()
                    .BOOKS_LIST();
            },
            onError: (error) => {
                toast.error(errorUtils.extractErrorMessage(error));
            },
        });
    };

    const handleFileUpload = async (file: File) => {
        setFormData((prev) => ({
            ...prev,
            cover: file,
        }));
    };

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
                    onFileUpload={handleFileUpload}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default BookEditPage;
