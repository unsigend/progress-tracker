// import dependencies
import { BookOpen, TrendingUp, Clock, CheckCircle, Plus } from "lucide-react";
import { Link } from "react-router";

// import components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookCard from "@/components/dashboard/bookCard";
import BookShelf from "@/components/dashboard/bookShelf";
import LineChart from "@/components/ui/LineChart";

// import types
import { type BookType } from "@root/shared/types";
import { Button } from "@/components/ui/button";

// Sample data
const sampleBooks: BookType[] = [
    {
        _id: "68c1eb84a9149ff18971e748",
        title: "Learning SQL: Generate, Manipulate, and Retrieve Data",
        author: "Alan Beaulieu",
        description:
            "As data floods into your company, you need to put it to work right away―and SQL is the best tool for the job.",
        pages: 377,
        image: "https://m.media-amazon.com/images/I/81xkjj+FAfL._SY522_.jpg",
        ISBN: "9781492057611",
        createdAt: new Date("2025-09-10T21:20:04.555Z"),
        updatedAt: new Date("2025-09-10T21:20:04.555Z"),
    },
    {
        _id: "68c1eb06a9149ff18971e73c",
        title: "Node.js Design Patterns",
        author: "Mario Casciaro",
        description:
            "Learn proven patterns, techniques, and tricks to take full advantage of the Node.js platform.",
        pages: 664,
        image: "https://m.media-amazon.com/images/I/71OMPF7vzmL._SY522_.jpg",
        ISBN: "9781839214110",
        createdAt: new Date("2025-09-10T21:17:58.371Z"),
        updatedAt: new Date("2025-09-10T21:17:58.371Z"),
    },
    {
        _id: "68c1eaafa9149ff18971e738",
        title: "Grokking Data Structures",
        author: "Marcello La Rocca",
        description:
            "Grokking Data Structures makes it a breeze to learn the most useful day-to-day data structures.",
        pages: 280,
        image: "https://m.media-amazon.com/images/I/91hYIGWvKaL._SY522_.jpg",
        ISBN: "9781633436992",
        createdAt: new Date("2025-09-10T21:16:31.994Z"),
        updatedAt: new Date("2025-09-10T21:16:31.994Z"),
    },
    {
        _id: "68c1ea56a9149ff18971e732",
        title: "Algorithms",
        author: "Robert Sedgewick",
        description:
            "Princeton Computer Science professors survey the most important computer algorithms in use.",
        pages: 976,
        image: "https://m.media-amazon.com/images/I/61-8ZU7X3UL._SY522_.jpg",
        ISBN: "9780321573513",
        createdAt: new Date("2025-09-10T21:15:02.211Z"),
        updatedAt: new Date("2025-09-10T21:15:02.211Z"),
    },
];

// Weekly reading data for chart
const weeklyData = [
    { value: 45 },
    { value: 52 },
    { value: 38 },
    { value: 67 },
    { value: 73 },
    { value: 58 },
    { value: 82 },
];

const ReadingSummary = () => {
    return (
        <Card className="h-64">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <BookOpen className="w-5 h-5" />
                    Reading Summary
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">24</div>
                    <div className="text-sm text-gray-600">Pages Today</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">312</div>
                    <div className="text-sm text-gray-600">
                        Pages This Month
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const WeeklyAnalysis = () => {
    return (
        <Card className="h-64">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <TrendingUp className="w-5 h-5" />
                    Weekly Analysis
                </CardTitle>
            </CardHeader>
            <CardContent>
                <LineChart chartData={weeklyData} />
            </CardContent>
        </Card>
    );
};

const CurrentReading = () => {
    const currentBook = sampleBooks[0];
    const pagesRead = 150;
    const totalPages = currentBook.pages || 377;
    const pagesLeft = totalPages - pagesRead;
    const progressPercentage = Math.round((pagesRead / totalPages) * 100);

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <Clock className="w-5 h-5" />
                        Current Reading
                    </CardTitle>
                    <Link to="/dashboard/reading/library">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Track More
                        </Button>
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex justify-center lg:justify-start">
                        <BookCard
                            image={currentBook.image || "/placeholder-book.jpg"}
                            alt={currentBook.title || "Book cover"}
                            className="w-32 h-44"
                        />
                    </div>

                    <div className="flex-1 space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                                {currentBook.title}
                            </h3>
                            <p className="text-gray-600">
                                by {currentBook.author}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Progress</span>
                                <span>{progressPercentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>{pagesRead} pages read</span>
                                <span>{pagesLeft} pages left</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const FinishedBooks = () => {
    const finishedBooks = sampleBooks.slice(1, 5);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <CheckCircle className="w-5 h-5" />
                    Finished
                </CardTitle>
            </CardHeader>
            <CardContent>
                <BookShelf books={finishedBooks} baseUrl="/library" />
            </CardContent>
        </Card>
    );
};
const DashboardReadingHomePage = () => {
    return (
        <div className="space-y-6">
            {/* Top Row - Summary and Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ReadingSummary />
                <WeeklyAnalysis />
            </div>

            {/* Current Reading */}
            <CurrentReading />

            {/* Finished Books */}
            <FinishedBooks />
        </div>
    );
};

export default DashboardReadingHomePage;
