// import dependencies
import { useState } from "react";

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
import { toast } from "sonner";

// import hooks
import { useUpdateMe } from "@/hooks/use-me";

// import utils
import validationUtils from "@/lib/utils/validation";

// import constants
import VALIDATION_CONSTANTS from "@/lib/constants/validation";

/**
 * Change password dialog
 * @returns Change password dialog
 */
export function ChangePwdDialog({ closeDialog }: { closeDialog: () => void }) {
    const [changePwdForm, setChangePwdForm] = useState<{
        newPassword: string;
        confirmPassword: string;
    }>({
        newPassword: "",
        confirmPassword: "",
    });

    // hook for the update me
    const { mutate: updateMe } = useUpdateMe();

    const handleChangePwd = () => {
        if (changePwdForm.newPassword !== changePwdForm.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (!validationUtils.password(changePwdForm.newPassword)) {
            toast.error(
                `Password must be between ${VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH} 
                and ${VALIDATION_CONSTANTS.PASSWORD_MAX_LENGTH} characters`
            );
            return;
        }

        updateMe({ password: changePwdForm.newPassword });
        toast.success("Password updated successfully");
        closeDialog();
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
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <div className="grid gap-4 py-4">
                    <div className="grid gap-3">
                        <Label htmlFor="newPassword">New password</Label>
                        <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            value={changePwdForm.newPassword}
                            onChange={(e) => {
                                setChangePwdForm({
                                    ...changePwdForm,
                                    newPassword: e.target.value,
                                });
                            }}
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
                            value={changePwdForm.confirmPassword}
                            onChange={(e) => {
                                setChangePwdForm({
                                    ...changePwdForm,
                                    confirmPassword: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleChangePwd}>
                        Save changes
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
