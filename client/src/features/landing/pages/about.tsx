// import dependencies
import { useState } from "react";

// import icons
import { Clock, ChevronDown } from "lucide-react";

// import shadcn/ui components
import { Button } from "@/components/ui/button";

// import data
import timelineData from "@/features/landing/data/dev-progress";

// import components
import TimelineCard from "@/features/landing/components/TimelineCard";

const LandingAboutPage = () => {
    const [visibleCount, setVisibleCount] = useState(5);
    const itemsPerPage = 5;
    const totalItems = timelineData.length;
    const hasMoreItems = visibleCount < totalItems;

    const handleShowMore = () => {
        setVisibleCount((prev) => Math.min(prev + itemsPerPage, totalItems));
    };

    const visibleItems = timelineData.slice(0, visibleCount);

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-foreground mb-4">
                        Main Features Development Progress
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Track our progress as we build the ultimate progress
                        tracking platform.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

                    <div className="space-y-8">
                        {visibleItems.map((item) => (
                            <TimelineCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                {/* Show More Button */}
                {hasMoreItems && (
                    <div className="mt-12 text-center">
                        <Button
                            onClick={handleShowMore}
                            variant="outline"
                            size="lg"
                            className="group transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                        >
                            <span>Show More</span>
                            <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                        </Button>
                    </div>
                )}

                {/* Coming Soon Footer */}
                {!hasMoreItems && (
                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                                More features coming soon...
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingAboutPage;
