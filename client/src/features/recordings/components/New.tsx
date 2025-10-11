// import dependencies
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { format } from "date-fns";

// import shadcn/ui components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Spinner } from "@/components/ui/spinner";
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
import BackLink from "@/components/common/BackButton";
import TimePicker from "@/components/common/TimePicker";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

// import types
import type { RecordingCreateDto, UserBooksResponseDto } from "@/lib/api/api";

/**
 * RecordingNewCard component
 * @returns RecordingNewCard component
 */
const RecordingNewCard = ({
    formData,
    setFormData,
    onSubmit,
    userBooks,
    isLoading,
    userBookId,
    setUserBookId,
}: {
    formData: RecordingCreateDto;
    setFormData: React.Dispatch<React.SetStateAction<RecordingCreateDto>>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    userBooks: UserBooksResponseDto;
    isLoading: boolean;
    userBookId: string;
    setUserBookId: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const navigate = useNavigate();

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

        const parseTime = (timeStr: string) => {
            const [time, period] = timeStr.split(" ");
            const [hour, minute] = time.split(":").map(Number);

            let hour24 = hour;
            if (period === "AM" && hour === 12) {
                hour24 = 0;
            } else if (period === "PM" && hour !== 12) {
                hour24 = hour + 12;
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
                    <BackLink onClick={() => navigate(-1)} />
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
                        {isLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <Spinner className="size-6" />
                            </div>
                        ) : (
                            <Select
                                value={userBookId || ""}
                                onValueChange={(value) => setUserBookId(value)}
                            >
                                <SelectTrigger
                                    id="book-select"
                                    className="w-full"
                                >
                                    <SelectValue placeholder="Choose a book to read">
                                        {userBookId &&
                                        userBooks &&
                                        userBooks.books &&
                                        userBooks.books.length > 0
                                            ? (() => {
                                                  const selectedBook =
                                                      userBooks.books.find(
                                                          (item) =>
                                                              item.userBook
                                                                  ?.id ===
                                                              userBookId
                                                      );
                                                  return selectedBook?.book ? (
                                                      <div className="flex flex-col text-left">
                                                          <span className="font-medium">
                                                              {selectedBook.book.title.includes(
                                                                  ":"
                                                              )
                                                                  ? selectedBook.book.title.split(
                                                                        ":"
                                                                    )[0]
                                                                  : selectedBook
                                                                        .book
                                                                        .title}
                                                          </span>
                                                          <span className="text-xs text-muted-foreground">
                                                              by{" "}
                                                              {
                                                                  selectedBook
                                                                      .book
                                                                      .author
                                                              }
                                                          </span>
                                                      </div>
                                                  ) : null;
                                              })()
                                            : null}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {userBooks &&
                                    userBooks.books &&
                                    userBooks.books.length > 0 ? (
                                        userBooks.books.map((item) => {
                                            if (!item.book || !item.userBook)
                                                return null;
                                            return (
                                                <SelectItem
                                                    key={item.userBook.id}
                                                    value={item.userBook.id}
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">
                                                            {item.book.title.includes(
                                                                ":"
                                                            )
                                                                ? item.book.title.split(
                                                                      ":"
                                                                  )[0]
                                                                : item.book
                                                                      .title}
                                                        </span>
                                                        <span className="text-xs text-left text-muted-foreground">
                                                            by{" "}
                                                            {item.book.author}
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            );
                                        })
                                    ) : (
                                        <SelectItem value="no-books" disabled>
                                            No books found - add book first
                                        </SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        )}
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
                            Reading Time (Optional)
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
                                isLoading ||
                                !userBooks ||
                                !userBooks.books ||
                                userBooks.books.length === 0 ||
                                !userBookId ||
                                userBookId === "no-books" ||
                                !pageRange.from ||
                                !pageRange.to ||
                                formData.pages === 0
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
