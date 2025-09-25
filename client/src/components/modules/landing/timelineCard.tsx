// import shadcn/ui components
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// import icons
import { CheckCircle, Clock } from "lucide-react";

// import data
import type { TimelineItem } from "@/data/landing/devProgress";

/**
 * TimelineCard component
 * @param item - The item to display
 * @returns TimelineCard component
 */
const TimelineCard = ({ item }: { item: TimelineItem }) => {
    return (
        <div className="relative flex items-start">
            <div
                className={`
                    absolute left-6 w-4 h-4 rounded-full border-4 bg-background z-10
                    ${
                        item.status === "completed"
                            ? "border-green-500"
                            : "border-border"
                    }
                `}
            >
                {item.status === "completed" && (
                    <CheckCircle className="w-3 h-3 text-green-500 absolute -top-0.5 -left-0.5" />
                )}
                {item.status === "coming-soon" && (
                    <Clock className="w-3 h-3 text-muted-foreground absolute -top-0.5 -left-0.5" />
                )}
            </div>

            <div className="ml-16 w-full">
                <Card className="border border-border transition-all duration-200 hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                {item.icon}
                                <h3 className="text-xl font-semibold text-foreground">
                                    {item.title}
                                </h3>
                            </div>
                            <Badge
                                variant={
                                    item.status === "completed"
                                        ? "default"
                                        : "secondary"
                                }
                                className={
                                    item.status === "completed"
                                        ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
                                        : "bg-muted text-muted-foreground hover:bg-muted"
                                }
                            >
                                {item.date || "Coming Soon"}
                            </Badge>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">
                            {item.description}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TimelineCard;
