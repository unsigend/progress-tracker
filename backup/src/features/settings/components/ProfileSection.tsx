// import dependencies
import { useGetIdentity, useForm } from "@refinedev/core";
import { useState } from "react";
import { toast } from "sonner";

// import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

// import icons
import { Edit3, Github, Mail, User } from "lucide-react";

// import types
import type { UpdateUserDto, UserResponseDto } from "@/lib/api/api";

// import hooks
import useInvalidateCurrentUser from "@/hooks/use-invalidate-current-user";

// import utils
import errorUtils from "@/lib/utils/error";
import validationUtils from "@/lib/utils/validation";

const ProfileSection = () => {
    const { data: user } = useGetIdentity<UserResponseDto>();
    const { invalidateCurrentUser } = useInvalidateCurrentUser();
    const { onFinish } = useForm({
        resource: "users",
        action: "edit",
        id: user?.id,
        errorNotification: false,
        successNotification: false,
        onMutationSuccess: () => {
            toast.success("Profile updated successfully");
            invalidateCurrentUser();
        },
        onMutationError: (error) => {
            toast.error(errorUtils.extractErrorMessage(error));
        },
    });
    const [updateUserData, setUpdateUserData] = useState<UpdateUserDto>({
        username: user?.username,
        email: user?.email,
    });

    // Just simple validation the rest validation is done in the backend
    const handleUpdate = () => {
        if (!user?.id) return;
        if (
            updateUserData.username === user?.username &&
            updateUserData.email === user?.email
        ) {
            toast.error("No changes to update");
            return;
        } else if (!validationUtils.email(updateUserData?.email || "")) {
            toast.error("Invalid email format");
            return;
        }
        onFinish(updateUserData);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Profile Section */}
                    <div className="flex items-start justify-between gap-16">
                        <div className="flex-1 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Username</Label>
                                <Input
                                    id="name"
                                    value={updateUserData.username || ""}
                                    onChange={(e) =>
                                        setUpdateUserData({
                                            ...updateUserData,
                                            username: e.target.value,
                                        })
                                    }
                                />
                                <p className="text-sm text-muted-foreground">
                                    Your username will be used to identify you
                                    on the platform.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        className="pr-10"
                                        value={updateUserData.email || ""}
                                        onChange={(e) =>
                                            setUpdateUserData({
                                                ...updateUserData,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <svg
                                            className="w-4 h-4 text-muted-foreground"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    This email should be unique and used for
                                    login.
                                </p>
                            </div>
                        </div>

                        {/* Avatar Section */}
                        <div className="flex-shrink-0">
                            <Avatar className="w-28 h-28">
                                <AvatarImage
                                    src={user?.avatar_url || ""}
                                    alt={user?.username + " avatar"}
                                    className="object-cover"
                                />
                                <AvatarFallback className="text-2xl">
                                    {user?.username?.charAt(0)?.toUpperCase() ||
                                        "U"}
                                </AvatarFallback>
                            </Avatar>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full mt-3"
                            >
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit
                            </Button>
                        </div>
                    </div>

                    {/* Connected Accounts Section */}
                    {user?.provider && (
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-foreground">
                                Connected accounts
                            </h3>
                            {user?.provider.map((providerItem: string) =>
                                providerItem !== "local" ? (
                                    <div
                                        key={providerItem}
                                        className="flex items-center justify-between p-3 border rounded-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            {providerItem === "github" ? (
                                                <Github className="w-4 h-4" />
                                            ) : providerItem === "google" ? (
                                                <Mail className="w-4 h-4" />
                                            ) : (
                                                <User className="w-4 h-4" />
                                            )}
                                            <span className="font-medium text-foreground">
                                                {providerItem
                                                    ?.charAt(0)
                                                    .toUpperCase() +
                                                    providerItem?.slice(1)}
                                            </span>
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                        >
                                            Connected
                                        </Badge>
                                    </div>
                                ) : null
                            )}
                        </div>
                    )}

                    <Button onClick={handleUpdate}>Update</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProfileSection;
