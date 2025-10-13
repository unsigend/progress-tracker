// import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

// import icons
import { Edit3, Github, Mail, User } from "lucide-react";

// import types
import type { UserResponseDto, UserUpdateDto } from "@/lib/api/api";

// import components
import FileUpload from "@/components/common/FileUpload";

const ProfileSection = ({
    updatedUser,
    user,
    isLoading,
    setUser,
    onUpdate,
    onUploadAvatar,
}: {
    updatedUser: UserUpdateDto;
    user: UserResponseDto;
    isLoading: boolean;
    setUser: (user: UserUpdateDto) => void;
    onUpdate: () => void;
    onUploadAvatar: (file: File) => Promise<void>;
}) => {
    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center py-8">
                        <Spinner className="size-8" />
                    </div>
                </CardContent>
            </Card>
        );
    }

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
                                    value={updatedUser.username}
                                    onChange={(e) => {
                                        setUser({
                                            ...updatedUser,
                                            username: e.target.value,
                                        });
                                    }}
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
                                        value={updatedUser.email}
                                        onChange={(e) => {
                                            setUser({
                                                ...updatedUser,
                                                email: e.target.value,
                                            });
                                        }}
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
                                    src={user.avatar_url}
                                    alt={user.username + " avatar"}
                                    className="object-cover"
                                />
                                <AvatarFallback className="text-2xl">
                                    {user.username?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            <FileUpload
                                handleUpload={onUploadAvatar}
                                maxFileSizeMB={1}
                                icon={<Edit3 className="w-4 h-4" />}
                                text="Edit"
                                className="w-full mt-3"
                            />
                        </div>
                    </div>
                    {/* Connected Accounts Section */}
                    {user.provider && (
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-foreground">
                                Connected accounts
                            </h3>
                            {user.provider.map((providerItem: string) =>
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
                    <Button onClick={onUpdate}>Update</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProfileSection;
