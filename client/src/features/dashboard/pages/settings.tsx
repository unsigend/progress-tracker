// import components
import ProfileSection from "@/features/dashboard/components/ProfileSection";
import SecuritySection from "@/features/dashboard/components/SecuritySection";

// import shadcn/ui components
import { Spinner } from "@/components/ui/spinner";

// import hooks
import { useMe } from "@/hooks/use-me";

// import types
import type { UserResponseDto } from "@/lib/api/api";

const DashboardSettingsPage = () => {
    // get the current user data
    const { data: user, isLoading } = useMe();

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto space-y-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <Spinner className="size-6" />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {/* Profile Section */}
                            <ProfileSection
                                user={user as UserResponseDto}
                                isLoading={isLoading}
                            />

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
