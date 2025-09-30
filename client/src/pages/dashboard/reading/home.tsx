// import icons
import { BookOpen, TrendingUp, CheckCircle } from "lucide-react";

// import shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import components
import BookShelf from "@/components/modules/books/List";
import LineChart from "@/components/modules/ui/chart/LineChart";
import InProgressReading from "@/components/modules/reading/in-progress";

// import types
import type { BookResponseDto } from "@/api/api";

// Sample data
const sampleBooks: BookResponseDto[] = [
    {
        id: "68c1eb84a9149ff18971e748",
        title: "Learning SQL: Generate, Manipulate, and Retrieve Data",
        author: "Alan Beaulieu",
        description:
            "As data floods into your company, you need to put it to work right away―and SQL is the best tool for the job.",
        pages: 377,
        cover_url:
            "https://m.media-amazon.com/images/I/81xkjj+FAfL._SY522_.jpg",
        ISBN10: "9781492057611",
        ISBN13: "9781492057611",
        createdAt: new Date("2025-09-10T21:20:04.555Z").toISOString(),
        updatedAt: new Date("2025-09-10T21:20:04.555Z").toISOString(),
    },
    {
        id: "68c1eb06a9149ff18971e73c",
        title: "Node.js Design Patterns",
        author: "Mario Casciaro",
        description:
            "Learn proven patterns, techniques, and tricks to take full advantage of the Node.js platform.",
        pages: 664,
        cover_url:
            "https://m.media-amazon.com/images/I/71OMPF7vzmL._SY522_.jpg",
        ISBN10: "9781839214110",
        ISBN13: "9781839214110",
        createdAt: new Date("2025-09-10T21:17:58.371Z").toISOString(),
        updatedAt: new Date("2025-09-10T21:17:58.371Z").toISOString(),
    },
    {
        id: "68c1eaafa9149ff18971e738",
        title: "Grokking Data Structures",
        author: "Marcello La Rocca",
        description:
            "Grokking Data Structures makes it a breeze to learn the most useful day-to-day data structures.",
        pages: 280,
        cover_url:
            "https://m.media-amazon.com/images/I/91hYIGWvKaL._SY522_.jpg",
        ISBN10: "9781633436992",
        ISBN13: "9781633436992",
        createdAt: new Date("2025-09-10T21:16:31.994Z").toISOString(),
        updatedAt: new Date("2025-09-10T21:16:31.994Z").toISOString(),
    },
    {
        id: "68c1ea56a9149ff18971e732",
        title: "Algorithms",
        author: "Robert Sedgewick",
        description:
            "Princeton Computer Science professors survey the most important computer algorithms in use.",
        pages: 976,
        cover_url:
            "https://m.media-amazon.com/images/I/61-8ZU7X3UL._SY522_.jpg",
        ISBN10: "9780321573513",
        ISBN13: "9780321573513",
        createdAt: new Date("2025-09-10T21:15:02.211Z").toISOString(),
        updatedAt: new Date("2025-09-10T21:15:02.211Z").toISOString(),
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
                <BookShelf books={finishedBooks} />
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
            <InProgressReading />

            {/* Finished Books */}
            <FinishedBooks />
        </div>
    );
};

export default DashboardReadingHomePage;
