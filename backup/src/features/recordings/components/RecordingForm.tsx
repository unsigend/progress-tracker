// import dependencies
import { Link, useBack } from "@refinedev/core";
import { useState } from "react";
import { format } from "date-fns";

// import shadcn/ui components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// import icons
import {
    BookOpen,
    Calendar as CalendarIcon,
    Clock,
    FileText,
    LibraryBig,
} from "lucide-react";

// import components
import BackButton from "@/components/common/BackButton";
import TimePicker from "@/components/common/TimePicker";

// import types
import type { CreateRecordingDto } from "@/lib/api/api";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

/**
 * RecordingNewCard component
 * @returns RecordingNewCard component
 */
const RecordingNewCard = ({
    formData,
    setFormData,
    onSubmit,
    userBooks,
}: {
    formData: CreateRecordingDto;
    setFormData: React.Dispatch<React.SetStateAction<CreateRecordingDto>>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    userBooks?: Array<{ id: string; title: string; author: string }>;
}) => {
    // get the back function
    const back = useBack();

    // page range state
    const [pageRange, setPageRange] = useState({
        from: "",
        to: "",
    });

    // time range state
    const [timeRange, setTimeRange] = useState({
        from: "",
        to: "",
    });

    // calendar state
    const [calendarOpen, setCalendarOpen] = useState(false);

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            setFormData({
                ...formData,
                date: date.toISOString(),
            });
            setCalendarOpen(false);
        }
    };

    // Calculate pages from range
    const calculatePages = (from: string, to: string) => {
        const fromPage = parseInt(from, 10);
        const toPage = parseInt(to, 10);
        if (fromPage && toPage && toPage >= fromPage) {
            return toPage - fromPage + 1;
        }
        return 0;
    };

    // Calculate minutes from time range
    const calculateMinutes = (fromTime: string, toTime: string) => {
        if (!fromTime || !toTime) return 0;

        // Parse time with AM/PM format (e.g., "11:30 AM", "12:30 PM")
        const parseTime = (timeStr: string) => {
            const [time, period] = timeStr.split(" ");
            const [hour, minute] = time.split(":").map(Number);

            let hour24 = hour;
            if (period === "AM" && hour === 12) {
                hour24 = 0; // 12:xx AM becomes 00:xx
            } else if (period === "PM" && hour !== 12) {
                hour24 = hour + 12; // 1:xx PM becomes 13:xx
            }

            return hour24 * 60 + minute;
        };

        const fromMinutes = parseTime(fromTime);
        const toMinutes = parseTime(toTime);

        if (toMinutes >= fromMinutes) {
            return toMinutes - fromMinutes;
        }
        return 0;
    };

    // Handle page range changes
    const handlePageRangeChange = (field: "from" | "to", value: string) => {
        const newPageRange = { ...pageRange, [field]: value };
        setPageRange(newPageRange);

        const calculatedPages = calculatePages(
            newPageRange.from,
            newPageRange.to
        );
        setFormData({
            ...formData,
            pages: calculatedPages,
        });
    };

    // Handle time range changes
    const handleTimeRangeChange = (field: "from" | "to", value: string) => {
        const newTimeRange = { ...timeRange, [field]: value };
        setTimeRange(newTimeRange);

        const calculatedMinutes = calculateMinutes(
            newTimeRange.from,
            newTimeRange.to
        );
        setFormData({
            ...formData,
            minutes: calculatedMinutes,
        });
    };

    return (
        <Card>
            <CardHeader className="text-center">
                {/* Back Button - Top Left */}
                <div className="flex items-center justify-start mb-2">
                    <BackButton onClick={back} />
                </div>

                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-muted rounded-full">
                        <LibraryBig className="w-8 h-8 text-muted-foreground" />
                    </div>
                </div>
                <CardTitle className="text-2xl font-semibold text-foreground">
                    New Reading Session
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                    Record your reading progress for today
                </p>
            </CardHeader>

            <CardContent>
                <form className="space-y-6" onSubmit={onSubmit}>
                    {/* Book Selection */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="book-select"
                            className="flex items-center gap-2 text-sm font-medium text-foreground"
                        >
                            <BookOpen className="w-4 h-4" />
                            Select Book
                        </Label>
                        <Select
                            value={formData.user_book_id}
                            onValueChange={(value) =>
                                setFormData({
                                    ...formData,
                                    user_book_id: value,
                                })
                            }
                        >
                            <SelectTrigger id="book-select" className="w-full">
                                <SelectValue placeholder="Choose a book to read">
                                    {formData.user_book_id &&
                                    userBooks &&
                                    userBooks.length > 0
                                        ? (() => {
                                              const selectedBook =
                                                  userBooks.find(
                                                      (book) =>
                                                          book.id ===
                                                          formData.user_book_id
                                                  );
                                              return selectedBook ? (
                                                  <div className="flex flex-col text-left">
                                                      <span className="font-medium">
                                                          {selectedBook.title.includes(
                                                              ":"
                                                          )
                                                              ? selectedBook.title.split(
                                                                    ":"
                                                                )[0]
                                                              : selectedBook.title}
                                                      </span>
                                                      <span className="text-xs text-muted-foreground">
                                                          by{" "}
                                                          {selectedBook.author}
                                                      </span>
                                                  </div>
                                              ) : null;
                                          })()
                                        : null}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {userBooks && userBooks.length > 0 ? (
                                    userBooks.map((book) => (
                                        <SelectItem
                                            key={book.id}
                                            value={book.id}
                                        >
                                            <div className="flex flex-col">
                                                <span className="font-medium">
                                                    {book.title.includes(":")
                                                        ? book.title.split(
                                                              ":"
                                                          )[0]
                                                        : book.title}
                                                </span>
                                                <span className="text-xs text-left text-muted-foreground">
                                                    by {book.author}
                                                </span>
                                            </div>
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="no-books" disabled>
                                        No books found - add book first
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Date Selection */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="date-picker"
                            className="flex items-center gap-2 text-sm font-medium text-foreground"
                        >
                            <CalendarIcon className="w-4 h-4" />
                            Reading Date
                        </Label>
                        <Popover
                            open={calendarOpen}
                            onOpenChange={setCalendarOpen}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    id="date-picker"
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.date
                                        ? format(new Date(formData.date), "PPP")
                                        : "Pick a date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={new Date(formData.date)}
                                    onSelect={handleDateSelect}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Pages Range */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <FileText className="w-4 h-4" />
                            Pages Read
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <Label
                                    htmlFor="page-from"
                                    className="text-xs text-muted-foreground"
                                >
                                    From Page
                                </Label>
                                <Input
                                    id="page-from"
                                    type="number"
                                    placeholder="10"
                                    min="1"
                                    value={pageRange.from}
                                    onChange={(e) =>
                                        handlePageRangeChange(
                                            "from",
                                            e.target.value
                                        )
                                    }
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label
                                    htmlFor="page-to"
                                    className="text-xs text-muted-foreground"
                                >
                                    To Page
                                </Label>
                                <Input
                                    id="page-to"
                                    type="number"
                                    placeholder="15"
                                    min="1"
                                    value={pageRange.to}
                                    onChange={(e) =>
                                        handlePageRangeChange(
                                            "to",
                                            e.target.value
                                        )
                                    }
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    Total Pages
                                </Label>
                                <div className="flex items-center h-9 px-3 py-2 border border-input rounded-md bg-muted text-sm text-muted-foreground">
                                    {formData.pages} pages
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Time Range */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <Clock className="w-4 h-4" />
                            Reading Time
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    Start Time
                                </Label>
                                <TimePicker
                                    value={timeRange.from}
                                    onChange={(value) =>
                                        handleTimeRangeChange("from", value)
                                    }
                                    placeholder="Select start time"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    End Time
                                </Label>
                                <TimePicker
                                    value={timeRange.to}
                                    onChange={(value) =>
                                        handleTimeRangeChange("to", value)
                                    }
                                    placeholder="Select end time"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    Duration
                                </Label>
                                <div className="flex items-center h-9 px-3 py-2 border border-input rounded-md bg-muted text-sm text-muted-foreground">
                                    {formData.minutes} minutes
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notes Field */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="notes"
                            className="flex items-center gap-2 text-sm font-medium text-foreground"
                        >
                            <FileText className="w-4 h-4" />
                            Notes (Optional)
                        </Label>
                        <Textarea
                            id="notes"
                            placeholder="Add any thoughts, quotes, or reflections about your reading..."
                            value={formData.notes}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    notes: e.target.value,
                                })
                            }
                            className="w-full min-h-[120px] resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Link
                            to={ROUTES_CONSTANTS.DASHBOARD().READING().HOME()}
                        >
                            <Button
                                type="button"
                                variant="outline"
                                className="px-6"
                            >
                                Cancel
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            className="px-6"
                            disabled={
                                !userBooks ||
                                userBooks.length === 0 ||
                                !formData.user_book_id ||
                                formData.user_book_id === "no-books" ||
                                !pageRange.from ||
                                !pageRange.to ||
                                !timeRange.from ||
                                !timeRange.to ||
                                formData.pages === 0 ||
                                formData.minutes === 0
                            }
                        >
                            Record Session
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default RecordingNewCard;
