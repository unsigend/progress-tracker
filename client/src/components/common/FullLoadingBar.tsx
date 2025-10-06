// import components
import { Card, CardContent } from "@/components/ui/card";

const FullLoadingBar = ({ message }: { message: string }) => {
    return (
        <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
                <CardContent className="pt-8 pb-8">
                    <div className="space-y-6 text-center">
                        {/* Logo/Brand */}
                        <div className="space-y-2">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Progress Tracker
                            </h1>
                            <div className="w-12 h-12 mx-auto bg-gray-900 rounded-full flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            </div>
                        </div>

                        {/* Loading Message */}
                        <div className="space-y-2">
                            <p className="text-gray-900 font-medium">
                                {message}
                            </p>
                            <p className="text-sm text-gray-600">
                                Please wait while we process your request...
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FullLoadingBar;
