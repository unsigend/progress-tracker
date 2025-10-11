// import dependencies
import { useEffect, useState } from "react";

// import components
import ProfileSection from "@/features/dashboard/components/ProfileSection";
import SecuritySection from "@/features/dashboard/components/SecuritySection";

// import shadcn/ui components
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

// import hooks
import { useMe, useUpdateMe } from "@/hooks/use-me";

// import types
import type { UserResponseDto, UserUpdateDto } from "@/lib/api/api";

// import utils
import validationUtils from "@/lib/utils/validation";

const DashboardSettingsPage = () => {
    // get the current user data
    const { data: user, isLoading } = useMe();
    const { mutate: updateMe } = useUpdateMe();
    const [userForm, setUserForm] = useState<UserUpdateDto>({
        username: user?.username || "",
        email: user?.email || "",
        avatar_url: user?.avatar_url || "",
    });

    useEffect(() => {
        setUserForm({
            username: user?.username || "",
            email: user?.email || "",
            avatar_url: user?.avatar_url || "",
        });
    }, [user]);

    const handleUpdate = () => {
        // check email change
        if (
            userForm.email !== user?.email &&
            !validationUtils.email(userForm.email || "")
        ) {
            toast.error("Invalid email address");
            return;
        }
        // check username change
        if (
            userForm.username !== user?.username &&
            !validationUtils.username(userForm.username || "")
        ) {
            toast.error("Invalid username");
            return;
        }
        // check if no changes made
        if (
            userForm.email === user?.email &&
            userForm.username === user?.username
        ) {
            toast.error("No changes to update");
            return;
        }

        updateMe(userForm);
    };

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
                                user={userForm as UserResponseDto}
                                isLoading={isLoading}
                                setUser={setUserForm}
                                onUpdate={handleUpdate}
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
