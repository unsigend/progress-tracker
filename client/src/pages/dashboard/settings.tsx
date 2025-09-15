// import components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound } from "lucide-react";
import ProfileSection from "@/components/dashboard/profileSection";
import SecuritySection from "@/components/dashboard/securitySection";

// import api
import { setAuthToken } from "@/api/apiClient";

// import dependencies
import { useContext } from "react";

// import context
import UserContext from "@/context/userContext";

// import types
import type { ResponseUserDto } from "@/api/api";

const DashboardSettingsPage = () => {
    // get user from context
    const { user } = useContext(UserContext) as {
        user: ResponseUserDto;
    };

    // handle logout
    const handleLogout = () => {
        // remove auth token from local storage
        localStorage.removeItem("jwt-token");
        // remove auth token from api client
        setAuthToken("");

        // refresh the page
        window.location.reload();
    };

    // Show loading state if user data is not available
    if (!user.id) {
        return (
            <div className="min-h-screen bg-gray-50/50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="flex items-center justify-center py-8">
                            <div className="text-gray-500">
                                Loading settings...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto space-y-6">
                    {/* Profile Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold text-gray-900">
                                Profile
                            </CardTitle>
                            <p className="text-gray-600">
                                Personal information
                            </p>
                        </CardHeader>
                        <CardContent className="p-6">
                            <ProfileSection user={user} />
                        </CardContent>
                    </Card>

                    {/* Security Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <KeyRound className="w-5 h-5" />
                                Security
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SecuritySection onLogout={handleLogout} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardSettingsPage;
