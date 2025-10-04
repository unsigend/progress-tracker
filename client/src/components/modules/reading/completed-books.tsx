// import shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import components
import BookList from "@/components/modules/books/List";

// import types
import type { BookResponseDto } from "@/api/api";

// Mock data for demonstration
const mockCompletedBooks: BookResponseDto[] = [
    {
        id: "1",
        title: "The Pragmatic Programmer",
        author: "David Thomas, Andrew Hunt",
        cover_url:
            "https://images-na.ssl-images-amazon.com/images/I/41as+WafrFL._SX342_SY445_.jpg",
        isbn: "978-0201616224",
        published_date: "1999-10-20",
        pages: 352,
        description: "Your journey to mastery",
        language: "English",
        publisher: "Addison-Wesley Professional",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    },
    {
        id: "2",
        title: "Clean Architecture",
        author: "Robert C. Martin",
        cover_url:
            "https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg",
        isbn: "978-0134494272",
        published_date: "2017-09-20",
        pages: 432,
        description: "A Craftsman's Guide to Software Structure and Design",
        language: "English",
        publisher: "Prentice Hall",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    },
    {
        id: "3",
        title: "Design Patterns",
        author: "Gang of Four",
        cover_url:
            "https://images-na.ssl-images-amazon.com/images/I/51V8JjVJjVL._SX342_SY445_.jpg",
        isbn: "978-0201633610",
        published_date: "1994-10-21",
        pages: 395,
        description: "Elements of Reusable Object-Oriented Software",
        language: "English",
        publisher: "Addison-Wesley Professional",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    },
    {
        id: "4",
        title: "System Design Interview",
        author: "Alex Xu",
        cover_url:
            "https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg",
        isbn: "978-1736049112",
        published_date: "2020-06-12",
        pages: 320,
        description: "An Insider's Guide",
        language: "English",
        publisher: "System Design Interview",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    },
    {
        id: "5",
        title: "Cracking the Coding Interview",
        author: "Gayle Laakmann McDowell",
        cover_url:
            "https://images-na.ssl-images-amazon.com/images/I/51V8JjVJjVL._SX342_SY445_.jpg",
        pages: 687,
        description: "189 Programming Questions and Solutions",
        publisher: "CareerCup",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    },
    {
        id: "6",
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        cover_url:
            "https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg",
        pages: 176,
        description: "The Good Parts",
        publisher: "O'Reilly Media",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    },
];

const CompletedBooks = () => {
    // Calculate summary data
    const totalBooks = mockCompletedBooks.length;
    const totalPages = mockCompletedBooks.reduce(
        (sum, book) => sum + book.pages,
        0
    );

    return (
        <Card className="min-h-[200px]">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">
                    Completed Books
                </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[150px]">
                {mockCompletedBooks.length > 0 ? (
                    <div className="space-y-6">
                        {/* Summary Bar */}
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-foreground">
                                        {totalBooks}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Books Completed
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-border"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-foreground">
                                        {totalPages.toLocaleString()}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Pages Read
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Book Library */}
                        <div>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-foreground">
                                    Your Library
                                </h3>
                            </div>
                            <BookList books={mockCompletedBooks} />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-muted-foreground">
                            <p className="text-lg">
                                Your completed reading journey
                            </p>
                            <p className="text-sm">
                                Books will appear here once you finish them
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default CompletedBooks;
