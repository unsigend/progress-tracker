// import dependencies
import { useNavigate } from "react-router";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

// import shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

// import icons
import { Plus } from "lucide-react";

// import types
import { type StatisticsRecordingResponseDto } from "@/lib/api/api";

// import utils
import dateUtils from "@/lib/utils/date";

const DailySummaryCard = ({
    readingStatistics,
    isLoading,
}: {
    readingStatistics: StatisticsRecordingResponseDto;
    isLoading: boolean;
}) => {
    // use the go navigation hook
    const navigate = useNavigate();

    const totalPages =
        readingStatistics?.recordings?.reduce(
            (sum, recording) => sum + recording.pages,
            0
        ) ?? 0;

    const totalMinutes =
        readingStatistics?.recordings?.reduce(
            (sum, recording) => sum + recording.minutes,
            0
        ) ?? 0;

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
                <CardTitle className="text-lg font-semibold flex items-center justify-between">
                    Daily Summary
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                            navigate(
                                ROUTES_CONSTANTS.DASHBOARD()
                                    .READING()
                                    .RECORDINGS_NEW()
                            )
                        }
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
                {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                        <Spinner className="size-8" />
                    </div>
                ) : (
                    <div className="space-y-6">
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
                            <div className="flex items-baseline gap-1">
                                <p className="text-3xl font-bold text-foreground">
                                    {totalPages}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    pages
                                </p>
                            </div>
                        </div>

                        {/* Separator */}
                        <div className="border-t border-border"></div>

                        {/* Time Spent */}
                        <div className="space-y-2">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                Time Spent
                            </p>
                            <div className="flex items-baseline gap-1">
                                <p className="text-3xl font-bold text-foreground">
                                    {dateUtils.formatTime(totalMinutes).value}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {dateUtils.formatTime(totalMinutes).unit}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default DailySummaryCard;
