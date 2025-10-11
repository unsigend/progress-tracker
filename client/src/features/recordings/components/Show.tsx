// import dependencies
import { useState } from "react";
import { useNavigate } from "react-router";

// import shadcn/ui components
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";

// import components
import BookCoverCard from "@/components/common/BookCover";
import BackButton from "@/components/common/BackButton";
import DeleteDialog from "@/components/common/DeleteDialog";

// import icons
import { Calendar, Clock, BookOpen, CalendarDays } from "lucide-react";

// import types
import type { UserBookResponseDto, BookResponseDto } from "@/lib/api/api";

// import utils
import dateUtils from "@/lib/utils/date";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

/**
 * RecordingShow component
 * Displays detailed information about a specific reading recording
 */
const RecordingShow = ({
    userBook,
    book,
    isLoading,
    onDelete,
}: {
    userBook: UserBookResponseDto | undefined;
    book: BookResponseDto | undefined;
    isLoading: boolean;
    onDelete: () => void;
}) => {
    const navigate = useNavigate();
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

    const handleDelete = () => {
        onDelete();
        setShowDeleteDialog(false);
    };

    // Show loading while data is loading
    if (isLoading || !userBook || !book) {
        return (
            <Card>
                <CardHeader>
                    <BackButton onClick={() => navigate(-1)} />
                </CardHeader>
                <CardContent className="p-8">
                    <div className="flex justify-center py-12">
                        <Spinner className="size-8" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <BackButton onClick={() => navigate(-1)} />
                <AlertDialog
                    open={showDeleteDialog}
                    onOpenChange={setShowDeleteDialog}
                >
                    <AlertDialogTrigger asChild>
                        <Button size="sm" className="rounded-lg">
                            Delete
                        </Button>
                    </AlertDialogTrigger>
                </AlertDialog>

                <DeleteDialog
                    open={showDeleteDialog}
                    onOpenChange={setShowDeleteDialog}
                    title="Delete Book"
                    description="Are you sure you want to delete this book? This action cannot be undone and will remove all associated recordings."
                    onConfirm={handleDelete}
                    confirmText="Delete"
                    cancelText="Cancel"
                />
            </CardHeader>
            <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Left Column - Book Cover and Basic Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Book Cover */}
                        <div className="flex justify-center lg:justify-start">
                            <BookCoverCard
                                to={ROUTES_CONSTANTS.DASHBOARD()
                                    .READING()
                                    .BOOKS_SHOW(book.id)}
                                image={book.cover_url}
                                alt={book.title}
                                className="w-48 h-64 lg:w-56 lg:h-72"
                            />
                        </div>

                        {/* Recording Status Badge */}
                        <div className="flex justify-center lg:justify-start">
                            <Badge
                                variant={
                                    userBook.status === "COMPLETED"
                                        ? "default"
                                        : "secondary"
                                }
                                className="text-sm px-4 py-2"
                            >
                                {userBook.status}
                            </Badge>
                        </div>
                    </div>

                    {/* Right Column - Book Details and Recording Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Book Title and Author */}
                        <div className="space-y-2">
                            <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                                {book.title}
                            </h1>
                            <h2 className="text-xl text-muted-foreground">
                                by {book.author}
                            </h2>
                        </div>

                        <Separator />

                        {/* Book Description */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-foreground">
                                About This Book
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {book.description}
                            </p>
                        </div>

                        <Separator />

                        {/* Recording Timeline */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-foreground">
                                Reading Timeline
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Start Date */}
                                <Card className="border-border/50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <Calendar className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    Started Reading
                                                </p>
                                                <p className="font-semibold text-foreground">
                                                    {dateUtils.formatDate(
                                                        userBook.start_date
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Complete Date */}
                                <Card className="border-border/50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-green-500/10 rounded-lg">
                                                <CalendarDays className="h-5 w-5 text-green-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    Completed
                                                </p>
                                                <p className="font-semibold text-foreground">
                                                    {dateUtils.formatDate(
                                                        userBook.completed_date
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <Separator />

                        {/* Reading Statistics */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-foreground">
                                Reading Statistics
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Total Days */}
                                <Card className="border-border/50">
                                    <CardContent className="p-4 text-center">
                                        <div className="space-y-2">
                                            <div className="p-2 bg-blue-500/10 rounded-lg mx-auto w-fit">
                                                <CalendarDays className="h-6 w-6 text-blue-500 mx-auto" />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-foreground">
                                                    {userBook.total_days}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Total Days
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Total Hours */}
                                <Card className="border-border/50">
                                    <CardContent className="p-4 text-center">
                                        <div className="space-y-2">
                                            <div className="p-2 bg-purple-500/10 rounded-lg mx-auto w-fit">
                                                <Clock className="h-6 w-6 text-purple-500 mx-auto" />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-foreground">
                                                    {(
                                                        userBook.total_minutes /
                                                        60
                                                    ).toFixed(1)}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Total Hours
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Pages Read */}
                                <Card className="border-border/50">
                                    <CardContent className="p-4 text-center">
                                        <div className="space-y-2">
                                            <div className="p-2 bg-orange-500/10 rounded-lg mx-auto w-fit">
                                                <BookOpen className="h-6 w-6 text-orange-500 mx-auto" />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-foreground">
                                                    {userBook.current_page}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Pages Read
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default RecordingShow;
