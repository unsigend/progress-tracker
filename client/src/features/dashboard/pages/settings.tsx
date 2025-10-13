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
import { useFileUploadAvatar } from "@/hooks/use-cloud";

// import types
import type { UserResponseDto, UserUpdateDto } from "@/lib/api/api";

// import utils
import validationUtils from "@/lib/utils/validation";

const DashboardSettingsPage = () => {
    // get the data use hooks
    const { data: user, isLoading } = useMe();
    const { mutate: updateMe } = useUpdateMe();
    const { mutate: uploadAvatar } = useFileUploadAvatar();

    const [userForm, setUserForm] = useState<UserUpdateDto>({
        username: user?.username || "",
        email: user?.email || "",
    });

    useEffect(() => {
        setUserForm({
            username: user?.username || "",
            email: user?.email || "",
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
        toast.success("User updated successfully");
    };

    const handleUploadAvatar = async (file: File) => {
        // upload the avatar
        const response = await uploadAvatar(file);
        // update the avatar for the user
        updateMe({ avatar_url: response.file_url });
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
                                user={user as UserResponseDto}
                                updatedUser={userForm as UserUpdateDto}
                                isLoading={isLoading}
                                setUser={setUserForm}
                                onUpdate={handleUpdate}
                                onUploadAvatar={handleUploadAvatar}
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
