// import dependencies
import { useState } from "react";

// import shadcn/ui components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

// import components
import DeleteDialog from "@/components/common/DeleteDialog";

// import icons
import { Calendar, BookOpen, GitMerge } from "lucide-react";

// import types
import type { RecordingResponseDto } from "@/lib/api/api";

// import utils
import dateUtils from "@/lib/utils/date";

const RecordingList = ({
    recordings,
    isLoading = false,
    onDelete,
}: {
    recordings: RecordingResponseDto[];
    isLoading: boolean;
    onDelete: () => void;
}) => {
    const [showAutoMergeDialog, setShowAutoMergeDialog] = useState(false);

    const formatTime = (minutes: number) => {
        const hours = minutes / 60;
        return hours >= 1 ? `${hours.toFixed(1)}h` : `${minutes}m`;
    };

    const handleAutoMerge = () => {
        onDelete();
        setShowAutoMergeDialog(false);
        toast.success("Recordings Merged successfully");
    };

    return (
        <Card className="min-h-[300px] mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Reading Recordings
                </CardTitle>
                <AlertDialog
                    open={showAutoMergeDialog}
                    onOpenChange={setShowAutoMergeDialog}
                >
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                            <GitMerge className="h-4 w-4" />
                            Auto Merge
                        </Button>
                    </AlertDialogTrigger>
                </AlertDialog>

                <DeleteDialog
                    open={showAutoMergeDialog}
                    onOpenChange={setShowAutoMergeDialog}
                    title="Auto Merge"
                    description="Are you sure you want to perform an auto merge? This action will automatically merge the current recordings with the latest data."
                    onConfirm={handleAutoMerge}
                    confirmText="Confirm"
                    cancelText="Cancel"
                />
            </CardHeader>
            {isLoading ? (
                <CardContent>
                    <div className="flex justify-center py-8">
                        <Spinner className="size-8" />
                    </div>
                </CardContent>
            ) : recordings.length === 0 ? (
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">
                            No recordings found
                        </p>
                        <p className="text-sm">
                            Start reading to see your progress here
                        </p>
                    </div>
                </CardContent>
            ) : (
                <CardContent className="p-0 sm:p-6">
                    <div className="overflow-hidden rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Pages</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Notes</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recordings.map((recording) => (
                                    <TableRow
                                        key={recording.id}
                                        className="hover:bg-muted/50"
                                    >
                                        <TableCell className="font-medium">
                                            {dateUtils.formatDate(
                                                recording.date
                                            )}
                                        </TableCell>
                                        <TableCell>{recording.pages}</TableCell>
                                        <TableCell>
                                            {formatTime(recording.minutes) !==
                                            "0m"
                                                ? formatTime(recording.minutes)
                                                : "N/A"}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {recording.notes &&
                                            Object.keys(recording.notes)
                                                .length > 0 ? (
                                                JSON.stringify(recording.notes)
                                            ) : (
                                                <span className="italic opacity-50">
                                                    No notes
                                                </span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            )}
        </Card>
    );
};

export default RecordingList;
