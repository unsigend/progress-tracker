// import dependencies
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { ArrowLeft } from "lucide-react";

// import components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/books/bookCard";

// import api
import apiClient from "@/api/apiClient";

const BackToLibraryButton = () => {
    const navigate = useNavigate();
    return (
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
            Back to Library
        </Button>
    );
};

const BookDetailsPage = () => {
    const { id } = useParams();

    // Fetch book details
    const { data, error, isLoading } = useQuery({
        queryKey: ["book", id],
        queryFn: () => apiClient.api.booksControllerFindOne(id ?? ""),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="max-w-7xl px-4">
                <Card>
                    <CardContent className="p-8 md:p-12">
                        {/* Navigation Buttons */}
                        <div className="mb-6 flex justify-between items-center">
                            <BackToLibraryButton />
                        </div>
                        <div className="flex justify-center items-center py-12">
                            <ClipLoader
                                color="#6b7280"
                                size={40}
                                speedMultiplier={0.8}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="max-w-7xl px-4">
                <Card>
                    <CardContent className="p-8 md:p-12">
                        {/* Navigation Buttons */}
                        <div className="mb-6 flex justify-between items-center">
                            <BackToLibraryButton />
                        </div>

                        <div className="flex justify-center items-center py-12">
                            <p className="text-gray-500">Book not found</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-7xl px-4">
            <Card>
                <CardContent className="p-8 md:p-12">
                    {/* Navigation Buttons */}
                    <div className="mb-6 flex justify-between items-center">
                        <BackToLibraryButton />

                        <Button
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                        >
                            Add
                        </Button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-12">
                        {/* Book Information - Left Side */}
                        <div className="flex-1 max-w-4xl space-y-8">
                            {/* Title */}
                            <div>
                                <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
                                    {data.data.title || "Untitled"}
                                </h1>
                            </div>

                            {/* Author */}
                            {data.data.author && (
                                <div>
                                    <h2 className="text-base md:text-lg text-gray-600">
                                        by {data.data.author}
                                    </h2>
                                </div>
                            )}

                            {/* Description */}
                            {data.data.description && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                                        Description
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                                        {data.data.description}
                                    </p>
                                </div>
                            )}

                            {/* Additional Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                {data.data.pages && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                            Pages
                                        </h4>
                                        <p className="text-gray-700">
                                            {data.data.pages}
                                        </p>
                                    </div>
                                )}
                                {data.data.ISBN && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                            Normalized ISBN
                                        </h4>
                                        <p className="text-gray-700 font-mono text-sm">
                                            {data.data.ISBN}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Book Image - Right Side */}
                        <div className="flex justify-center lg:justify-start lg:flex-shrink-0">
                            <BookCard
                                image={
                                    data.data.imageURL ||
                                    "/placeholder-book.jpg"
                                }
                                alt={data.data.title || "Book cover"}
                                className="w-40 h-52 md:w-48 md:h-64"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default BookDetailsPage;
