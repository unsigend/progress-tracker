// import shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

// import icons
import { ChevronLeft, ChevronRight } from "lucide-react";

// import components
import BarChartComponent from "@/components/charts/BarChart";

interface WeeklyAnalysisProps {
    isLoading: boolean;
    weekRange: string;
    stats: {
        totalPages: number;
        dailyAvg: number;
        bestDay: string;
    };
    weekData: Array<{
        key: string;
        value: number;
        date: string;
    }>;
    onPreviousWeek: () => void;
    onNextWeek: () => void;
    canGoNext: boolean;
}

const WeeklyAnalysis = ({
    isLoading,
    weekRange,
    stats,
    weekData,
    onPreviousWeek,
    onNextWeek,
    canGoNext,
}: WeeklyAnalysisProps) => {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold mb-0">
                            Weekly Analysis
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                            {weekRange}
                        </p>
                    </div>
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
                    <div className="space-y-1 text-center">
                        <div className="text-xs text-muted-foreground">
                            Best Day
                        </div>
                        <div className="text-lg sm:text-2xl font-bold">
                            {stats.bestDay}
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-1 sm:p-2 flex items-center justify-center">
                {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                        <Spinner className="size-8" />
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        {/* Left Arrow */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onPreviousWeek}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        {/* Bar Chart */}
                        <BarChartComponent
                            className="h-38"
                            chartData={weekData}
                            color="rgb(56, 65, 81)"
                            label="Pages"
                        />

                        {/* Right Arrow */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onNextWeek}
                            disabled={canGoNext}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default WeeklyAnalysis;
