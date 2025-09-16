// Reusable "Coming Soon" placeholder component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

interface ComingSoonProps {
    feature: string;
    description?: string;
}

/**
 * Placeholder component for features not yet implemented
 * Provides better UX than empty pages
 */
const ComingSoon = ({ feature, description }: ComingSoonProps) => {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="mx-auto mb-4 p-3 bg-gray-100 rounded-full w-fit">
                        <Construction className="w-8 h-8 text-gray-600" />
                    </div>
                    <CardTitle className="text-xl">
                        {feature} Coming Soon
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600">
                        {description || `We're working hard to bring you the ${feature.toLowerCase()} feature. Stay tuned for updates!`}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default ComingSoon;