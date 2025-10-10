// import dependencies
import { useState } from "react";
import { useNavigate } from "react-router";

// import shadcn/ui components
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import components
import BackButton from "@/components/common/BackButton";
import DeleteDialog from "@/components/common/DeleteDialog";

// import components
import BookCover from "@/components/common/BookCover";

// import types
import type { BookResponseDto } from "@/lib/api/api";

/**
 * BookShowCard component
 * @param book - The book to display
 * @param isLoading - Whether the book is loading
 * @param onClickAddButton - The function to call when the add button is clicked
 * @param onClickEditButton - The function to call when the edit button is clicked
 * @param confirmDelete - The function to call when the delete button is clicked
 * @returns The BookShowCard component
 */
const BookShowCard = ({
    book,
    isLoading,
    onClickAddButton,
    onClickEditButton,
    confirmDelete,
}: {
    book: BookResponseDto;
    isLoading: boolean;
    onClickAddButton: () => void;
    onClickEditButton: () => void;
    confirmDelete: () => void;
}) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const navigate = useNavigate();

    const onClickDeleteButton = () => {
        setShowDeleteDialog(true);
    };

    return (
        <div className="max-w-7xl px-4 lg:mt-12">
            <Card>
                <CardContent className="p-8 md:p-12">
                    {/* Navigation Buttons */}
                    <div className="mb-6 flex justify-between items-center">
                        {/* Back to Library */}
                        <BackButton onClick={() => navigate(-1)} />

                        {/* Dropdown Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    Actions
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={onClickAddButton}>
                                    Add
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={onClickEditButton}>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={onClickDeleteButton}>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <Spinner className="size-6" />
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-12">
                            {/* Book Information - Left Side */}
                            <div className="flex-1 max-w-4xl space-y-8">
                                {/* Title */}
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-semibold text-foreground leading-tight">
                                        {book.title || "Untitled"}
                                    </h1>
                                </div>

                                {/* Author */}
                                <div>
                                    <h2 className="text-base md:text-lg text-muted-foreground">
                                        by {book.author || "Unknown"}
                                    </h2>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
                                        Description
                                    </h3>
                                    <p className="text-foreground leading-relaxed text-sm md:text-base">
                                        {book.description ||
                                            "No description available for this book."}
                                    </p>
                                </div>

                                {/* Additional Info */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                                    {/* Pages */}
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                            Pages
                                        </h4>
                                        <p className="text-foreground">
                                            {book.pages || "Unknown"}
                                        </p>
                                    </div>

                                    {/* ISBN 10 */}
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                            ISBN 10
                                        </h4>
                                        <p className="text-foreground font-mono text-sm">
                                            {book.ISBN10 || "Unknown"}
                                        </p>
                                    </div>

                                    {/* ISBN 13 */}
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                            ISBN 13
                                        </h4>
                                        <p className="text-foreground font-mono text-sm">
                                            {book.ISBN13 || "Unknown"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Book Image - Right Side */}
                            <div className="flex justify-center lg:justify-start lg:flex-shrink-0">
                                <BookCover
                                    image={book.cover_url}
                                    alt={book.title || "unknown book cover"}
                                    className="w-40 h-52 md:w-48 md:h-64"
                                />
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <DeleteDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                title="Delete Book"
                description="Are you sure you want to delete this book? This action cannot be undone."
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default BookShowCard;
