// import components
import BookShelf from "@/components/dashboard/bookShelf";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// import types
import { type BookType } from "@root/shared/types";

const DashboardLibraryPage = () => {
    // Test data for computer science books
    const testBooks: BookType[] = [
        {
            id: "1",
            title: "Clean Code",
            author: "Robert C. Martin",
            image: "https://m.media-amazon.com/images/I/713LnlupOwL._SY522_.jpg",
            pages: 464,
            ISBN: "9780132350884",
        },
        {
            id: "2",
            title: "JavaScript: The Good Parts",
            author: "Douglas Crockford",
            image: "https://m.media-amazon.com/images/I/5131OWtQRaL._SX381_BO1,204,203,200_.jpg",
            pages: 176,
            ISBN: "9780596517748",
        },
        {
            id: "3",
            title: "Design Patterns",
            author: "Gang of Four",
            image: "https://m.media-amazon.com/images/I/51szD9HC9pL._SX395_BO1,204,203,200_.jpg",
            pages: 395,
            ISBN: "9780201633610",
        },
        {
            id: "4",
            title: "Introduction to Algorithms",
            author: "Thomas H. Cormen",
            image: "https://m.media-amazon.com/images/I/61Pgdn8Ys-L._SX440_BO1,204,203,200_.jpg",
            pages: 1312,
            ISBN: "9780262046305",
        },
        {
            id: "5",
            title: "The Pragmatic Programmer",
            author: "Andrew Hunt",
            image: "https://m.media-amazon.com/images/I/51W1sBPO7tL._SX380_BO1,204,203,200_.jpg",
            pages: 352,
            ISBN: "9780135957059",
        },
        {
            id: "7",
            title: "Cracking the Coding Interview",
            author: "Gayle Laakmann McDowell",
            image: "https://m.media-amazon.com/images/I/41oYsXjLvZL._SX348_BO1,204,203,200_.jpg",
            pages: 687,
            ISBN: "9780984782857",
        },
        {
            id: "10",
            title: "System Design Interview",
            author: "Alex Xu",
            image: "https://m.media-amazon.com/images/I/414CRjLjwgL._SX331_BO1,204,203,200_.jpg",
            pages: 322,
            ISBN: "9798664653403",
        },
        {
            id: "11",
            title: "The Clean Coder",
            author: "Robert C. Martin",
            image: "https://m.media-amazon.com/images/I/51E2055ZGUL._SX384_BO1,204,203,200_.jpg",
            pages: 256,
            ISBN: "9780137081073",
        },
        {
            id: "12",
            title: "Eloquent JavaScript",
            author: "Marijn Haverbeke",
            image: "https://m.media-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg",
            pages: 472,
            ISBN: "9781593279509",
        },
    ];

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col gap-6">
                    {/* Header Title */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-foreground">
                            The Library
                        </h1>
                        <div className="text-sm text-muted-foreground">
                            {testBooks.length} books
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                        <form
                            onSubmit={handleSearch}
                            className="flex gap-2 flex-1 max-w-md"
                        >
                            <Input
                                type="text"
                                placeholder="Search by title, author, or ISBN..."
                                className="flex-1"
                            />
                            <Button
                                type="submit"
                                variant="default"
                                className="px-6"
                            >
                                Search
                            </Button>
                        </form>

                        {/* Optional: Filter/Sort buttons for future */}
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs"
                            >
                                Sort A-Z
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs"
                            >
                                Filter
                            </Button>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <BookShelf books={testBooks} />
            </CardContent>
        </Card>
    );
};

export default DashboardLibraryPage;
