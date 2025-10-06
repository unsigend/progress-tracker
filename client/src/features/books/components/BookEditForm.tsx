// import dependencies
import { Link, useBack } from "@refinedev/core";

// import shadcn/ui components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// import icons
import { BookOpen, User, FileText, Hash, Image } from "lucide-react";

// import components
import BackButton from "@/components/common/BackButton";

// import types
import type { CreateBookDto, UpdateBookDto } from "@/api/api";

// import constants
import ROUTES_CONSTANTS from "@/constants/routes";

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
}: {
    title: string;
    description: string;
    formData: UpdateBookDto | CreateBookDto;
    setFormData: React.Dispatch<
        React.SetStateAction<UpdateBookDto | CreateBookDto>
    >;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    action: "add" | "edit";
}) => {
    // get the back function
    const back = useBack();

    return (
        <Card>
            <CardHeader className="text-center">
                {/* Back Button - Top Left */}
                <div className="flex items-center justify-start mb-2">
                    <BackButton onClick={back} />
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

            <CardContent>
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
                            value={formData.pages}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    pages: parseInt(e.target.value, 10),
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

                    {/* Image URL Field */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="image"
                            className="flex items-center gap-2 text-sm font-medium text-foreground"
                        >
                            <Image className="w-4 h-4" />
                            Cover Image URL
                        </Label>
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
            </CardContent>
        </Card>
    );
};

export default BookEditCard;
