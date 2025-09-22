// import components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileSection from "@/components/modules/settings/profileSection";
import SecuritySection from "@/components/modules/settings/securitySection";

// import icons
import { KeyRound } from "lucide-react";

// import types
import type { UserResponseDto } from "@/api/api";

// import hooks
import { useGetIdentity } from "@refinedev/core";

const DashboardSettingsPage = () => {
    const { isLoading } = useGetIdentity<UserResponseDto>();
    // Show loading state if user data is not available
    if (isLoading) {
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
                            <ProfileSection />
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
                            <SecuritySection />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardSettingsPage;
