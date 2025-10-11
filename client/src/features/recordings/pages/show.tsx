// import dependencies
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

// import components
import RecordingShow from "@/features/recordings/components/Show";
import RecordingList from "@/features/recordings/components/List";

// import types
import type {
    UserBookResponseDto,
    BookResponseDto,
    RecordingResponseDto,
} from "@/lib/api/api";

// import hooks
import { useDeleteUserBook, useUserBook } from "@/hooks/use-user-books";
import { useBook } from "@/hooks/use-books";
import { useDeleteRecordings, useRecordings } from "@/hooks/use-recordings";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

const RecordingShowPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bookID, setBookID] = useState<string | undefined>(undefined);

    const { data: userBook, isLoading: isLoadingUserBook } = useUserBook(
        id ?? ""
    );

    // Set bookID when userBook is loaded
    useEffect(() => {
        if (userBook?.book_id) {
            setBookID(userBook.book_id);
        }
    }, [userBook?.book_id]);

    const { data: book, isLoading: isLoadingBook } = useBook(bookID ?? "");
    const { data: recordings, isLoading: isLoadingRecordings } = useRecordings(
        id ?? ""
    );
    const { mutate: deleteUserBook } = useDeleteUserBook(id ?? "");
    const { mutate: deleteRecordings } = useDeleteRecordings(id ?? "");
    return (
        <div className="lg:w-[80%] mx-auto flex flex-col gap-8">
            <RecordingShow
                userBook={userBook as UserBookResponseDto}
                book={book as BookResponseDto}
                isLoading={isLoadingUserBook || isLoadingBook}
                onDelete={() => {
                    deleteUserBook();
                    navigate(ROUTES_CONSTANTS.DASHBOARD().READING().HOME());
                }}
            />
            <RecordingList
                recordings={recordings as RecordingResponseDto[]}
                isLoading={isLoadingRecordings}
                onDelete={deleteRecordings}
            />
        </div>
    );
};

export default RecordingShowPage;
