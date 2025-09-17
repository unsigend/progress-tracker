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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// import validate
import validationUtils from "@/utils/validation";

// import constants
import VALIDATION from "@/constants/validation";

// import hooks
import { useUpdateMe } from "@/hooks/useUsers";

/**
 * Change password dialog
 * @returns Change password dialog
 */
interface ChangePwdDialogProps {
    onClose?: () => void;
}

export function ChangePwdDialog({ onClose }: ChangePwdDialogProps) {
    // get form data
    const [formData, setFormData] = useState<{
        newPassword: string;
        confirmPassword: string;
    }>({
        newPassword: "",
        confirmPassword: "",
    });

    // update user mutation
    const { mutate, isSuccess, isError, error } = useUpdateMe();

    // handle submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validationUtils.password(formData.newPassword)) {
            toast.error(VALIDATION.PASSWORD_ERROR_MESSAGE);
            return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        mutate({ password: formData.newPassword });
    };

    // show success message when password is changed successfully
    useEffect(() => {
        if (isSuccess) {
            toast.success("Password changed successfully!");
            // Reset form
            setFormData({
                newPassword: "",
                confirmPassword: "",
            });
            // Close dialog
            onClose?.();
        }
    }, [isSuccess]);

    // show error message when password change fails
    useEffect(() => {
        if (isError) {
            toast.error("Failed to change password. Please try again.");
        }
    }, [isError, error]);

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
