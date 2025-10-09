// import dependencies
import { useState, useMemo } from "react";

// import shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// import icons
import { ChevronLeft, ChevronRight } from "lucide-react";

// import components
import BarChartComponent from "@/components/charts/BarChart";

// Function to get current week number of the year
const getCurrentWeekNumber = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor(diff / oneWeek) + 1;
};

// Generate fake data for multiple weeks around current week
const generateWeeklyData = () => {
    const currentWeek = getCurrentWeekNumber();
    return [
        // Previous week
        {
            weekNumber: currentWeek - 1,
            data: [
                { key: "Mon", value: 0 },
                { key: "Tue", value: 0 },
                { key: "Wed", value: 0 },
                { key: "Thu", value: 0 },
                { key: "Fri", value: 0 },
                { key: "Sat", value: 0 },
                { key: "Sun", value: 0 },
            ],
        },
        // Current week
        {
            weekNumber: currentWeek,
            data: [
                { key: "Mon", value: 25 },
                { key: "Tue", value: 0 },
                { key: "Wed", value: 0 },
                { key: "Thu", value: 42 },
                { key: "Fri", value: 0 },
                { key: "Sat", value: 0 },
                { key: "Sun", value: 18 },
            ],
        },
        // Next week
        {
            weekNumber: currentWeek + 1,
            data: [
                { key: "Mon", value: 0 },
                { key: "Tue", value: 55 },
                { key: "Wed", value: 0 },
                { key: "Thu", value: 0 },
                { key: "Fri", value: 34 },
                { key: "Sat", value: 0 },
                { key: "Sun", value: 0 },
            ],
        },
        // Week after next
        {
            weekNumber: currentWeek + 2,
            data: [
                { key: "Mon", value: 67 },
                { key: "Tue", value: 0 },
                { key: "Wed", value: 0 },
                { key: "Thu", value: 0 },
                { key: "Fri", value: 0 },
                { key: "Sat", value: 23 },
                { key: "Sun", value: 0 },
            ],
        },
        // Week after that
        {
            weekNumber: currentWeek + 3,
            data: [
                { key: "Mon", value: 0 },
                { key: "Tue", value: 0 },
                { key: "Wed", value: 89 },
                { key: "Thu", value: 0 },
                { key: "Fri", value: 0 },
                { key: "Sat", value: 0 },
                { key: "Sun", value: 45 },
            ],
        },
    ];
};

const fakeWeeklyData = generateWeeklyData();

const WeeklyAnalysis = () => {
    const [currentWeekIndex, setCurrentWeekIndex] = useState(1); // Start with current week
    const [selectedBook, setSelectedBook] = useState<string>("");

    const currentWeekData = fakeWeeklyData[currentWeekIndex];

    // Fake book data for selection
    const fakeBooks = [
        { id: "1", title: "The Great Gatsby" },
        { id: "2", title: "To Kill a Mockingbird" },
        { id: "3", title: "1984" },
        { id: "4", title: "Pride and Prejudice" },
        { id: "5", title: "The Catcher in the Rye" },
    ];

    // Calculate stats from current week data
    const stats = useMemo(() => {
        const values = currentWeekData.data.map((day) => day.value);
        const totalPages = values.reduce((sum, value) => sum + value, 0);
        const nonZeroValues = values.filter((value) => value > 0);
        const dailyAvg =
            nonZeroValues.length > 0
                ? Math.round(totalPages / nonZeroValues.length)
                : 0;

        return {
            totalPages,
            dailyAvg,
        };
    }, [currentWeekData]);

    const handlePreviousWeek = () => {
        if (currentWeekIndex > 0) {
            setCurrentWeekIndex(currentWeekIndex - 1);
        }
    };

    const handleNextWeek = () => {
        if (currentWeekIndex < fakeWeeklyData.length - 1) {
            setCurrentWeekIndex(currentWeekIndex + 1);
        }
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0 p-2 sm:p-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base sm:text-lg font-semibold">
                        Weekly Analysis
                    </CardTitle>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-4 border-t">
                    <div className="space-y-1 text-center">
                        <div className="text-xs text-muted-foreground">
                            Total Pages
                        </div>
                        <div className="text-lg sm:text-2xl font-bold">
                            {stats.totalPages}
                        </div>
                    </div>
                    <div className="space-y-1 text-center">
                        <div className="text-xs text-muted-foreground">
                            Daily Avg
                        </div>
                        <div className="text-lg sm:text-2xl font-bold">
                            {stats.dailyAvg}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Select
                            value={selectedBook}
                            onValueChange={setSelectedBook}
                        >
                            <SelectTrigger className="h-8 text-xs">
                                <SelectValue placeholder="Book..." />
                            </SelectTrigger>
                            <SelectContent>
                                {fakeBooks.map((book) => (
                                    <SelectItem key={book.id} value={book.id}>
                                        {book.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-1 sm:p-2 flex items-center justify-center">
                <div className="flex items-center gap-2">
                    {/* Left Arrow */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePreviousWeek}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {/* Bar Chart */}
                    <BarChartComponent
                        className="h-38"
                        chartData={currentWeekData.data}
                        color="rgb(56, 65, 81)"
                        label="Pages"
                    />

                    {/* Right Arrow */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNextWeek}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default WeeklyAnalysis;
