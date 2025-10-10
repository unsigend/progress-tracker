// import dependencies
import { useNavigate, useParams } from "react-router";

// import shadcn/ui components
import { toast } from "sonner";

// import hooks
import { useBook, useDeleteBook } from "@/hooks/use-books";

// import components
import BookShowCard from "@/features/books/components/BookShowCard";

// import types
import type { BookResponseDto } from "@/lib/api/api";

// import utils
import errorUtils from "@/lib/utils/error";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

const BookDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: book, isLoading } = useBook(id ?? "");
    const { mutate: deleteBook } = useDeleteBook(id ?? "");

    const onClickAddButton = () => {};
    const onClickEditButton = () => {
        navigate(
            ROUTES_CONSTANTS.DASHBOARD()
                .READING()
                .BOOKS_EDIT(id ?? "")
        );
    };
    const confirmDelete = () => {
        if (!id) return;
        deleteBook(undefined, {
            onSuccess: () => {
                toast.success("Book deleted successfully");
                navigate(ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS_LIST());
            },
            onError: (error) => {
                toast.error(errorUtils.extractErrorMessage(error));
            },
        });
    };

    return (
        <BookShowCard
            book={book as BookResponseDto}
            isLoading={isLoading}
            onClickAddButton={onClickAddButton}
            onClickEditButton={onClickEditButton}
            confirmDelete={confirmDelete}
        />
    );
};

export default BookDetailsPage;
