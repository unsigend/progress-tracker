// import components
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ChangePwdDialog } from "@/components/modules/settings/changePwdDialog";

// import icons
import { LogOut } from "lucide-react";

const SecuritySection = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <h3 className="font-medium text-gray-900">Password</h3>
                    <p className="text-sm text-gray-500">reset your password</p>
                </div>
                {/* Change password dialog */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Change password</Button>
                    </DialogTrigger>
                    <ChangePwdDialog />
                </Dialog>
            </div>

            {/* Sign out button */}
            <div className="pt-4 border-t">
                <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => {}}
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                </Button>
            </div>
        </div>
    );
};

export default SecuritySection;
