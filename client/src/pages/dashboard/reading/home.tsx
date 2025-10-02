// import components
import DailySummary from "@/components/modules/reading/daily-summary";
import WeeklyAnalysis from "@/components/modules/reading/weekly-analysis";
import InProgressReading from "@/components/modules/reading/in-progress";
import CompletedBooks from "@/components/modules/reading/completed-books";

const DashboardReadingHomePage = () => {
    return (
        <div className="mx-auto max-w-7xl space-y-6">
            {/* Top Row - Equal Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DailySummary />
                <WeeklyAnalysis />
            </div>

            {/* Middle Row - Full width */}
            <InProgressReading />

            {/* Bottom Row - Equal Layout */}
            <CompletedBooks />
        </div>
    );
};

export default DashboardReadingHomePage;
