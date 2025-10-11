// import dependencies
import { useState } from "react";
import { useNavigate } from "react-router";

// import shadcn/ui components
import { toast } from "sonner";

// import components
import BookEditForm from "@/features/books/components/BookEditForm";

// import types
import type { BookCreateDto, BookUpdateDto } from "@/lib/api/api";

// import utils
import genericUtils from "@/lib/utils/generic";

// import hooks
import { useCreateBook } from "@/hooks/use-books";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

const BookNewPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<BookCreateDto>({
        title: "",
        author: "",
        description: "",
        ISBN10: "",
        ISBN13: "",
        pages: NaN,
        cover_url: "",
    });
    const { mutate: createBook } = useCreateBook();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // remove empty fields
        const filteredFormData: BookCreateDto = genericUtils.removeEmptyFields(
            formData
        ) as unknown as BookCreateDto;
        createBook(filteredFormData, {
            onSuccess: () => {
                toast.success("Book created successfully");
                navigate(ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS_LIST());
            },
        });
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
                            React.SetStateAction<BookCreateDto | BookUpdateDto>
                        >
                    }
                    onSubmit={handleSubmit}
                    action="add"
                />
            </div>
        </div>
    );
};

export default BookNewPage;
