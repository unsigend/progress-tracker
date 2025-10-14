// import dependencies
import { Link, useNavigate } from "react-router";
import { useState } from "react";

// import shadcn/ui components
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// import icons
import { BookOpen, User, FileText, Hash, Image } from "lucide-react";

// import components
import BackButton from "@/components/common/BackButton";
import FileUpload from "@/components/common/FileUpload";

// import types
import type { BookCreateDto, BookUpdateDto } from "@/lib/api/api";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

/**
 * BookAddCard component
 * @returns BookAddCard component
 */
const BookEditCard = ({
    title,
    description,
    formData,
    setFormData,
    onSubmit,
    action,
    onFileUpload,
    isLoading,
}: {
    title: string;
    description: string;
    formData: BookUpdateDto | BookCreateDto;
    setFormData: React.Dispatch<
        React.SetStateAction<BookUpdateDto | BookCreateDto>
    >;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    action: "add" | "edit";
    onFileUpload?: (file: File) => Promise<void>;
    isLoading?: boolean;
}) => {
    // get the back function
    const navigate = useNavigate();

    const [isFileUploadMode, setIsFileUploadMode] = useState(false);

    return (
        <Card>
            <CardHeader className="text-center">
                {/* Back Button - Top Left */}
                <div className="flex items-center justify-start mb-2">
                    <BackButton onClick={() => navigate(-1)} />
                </div>

                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-muted rounded-full">
                        <BookOpen className="w-8 h-8 text-muted-foreground" />
                    </div>
                </div>
                <CardTitle className="text-2xl font-semibold text-foreground">
                    {title}
                </CardTitle>
                <p className="text-muted-foreground mt-2">{description}</p>
            </CardHeader>

            <CardContent className="min-h-[800px]">
                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <Spinner className="size-6" />
                    </div>
                ) : (
                    <form className="space-y-6" onSubmit={onSubmit}>
                        {/* Title Field */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="title"
                                className="flex items-center gap-2 text-sm font-medium text-foreground"
                            >
                                <BookOpen className="w-4 h-4" />
                                Book Title
                            </Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter book title"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                                className="w-full"
                            />
                        </div>

                        {/* Author Field */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="author"
                                className="flex items-center gap-2 text-sm font-medium text-foreground"
                            >
                                <User className="w-4 h-4" />
                                Author
                            </Label>
                            <Input
                                id="author"
                                type="text"
                                placeholder="Enter author name"
                                value={formData.author}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        author: e.target.value,
                                    })
                                }
                                className="w-full"
                            />
                        </div>

                        {/* Description Field */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="description"
                                className="flex items-center gap-2 text-sm font-medium text-foreground"
                            >
                                <FileText className="w-4 h-4" />
                                Description
                            </Label>
                            <textarea
                                id="description"
                                placeholder="Enter book description"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                className="w-full min-h-[200px] px-3 py-2 border border-input 
                            rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring
                             focus:border-transparent resize-none bg-background text-foreground"
                            />
                        </div>

                        {/* Pages Field */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="pages"
                                className="flex items-center gap-2 text-sm font-medium text-foreground"
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
                                    setFormData({
                                        ...formData,
                                        pages:
                                            e.target.value === ""
                                                ? undefined
                                                : parseInt(e.target.value, 10),
                                    })
                                }
                                className="w-full"
                            />
                        </div>

                        {/* ISBN 10 and ISBN 13 Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* ISBN 10 Field */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="isbn10"
                                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                                >
                                    <Hash className="w-4 h-4" />
                                    ISBN 10
                                </Label>
                                <Input
                                    id="isbn10"
                                    type="text"
                                    placeholder="Enter ISBN 10"
                                    value={formData.ISBN10}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            ISBN10: e.target.value,
                                        })
                                    }
                                    className="w-full"
                                />
                            </div>

                            {/* ISBN 13 Field */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="isbn13"
                                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                                >
                                    <Hash className="w-4 h-4" />
                                    ISBN 13
                                </Label>
                                <Input
                                    id="isbn13"
                                    type="text"
                                    placeholder="Enter ISBN 13"
                                    value={formData.ISBN13}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            ISBN13: e.target.value,
                                        })
                                    }
                                    className="w-full"
                                />
                            </div>
                        </div>

                        {/* Cover Image Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                    <Image className="w-4 h-4" />
                                    Cover Image
                                </Label>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-muted-foreground">
                                        {isFileUploadMode
                                            ? "Upload File"
                                            : "Image URL"}
                                    </span>
                                    <Switch
                                        checked={isFileUploadMode}
                                        onCheckedChange={(checked) => {
                                            setIsFileUploadMode(checked);
                                            // Clear both fields when switching modes
                                            setFormData((prev) => ({
                                                ...prev,
                                                cover_url: "",
                                                cover: undefined,
                                            }));
                                        }}
                                    />
                                </div>
                            </div>

                            <Separator />

                            {/* URL Input Mode */}
                            {!isFileUploadMode && (
                                <div className="space-y-2">
                                    <Input
                                        id="image"
                                        type="url"
                                        placeholder="https://example.com/book-cover.jpg"
                                        value={formData.cover_url}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                cover_url: e.target.value,
                                            })
                                        }
                                        className="w-full"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Enter the URL of the cover image
                                    </p>
                                </div>
                            )}

                            {/* File Upload Mode */}
                            {isFileUploadMode && onFileUpload && (
                                <div className="space-y-2">
                                    <FileUpload
                                        handleUpload={onFileUpload}
                                        text="Choose Cover Image"
                                        icon={<Image className="w-4 h-4" />}
                                        acceptedFileTypes="image/*"
                                        maxFileSizeMB={1}
                                        className="w-full"
                                    />

                                    {/* Show selected file name */}
                                    {formData.cover && (
                                        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                                            <Image className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm text-foreground">
                                                {formData.cover.name}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                (
                                                {(
                                                    formData.cover.size /
                                                    1024 /
                                                    1024
                                                ).toFixed(2)}{" "}
                                                MB)
                                            </span>
                                        </div>
                                    )}

                                    <p className="text-xs text-muted-foreground">
                                        Upload an image file (PNG, JPG, GIF up
                                        to 1MB)
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Link
                                to={ROUTES_CONSTANTS.DASHBOARD()
                                    .READING()
                                    .BOOKS_LIST()}
                            >
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="px-6"
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" className="px-6">
                                {action === "add" ? "Add Book" : "Update Book"}
                            </Button>
                        </div>
                    </form>
                )}
            </CardContent>
        </Card>
    );
};

export default BookEditCard;
