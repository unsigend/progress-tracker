import { Clock } from "lucide-react";
import TimelineCard from "@/components/landing/timelineCard";
import { timelineData } from "@/data/landing/devProgress";

const LandingAboutPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Main Features Development Progress
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Track our progress as we build the ultimate progress
                        tracking platform.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                    <div className="space-y-8">
                        {timelineData.map((item) => (
                            <TimelineCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                            More features coming soon...
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingAboutPage;
