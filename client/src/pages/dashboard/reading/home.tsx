// import components
import WelcomeCard from "@/components/modules/reading/welcome-card";
import FeatureBookCard from "@/components/modules/reading/feature-book-card";
import BooksWeLove from "@/components/modules/reading/books-we-love";

const DashboardReadingHomePage = () => {
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
        <div className="mx-auto max-w-screen-2xl space-y-6">
            {/* Top Row - Equal Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WelcomeCard />
                <FeatureBookCard
                    coverImageUrl="https://m.media-amazon.com/images/I/71OMPF7vzmL._SY522_.jpg"
                    title="Check out this amazing thriller!"
                />
            </div>

            {/* Books We Love Section - 5 Books */}
            <div className="bg-gradient-to-br from-red-800 via-red-700 to-red-900 rounded-lg p-10 lg:p-16">
                <BooksWeLove
                    coverImageUrls={sampleBookCoverUrls}
                    title="Featured Reads"
                    subtitle="Curated selection of our top recommendations."
                />
            </div>
        </div>
    );
};

export default DashboardReadingHomePage;
