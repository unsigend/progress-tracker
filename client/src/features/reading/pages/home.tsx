// imports for components
import FeatureBooks from "@/features/reading/components/FeatureBooks";
import DailySummaryCard from "@/features/reading/components/DailySummary";
import WeeklyAnalysis from "@/features/reading/components/WeeklyAnalysis";
import CompletedBooks from "@/features/reading/components/CompletedBooks";
import InProgressReading from "@/features/reading/components/InProgressReading";
import QuickActionsCard from "@/features/reading/components/QuickActions";

// import hooks
import { useUserBooks } from "@/hooks/use-user-books";

// import types
import { ReadingStatus, type UserBooksResponseDto } from "@/lib/api/api";

const DashboardReadingHomePage = () => {
    const { data: completedBooks, isLoading: isLoadingCompletedBooks } =
        useUserBooks({
            value: ReadingStatus.COMPLETED,
        });
    const { data: inProgressBooks, isLoading: isLoadingInProgressBooks } =
        useUserBooks({
            value: ReadingStatus.IN_PROGRESS,
        });

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
                        <DailySummaryCard />
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
                        <WeeklyAnalysis />
                    </div>
                </div>

                {/* Row 3: In Progress Reading - Full Width */}
                <div className="col-span-12">
                    <InProgressReading
                        inProgressBooks={
                            inProgressBooks as UserBooksResponseDto
                        }
                        isLoading={isLoadingInProgressBooks}
                    />
                </div>

                {/* Row 4: Completed Books - Full Width */}
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
