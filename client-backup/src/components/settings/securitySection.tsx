// import dependencies
import { useNavigate } from "react-router";
import { useState } from "react";

// import components
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { LogOut } from "lucide-react";
import { ChangePwdDialog } from "@/components/settings/changePwdDialog";

// import hooks
import { useLogout } from "@/hooks/useAuth";

// import constants
import ROUTES from "@/constants/routes";

const SecuritySection = () => {
    // navigate
    const navigate = useNavigate();

    // dialog state
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // logout mutation
    const { mutate } = useLogout();

    const handleLogout = () => {
        mutate();

        // redirect to login page
        navigate(ROUTES.LOGIN);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <h3 className="font-medium text-gray-900">Password</h3>
                    <p className="text-sm text-gray-500">reset your password</p>
                </div>
                {/* Change password dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Change password</Button>
                    </DialogTrigger>
                    <ChangePwdDialog onClose={handleCloseDialog} />
                </Dialog>
            </div>

            {/* Sign out button */}
            <div className="pt-4 border-t">
                <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                </Button>
            </div>
        </div>
    );
};

export default SecuritySection;
