/* eslint-disable @typescript-eslint/no-explicit-any */

// import dependencies
import { useMutation } from "@tanstack/react-query";

// import components
import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

// import validate
import { validation } from "@/utils";

// import constants
import { ERROR_MESSAGES } from "@/constants/auth";

// import api
import apiClient from "@/api/apiClient";

// import types
import type { ResponseUserDto } from "@/api/api";

// import context
import UserContext from "@/context/userContext";

// import utils
import { getErrorMessage } from "@/utils/auth";

/**
 * Change password dialog
 * @returns Change password dialog
 */
export function ChangePwdDialog() {
    // get form data
    const [formData, setFormData] = useState<{
        newPassword: string;
        confirmPassword: string;
    }>({
        newPassword: "",
        confirmPassword: "",
    });

    // get user from context
    const { user } = useContext(UserContext) as {
        user: ResponseUserDto;
        setUser: (user: ResponseUserDto) => void;
    };

    // update user mutation
    const updateUserMutation = useMutation({
        mutationFn: () =>
            apiClient.api.userControllerUpdate(user.id, {
                password: formData.newPassword,
            }),
        onSuccess: () => {
            toast.success("Password updated successfully");
            // refresh the page
            window.location.reload();
        },
        onError: (error: any) => {
            toast.error(getErrorMessage(error));
        },
    });

    // handle submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validation.password(formData.newPassword)) {
            toast.error(ERROR_MESSAGES.PASSWORD_REQUIRED);
            return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error(ERROR_MESSAGES.PASSWORD_MATCH);
            return;
        }
        updateUserMutation.mutate();
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Change password</DialogTitle>
                <DialogDescription>
                    Make changes to your password here. Click save when
                    you&apos;re done.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-3">
                        <Label htmlFor="newPassword">New password</Label>
                        <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            value={formData.newPassword}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    newPassword: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="confirmPassword">
                            Confirm new password
                        </Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    confirmPassword: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
