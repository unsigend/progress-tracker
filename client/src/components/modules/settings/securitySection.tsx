// import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

// import components
import { ChangePwdDialog } from "@/components/modules/settings/changePwdDialog";

// import icons
import { KeyRound, LogOut } from "lucide-react";

// import dependencies
import { useLogout } from "@refinedev/core";
import { useState } from "react";

/**
 * SecuritySection component
 * @returns The SecuritySection component
 */
const SecuritySection = () => {
    // get the logout function
    const { mutate: logout, isPending } = useLogout();
    const [isChangePwdDialogOpen, setIsChangePwdDialogOpen] =
        useState<boolean>(false);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <KeyRound className="w-5 h-5" />
                    Security
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <h3 className="font-medium text-foreground">
                                Password
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                reset your password
                            </p>
                        </div>

                        {/* Change password dialog */}
                        <Dialog
                            open={isChangePwdDialogOpen}
                            onOpenChange={setIsChangePwdDialogOpen}
                        >
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    Change password
                                </Button>
                            </DialogTrigger>
                            <ChangePwdDialog
                                closeDialog={() =>
                                    setIsChangePwdDialogOpen(false)
                                }
                            />
                        </Dialog>
                    </div>

                    {/* Sign out button */}
                    <div className="pt-4 border-t">
                        <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => {
                                logout();
                            }}
                            disabled={isPending}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign out
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SecuritySection;
