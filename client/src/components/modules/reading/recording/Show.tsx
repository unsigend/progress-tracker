/* eslint-disable @typescript-eslint/no-explicit-any */

// import dependencies
import { useShow } from "@refinedev/core";
import { ClipLoader } from "react-spinners";

// import shadcn/ui components
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// import components
import BookCoverCard from "@/components/modules/books/Cover";

// import icons
import { Calendar, Clock, BookOpen, CalendarDays } from "lucide-react";

// import types
import type { UserBookResponseDto, BookResponseDto } from "@/api/api";

// import constants
import RESOURCES_CONSTANTS from "@/constants/resources";

/**
 * RecordingShowCard component
 * Displays detailed information about a specific reading recording
 */
const RecordingShowCard = ({ UserBook }: { UserBook: UserBookResponseDto }) => {
    // get book data
    const { query: bookQuery, result: bookResult } = useShow({
        resource: RESOURCES_CONSTANTS.BOOKS,
        id: UserBook.book_id,
    });

    // Format dates for display
    const formatDate = (date: any) => {
        if (!date) return "Not available";

        // Handle different date formats
        let dateObj;
        if (typeof date === "string") {
            dateObj = new Date(date);
        } else if (date instanceof Date) {
            dateObj = date;
        } else if (date.$date) {
            // MongoDB date format
            dateObj = new Date(date.$date);
        } else {
            dateObj = new Date(date);
        }

        return dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Format hours from minutes
    const formatHours = (minutes: number) => {
        const hours = minutes / 60;
        return hours.toFixed(1);
    };

    // Show loading animation while book query is loading
    if (bookQuery.isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <ClipLoader
                    color="hsl(var(--primary))"
                    size={40}
                    loading={true}
                />
            </div>
        );
    }

    // Show error if book query fails
    if (bookQuery.isError || !bookResult) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                    <p className="text-lg">Book not found</p>
                    <p className="text-sm">Unable to load book information</p>
                </div>
            </div>
        );
    }

    const Book = bookResult as BookResponseDto;

    return (
        <div>
            <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Left Column - Book Cover and Basic Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Book Cover */}
                        <div className="flex justify-center lg:justify-start">
                            <BookCoverCard
                                image={Book.cover_url}
                                alt={Book.title}
                                className="w-48 h-64 lg:w-56 lg:h-72"
                            />
                        </div>

                        {/* Recording Status Badge */}
                        <div className="flex justify-center lg:justify-start">
                            <Badge
                                variant={
                                    UserBook.status === "COMPLETED"
                                        ? "default"
                                        : "secondary"
                                }
                                className="text-sm px-4 py-2"
                            >
                                {UserBook.status}
                            </Badge>
                        </div>
                    </div>

                    {/* Right Column - Book Details and Recording Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Book Title and Author */}
                        <div className="space-y-2">
                            <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                                {Book.title}
                            </h1>
                            <h2 className="text-xl text-muted-foreground">
                                by {Book.author}
                            </h2>
                        </div>

                        <Separator />

                        {/* Book Description */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-foreground">
                                About This Book
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {Book.description}
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
                                                    {formatDate(
                                                        UserBook.start_date
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
                                                    {formatDate(
                                                        UserBook.completed_date
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
                                                    {UserBook.total_days}
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
                                                    {formatHours(
                                                        UserBook.total_minutes
                                                    )}
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
                                                    {UserBook.current_page}
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
            </div>
        </div>
    );
};

export default RecordingShowCard;
