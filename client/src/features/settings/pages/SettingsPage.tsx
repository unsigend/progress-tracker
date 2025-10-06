// import components
import ProfileSection from "../components/profileSection";
import SecuritySection from "../components/securitySection";
import { ClipLoader } from "react-spinners";

// import hooks
import { useGetIdentity } from "@refinedev/core";

const DashboardSettingsPage = () => {
    // get the identity loading state
    const { isLoading } = useGetIdentity();

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto space-y-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <ClipLoader color="hsl(var(--foreground))" />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {/* Profile Section */}
                            <ProfileSection />

                            {/* Security Section */}
                            <SecuritySection />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardSettingsPage;
