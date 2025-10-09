// import dependencies
import { useList } from "@refinedev/core";

// imports for components
import WelcomeCard from "../components/WelcomeCard";
import FeatureBookCard from "../components/FeatureBookCard";
import BooksWeLove from "../components/BooksWeLove";
import DailySummaryCard from "../components/DailySummary";
import WeeklyAnalysis from "../components/WeeklyAnalysis";
import CompletedBooks from "../components/CompletedBooks";
import InProgressReading from "../components/InProgressReading";
import QuickActionsCard from "../components/QuickActions";

// import types
import type { UserBooksResponseDto } from "@/lib/api/api";

// import constants
import RESOURCES_CONSTANTS from "@/lib/constants/resources";

const DashboardReadingHomePage = () => {
    // Fetch completed books
    const { result: completedBooks, query: completedBooksQuery } =
        useList<UserBooksResponseDto>({
            resource: RESOURCES_CONSTANTS.USER_BOOKS,
            filters: [
                {
                    field: "status",
                    operator: "eq",
                    value: "COMPLETED",
                },
            ],
        });

    // Fetch in progress books
    const { result: inProgressBooks, query: inProgressBooksQuery } =
        useList<UserBooksResponseDto>({
            resource: RESOURCES_CONSTANTS.USER_BOOKS,
            filters: [
                {
                    field: "status",
                    operator: "eq",
                    value: "IN_PROGRESS",
                },
            ],
        });

    const completedBooksData: UserBooksResponseDto =
        completedBooks?.data as unknown as UserBooksResponseDto;
    const inProgressBooksData: UserBooksResponseDto =
        inProgressBooks?.data as unknown as UserBooksResponseDto;

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
                {/* Row 1: Hero Section - Equal heights and centered */}
                {/* <div className="col-span-12 lg:col-span-5 flex items-start justify-center lg:justify-start">
                    <div className="w-full h-[400px]">
                        <WelcomeCard />
                    </div>
                </div> */}

                {/* Row 2: Daily Summary Card */}
                <div className="col-span-12 lg:col-span-4 xl:col-span-4 flex items-start justify-center lg:justify-start">
                    <div className="w-full h-[350px]">
                        <DailySummaryCard />
                    </div>
                </div>

                {/* Row 2: Quick Actions Card */}
                <div
                    className="hidden lg:block col-span-12 lg:col-span-4 xl:col-span-4 flex 
                items-start justify-center lg:justify-start"
                >
                    <div className="w-full h-[350px]">
                        <QuickActionsCard />
                    </div>
                </div>

                {/* Row 2: Feature Book Card */}
                <div className="col-span-12 lg:col-span-4 flex items-start justify-center lg:justify-end">
                    <div className="w-full h-[350px]">
                        <WeeklyAnalysis />
                    </div>
                </div>

                {/* Row 3: In Progress Reading - Full Width */}
                <div className="col-span-12">
                    <InProgressReading
                        inProgressBooks={{
                            books: inProgressBooksData.books,
                            totalCount: inProgressBooks?.total || 0,
                        }}
                        isLoading={inProgressBooksQuery?.isLoading || false}
                    />
                </div>

                {/* Row 4: Completed Books - Full Width */}
                <div className="col-span-12">
                    <CompletedBooks
                        completedBooks={{
                            books: completedBooksData.books,
                            totalCount: completedBooks?.total || 0,
                        }}
                        isLoading={completedBooksQuery?.isLoading || false}
                    />
                </div>

                {/* Row 5: Books We Love */}
                <div className="col-span-12">
                    <BooksWeLove
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
