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

/**
 * Change password dialog
 * @returns Change password dialog
 */
export function ChangePwdDialog() {
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Change password</DialogTitle>
                <DialogDescription>
                    Make changes to your password here. Click save when
                    you&apos;re done.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={() => {}}>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-3">
                        <Label htmlFor="newPassword">New password</Label>
                        <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            value={""}
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
                            value={""}
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
