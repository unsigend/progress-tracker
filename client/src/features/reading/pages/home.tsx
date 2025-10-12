// imports components
import FeatureBooks from "@/features/reading/components/FeatureBooks";
import DailySummaryCard from "@/features/reading/components/DailySummary";
import WeeklyAnalysis from "@/features/reading/components/WeeklyAnalysis";
import CompletedBooks from "@/features/reading/components/CompletedBooks";
import InProgressReading from "@/features/reading/components/InProgressReading";
import QuickActionsCard from "@/features/reading/components/QuickActions";

// import dependencies
import { useState, useMemo } from "react";

// import hooks
import { useUserBooks } from "@/hooks/use-user-books";
import { useRecordingsStatistics } from "@/hooks/use-statistics";

// import utils
import dateUtils from "@/lib/utils/date";

// import types
import {
    ReadingStatus,
    type StatisticsRecordingResponseDto,
    type UserBooksResponseDto,
} from "@/lib/api/api";

const DashboardReadingHomePage = () => {
    // Weekly analysis state
    const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

    // get completed books data
    const { data: completedBooks, isLoading: isLoadingCompletedBooks } =
        useUserBooks({
            value: ReadingStatus.COMPLETED,
        });

    // get in progress books data
    const { data: inProgressBooks, isLoading: isLoadingInProgressBooks } =
        useUserBooks({
            value: ReadingStatus.IN_PROGRESS,
        });

    // get today's recordings data
    const { data: todayRecordings, isLoading: isLoadingTodayRecordings } =
        useRecordingsStatistics({
            startDate: new Date().toISOString().split("T")[0],
            dateLimit: 1,
        });

    // get weekly recordings data
    const { data: weeklyRecordings, isLoading: isLoadingWeeklyRecordings } =
        useRecordingsStatistics({
            startDate: dateUtils.getWeekStartDate(currentWeekOffset),
            dateLimit: 7,
        });

    // Calculate weekly analysis data
    const weeklyAnalysisData = useMemo(() => {
        // if no recordings, return empty data
        if (!weeklyRecordings?.recordings) {
            return {
                weekData: dateUtils.createWeekData(
                    [],
                    dateUtils.getWeekStartDate(currentWeekOffset)
                ),
                stats: { totalPages: 0, dailyAvg: 0, bestDay: "N/A" },
                weekRange: dateUtils.formatWeekRange(
                    dateUtils.getWeekStartDate(currentWeekOffset)
                ),
            };
        }

        // create week data
        const weekData = dateUtils.createWeekData(
            weeklyRecordings.recordings,
            dateUtils.getWeekStartDate(currentWeekOffset)
        );

        // Calculate stats
        const values = weekData.map((day) => day.value);
        const totalPages = values.reduce((sum, value) => sum + value, 0);
        const nonZeroValues = values.filter((value) => value > 0);
        const dailyAvg =
            nonZeroValues.length > 0
                ? Math.round(totalPages / nonZeroValues.length)
                : 0;

        // Find best day
        const bestDayData = weekData.reduce((best, current) =>
            current.value > best.value ? current : best
        );
        const bestDay = bestDayData.value > 0 ? bestDayData.key : "N/A";

        return {
            weekData,
            stats: { totalPages, dailyAvg, bestDay },
            weekRange: dateUtils.formatWeekRange(
                dateUtils.getWeekStartDate(currentWeekOffset)
            ),
        };
    }, [weeklyRecordings, currentWeekOffset]);

    // Navigation handlers
    const handlePreviousWeek = () => {
        setCurrentWeekOffset(currentWeekOffset - 1);
    };

    const handleNextWeek = () => {
        // Don't allow future weeks
        if (currentWeekOffset < 0) {
            setCurrentWeekOffset(currentWeekOffset + 1);
        }
    };

    // Sample book cover URLs for the Books We Love section - NO REPEATS
    const sampleBookCoverUrls = [
        "https://m.media-amazon.com/images/I/81xkjj+FAfL._SY522_.jpg",
        "https://m.media-amazon.com/images/I/71OMPF7vzmL._SY522_.jpg",
        "https://m.media-amazon.com/images/I/81HqVRRwp3L._SY522_.jpg",
        "https://m.media-amazon.com/images/I/61Mw06x2XcL._SY522_.jpg",
        "https://books.google.com/books/content?id=cM8mDwAAQBAJ&printsec=frontcover&img=1&edge=curl&source=gbs_api&fife=w500-h750",
        "https://m.media-amazon.com/images/I/91hUer84PpL._SY522_.jpg",
        "https://m.media-amazon.com/images/I/81xkjj+FAfL._SY522_.jpg",
        "https://m.media-amazon.com/images/I/71OMPF7vzmL._SY522_.jpg",
        "https://m.media-amazon.com/images/I/81HqVRRwp3L._SY522_.jpg",
        "https://m.media-amazon.com/images/I/61Mw06x2XcL._SY522_.jpg",
    ];

    return (
        <div className="mx-auto max-w-screen-2xl p-4 sm:p-6 lg:p-8">
            {/* Advanced CSS Grid Layout */}
            <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 auto-rows-min">
                {/* Row 1: Daily Summary Card */}
                <div className="col-span-12 lg:col-span-4 xl:col-span-4 flex items-start justify-center lg:justify-start">
                    <div className="w-full h-[350px]">
                        <DailySummaryCard
                            readingStatistics={
                                todayRecordings as StatisticsRecordingResponseDto
                            }
                            isLoading={isLoadingTodayRecordings}
                        />
                    </div>
                </div>

                {/* Row 1: Quick Actions Card */}
                <div
                    className="hidden lg:block col-span-12 lg:col-span-4 xl:col-span-4 flex 
                items-start justify-center lg:justify-start"
                >
                    <div className="w-full h-[350px]">
                        <QuickActionsCard />
                    </div>
                </div>

                {/* Row 1: Weekly Analysis */}
                <div className="col-span-12 lg:col-span-4 flex items-start justify-center lg:justify-end">
                    <div className="w-full h-[350px]">
                        <WeeklyAnalysis
                            isLoading={isLoadingWeeklyRecordings}
                            weekRange={weeklyAnalysisData.weekRange}
                            stats={weeklyAnalysisData.stats}
                            weekData={weeklyAnalysisData.weekData}
                            onPreviousWeek={handlePreviousWeek}
                            onNextWeek={handleNextWeek}
                            canGoNext={currentWeekOffset >= 0}
                        />
                    </div>
                </div>

                {/* Row 3: In Progress Reading*/}
                <div className="col-span-12">
                    <InProgressReading
                        inProgressBooks={
                            inProgressBooks as UserBooksResponseDto
                        }
                        isLoading={isLoadingInProgressBooks}
                    />
                </div>

                {/* Row 4: Completed Books */}
                <div className="col-span-12">
                    <CompletedBooks
                        completedBooks={completedBooks as UserBooksResponseDto}
                        isLoading={isLoadingCompletedBooks}
                    />
                </div>

                {/* Row 5: Feature Books */}
                <div className="col-span-12">
                    <FeatureBooks
                        coverImageUrls={sampleBookCoverUrls}
                        title="Featured Reads"
                        subtitle="Curated selection of our top recommendations."
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardReadingHomePage;
