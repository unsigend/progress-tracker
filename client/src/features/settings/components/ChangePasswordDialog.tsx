// import shadcn/ui components
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

// import dependencies
import { useForm, useGetIdentity } from "@refinedev/core";
import { useState } from "react";
import { toast } from "sonner";

// import types
import type { UserResponseDto } from "@/lib/api/api";

// import utils
import errorUtils from "@/lib/utils/error";

/**
 * Change password dialog
 * @returns Change password dialog
 */
export function ChangePwdDialog({ closeDialog }: { closeDialog: () => void }) {
    const { data: user } = useGetIdentity<UserResponseDto>();
    const { onFinish } = useForm({
        resource: "users",
        action: "edit",
        id: user?.id,
        errorNotification: false,
        successNotification: false,
        onMutationSuccess: () => {
            toast.success("Password changed successfully");
            // close the dialog
            closeDialog();
        },
        onMutationError: (error) => {
            toast.error(errorUtils.extractErrorMessage(error));
        },
    });

    const [formData, setFormData] = useState<{
        password: string;
        confirmPassword: string;
    }>({
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // check if passwords match
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        // remove confirmPassword from formData
        const { password } = formData;
        onFinish({ password });
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
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
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
