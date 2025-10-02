// import shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DailySummary = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    Daily Summary
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6 py-4">
                    {/* Date */}
                    <div>
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                            {new Date()
                                .toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })
                                .toUpperCase()}
                        </p>
                    </div>

                    {/* Pages Read */}
                    <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Pages Read
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                            100
                        </p>
                    </div>

                    {/* Separator */}
                    <div className="border-t border-border"></div>

                    {/* Time Spent */}
                    <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Time Spent
                        </p>
                        <p className="text-3xl font-bold text-foreground">70</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default DailySummary;
