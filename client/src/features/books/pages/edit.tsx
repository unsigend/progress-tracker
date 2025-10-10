// import dependencies
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";

// import shadcn/ui components
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

// import components
import BookEditForm from "@/features/books/components/BookEditForm";

// import hooks
import { useBook, useUpdateBook } from "@/hooks/use-books";

// import types
import type { UpdateBookDto } from "@/lib/api/api";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

// import utils
import errorUtils from "@/lib/utils/error";

const BookEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: book, isLoading } = useBook(id ?? "");
    const { mutate: updateBook } = useUpdateBook(id ?? "");
    const [formData, setFormData] = useState<UpdateBookDto>(book ?? {});

    useEffect(() => {
        setFormData(book ?? {});
    }, [book]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Spinner className="size-6" />
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateBook(formData, {
            onSuccess: () => {
                toast.success("Book updated successfully");
                navigate(ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS_LIST());
            },
            onError: (error) => {
                toast.error(errorUtils.extractErrorMessage(error));
            },
        });
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
                />
            </div>
        </div>
    );
};

export default BookEditPage;
