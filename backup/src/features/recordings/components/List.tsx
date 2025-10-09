// import dependencies
import { ClipLoader } from "react-spinners";
import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// import icons
import { ArrowUpDown, Calendar, BookOpen, GitMerge } from "lucide-react";

// import types
import type { RecordingResponseDto } from "@/lib/api/api";

// Define the recording type for the table
type Recording = RecordingResponseDto;

// Define columns for the data table
const columns: ColumnDef<Recording>[] = [
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Date
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("date"));
            const datePart = date.toISOString().split("T")[0];
            const [year, month, day] = datePart.split("-");
            const dateObj = new Date(
                Number(year),
                Number(month) - 1,
                Number(day)
            );
            return (
                <div className="text-left pl-3">
                    {dateObj.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </div>
            );
        },
    },
    {
        accessorKey: "pages",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Pages
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => {
            const pages = row.getValue("pages") as number;
            return <div className="text-left pl-3">{pages}</div>;
        },
    },
    {
        accessorKey: "minutes",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Time
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => {
            const minutes = row.getValue("minutes") as number;
            const hours = minutes / 60;
            const formatted =
                hours >= 1 ? `${hours.toFixed(1)}h` : `${minutes}m`;
            return <div className="text-left pl-3">{formatted}</div>;
        },
    },
    {
        accessorKey: "notes",
        header: "Notes",
        cell: ({ row }) => {
            const notes = row.getValue("notes") as string;
            return (
                <div className="text-muted-foreground">
                    {notes || (
                        <span className="italic opacity-50">No notes</span>
                    )}
                </div>
            );
        },
    },
];

interface RecordingListProps {
    recordings: Recording[];
    isLoading?: boolean;
    onSafeMerge?: () => void;
}

const RecordingList = ({
    recordings,
    isLoading = false,
    onSafeMerge,
}: RecordingListProps) => {
    const [sorting, setSorting] = React.useState<SortingState>([
        { id: "date", desc: true },
    ]);

    const table = useReactTable({
        data: recordings,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Reading Recordings
                    </CardTitle>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                            >
                                <GitMerge className="h-4 w-4" />
                                Safe Merge
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Safe Merge</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to perform a safe
                                    merge? This action will merge the current
                                    recordings with the latest data.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => {
                                        onSafeMerge?.();
                                    }}
                                >
                                    Confirm
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardHeader>
            {isLoading ? (
                <CardContent>
                    <div className="flex justify-center py-8">
                        <ClipLoader size={40} color="hsl(var(--primary))" />
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
                        {/* Table */}
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column
                                                                  .columnDef
                                                                  .header,
                                                              header.getContext()
                                                          )}
                                                </TableHead>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={
                                                row.getIsSelected() &&
                                                "selected"
                                            }
                                            className="hover:bg-muted/50 h-14"
                                        >
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            )}
        </Card>
    );
};

export default RecordingList;
