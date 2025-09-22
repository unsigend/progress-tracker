// import components
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Edit3, Github, Mail, User } from "lucide-react";

// import types
import type { UserResponseDto } from "@/api/api";

// import hooks
import { useGetIdentity } from "@refinedev/core";

// get provider icon
const getProviderIcon = (provider: string) => {
    switch (provider) {
        case "github":
            return <Github className="w-4 h-4" />;
        case "google":
            return <Mail className="w-4 h-4" />;
        default:
            return <User className="w-4 h-4" />;
    }
};

const ProfileSection = () => {
    const { data: user, isLoading } = useGetIdentity<UserResponseDto>();

    // Show loading state if user data is not available
    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-center py-8">
                    <div className="text-gray-500">Loading user data...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Profile Section */}
            <div className="flex items-start justify-between gap-16">
                <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Username</Label>
                        <Input
                            id="name"
                            className="text-gray-900"
                            value={user?.username || ""}
                        />
                        <p className="text-sm text-gray-500">
                            Your username will be used to identify you on the
                            platform.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Input
                                id="email"
                                className="text-gray-900 pr-10"
                                value={user?.email || ""}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg
                                    className="w-4 h-4 text-gray-400"
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
                        <p className="text-sm text-gray-500">
                            This email should be unique and used for login.
                        </p>
                    </div>
                </div>

                {/* Avatar Section */}
                <div className="flex-shrink-0">
                    <Avatar className="w-28 h-28">
                        {user?.avatar_url ? (
                            <AvatarImage
                                src={user?.avatar_url}
                                alt={user?.username + " avatar"}
                            />
                        ) : null}
                        <AvatarFallback className="text-2xl">
                            {user?.username.charAt(0).toUpperCase() || ""}
                        </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                    </Button>
                </div>
            </div>

            {/* Connected Accounts Section */}
            <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                    Connected accounts
                </h3>
                {user?.provider.map((providerItem: string) =>
                    providerItem !== "local" ? (
                        <div
                            key={providerItem}
                            className="flex items-center justify-between p-3 border rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                {getProviderIcon(providerItem)}
                                <span className="font-medium text-gray-900">
                                    {providerItem?.charAt(0).toUpperCase() +
                                        providerItem?.slice(1)}
                                </span>
                            </div>
                            <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-800"
                            >
                                Connected
                            </Badge>
                        </div>
                    ) : null
                )}
            </div>

            <Button onClick={() => {}}>Update</Button>
        </div>
    );
};

export default ProfileSection;
