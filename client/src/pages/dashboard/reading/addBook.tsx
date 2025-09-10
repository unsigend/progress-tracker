// import dependencies
import { useState } from "react";
import { BookOpen, User, FileText, Hash, Image } from "lucide-react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

// import components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

// import types
import { type BookType } from "@root/shared/types";

// import api
import bookAPI from "@/api/book";

const DashboardReadingAddBookPage = () => {
    // navigate
    const navigate = useNavigate();

    // create book mutation
    const mutation = useMutation({
        mutationFn: (book: BookType) => bookAPI.createBook(book),
        onSuccess: () => {
            // after successful creation, redirect to the dashboard
            navigate("/dashboard/reading/library");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const [formData, setFormData] = useState<Partial<BookType>>({
        title: "",
        author: "",
        description: "",
        pages: undefined,
        ISBN: "",
        image: "",
    });

    // handle input change with only set specific field with value
    const handleInputChange = (
        field: keyof BookType,
        value: string | number
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData as BookType);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <Card>
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-gray-100 rounded-full">
                                <BookOpen className="w-8 h-8 text-gray-600" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-semibold text-gray-900">
                            Add New Book
                        </CardTitle>
                        <p className="text-gray-600 mt-2">
                            Fill in the details to add a new book to the public
                            library
                        </p>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title Field */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="title"
                                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    Book Title
                                </Label>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="Enter book title"
                                    value={formData.title || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    className="w-full"
                                />
                            </div>

                            {/* Author Field */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="author"
                                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                >
                                    <User className="w-4 h-4" />
                                    Author
                                </Label>
                                <Input
                                    id="author"
                                    type="text"
                                    placeholder="Enter author name"
                                    value={formData.author || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "author",
                                            e.target.value
                                        )
                                    }
                                    className="w-full"
                                />
                            </div>

                            {/* Description Field */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="description"
                                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                >
                                    <FileText className="w-4 h-4" />
                                    Description
                                </Label>
                                <textarea
                                    id="description"
                                    placeholder="Enter book description"
                                    value={formData.description || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "description",
                                            e.target.value
                                        )
                                    }
                                    className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
                                />
                            </div>

                            {/* Pages and ISBN Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Pages Field */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="pages"
                                        className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                    >
                                        <FileText className="w-4 h-4" />
                                        Pages
                                    </Label>
                                    <Input
                                        id="pages"
                                        type="number"
                                        placeholder="Number of pages"
                                        value={formData.pages || ""}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "pages",
                                                parseInt(e.target.value) || 0
                                            )
                                        }
                                        className="w-full"
                                    />
                                </div>

                                {/* ISBN Field */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="isbn"
                                        className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                    >
                                        <Hash className="w-4 h-4" />
                                        ISBN
                                    </Label>
                                    <Input
                                        id="isbn"
                                        type="text"
                                        placeholder="Enter ISBN10 or ISBN13"
                                        value={formData.ISBN || ""}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "ISBN",
                                                e.target.value
                                            )
                                        }
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Image URL Field */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="image"
                                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                >
                                    <Image className="w-4 h-4" />
                                    Cover Image URL
                                </Label>
                                <Input
                                    id="image"
                                    type="url"
                                    placeholder="https://example.com/book-cover.jpg"
                                    value={formData.image || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "image",
                                            e.target.value
                                        )
                                    }
                                    className="w-full"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="px-6"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="px-6 bg-black text-white hover:bg-gray-800"
                                >
                                    Add Book
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardReadingAddBookPage;
