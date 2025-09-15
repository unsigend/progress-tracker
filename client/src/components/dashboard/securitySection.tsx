import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface SecuritySectionProps {
    onLogout: () => void;
}

const SecuritySection = ({ onLogout }: SecuritySectionProps) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <h3 className="font-medium text-gray-900">Password</h3>
                    <p className="text-sm text-gray-500">
                        Last updated 3 months ago
                    </p>
                </div>
                <Button variant="outline" size="sm">
                    Change password
                </Button>
            </div>

            <div className="pt-4 border-t">
                <Button
                    variant="destructive"
                    className="w-full"
                    onClick={onLogout}
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                </Button>
            </div>
        </div>
    );
};

export default SecuritySection;
