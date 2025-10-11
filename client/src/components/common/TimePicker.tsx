// import dependencies
import { useState } from "react";

// import shadcn/ui components
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// import icons
import { Clock, ChevronDown } from "lucide-react";

interface TimePickerProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

const TimePicker = ({ value, onChange, placeholder }: TimePickerProps) => {
    const [hours, setHours] = useState("12");
    const [minutes, setMinutes] = useState("00");
    const [period, setPeriod] = useState("PM");
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const formatTime = (h: string, m: string, p: string) => {
        return `${h.padStart(2, "0")}:${m.padStart(2, "0")} ${p}`;
    };

    const handleTimeChange = (h: string, m: string, p: string) => {
        const timeString = `${h.padStart(2, "0")}:${m.padStart(2, "0")} ${p}`;
        onChange(timeString);
    };

    return (
        <div className="relative">
            <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                onClick={toggleOpen}
                type="button"
            >
                <Clock className="mr-2 h-4 w-4" />
                {value ? formatTime(hours, minutes, period) : placeholder}
                <ChevronDown className="ml-auto h-4 w-4" />
            </Button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-md shadow-lg z-50 p-4 min-w-[320px]">
                    <div className="grid grid-cols-3 gap-3">
                        {/* Hours */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="time-hours"
                                className="text-xs text-muted-foreground"
                            >
                                Hour
                            </Label>
                            <Select
                                value={hours}
                                onValueChange={(val) => {
                                    setHours(val);
                                    handleTimeChange(val, minutes, period);
                                }}
                            >
                                <SelectTrigger
                                    id="time-hours"
                                    className="h-9 w-full min-w-[80px]"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="min-w-[80px]">
                                    {Array.from(
                                        { length: 12 },
                                        (_, i) => i + 1
                                    ).map((num) => (
                                        <SelectItem
                                            key={num}
                                            value={num.toString()}
                                        >
                                            {num.toString().padStart(2, "0")}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Minutes */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="time-minutes"
                                className="text-xs text-muted-foreground"
                            >
                                Min
                            </Label>
                            <Select
                                value={minutes}
                                onValueChange={(val) => {
                                    setMinutes(val);
                                    handleTimeChange(hours, val, period);
                                }}
                            >
                                <SelectTrigger
                                    id="time-minutes"
                                    className="h-9 w-full min-w-[80px]"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="min-w-[80px]">
                                    {Array.from(
                                        { length: 60 },
                                        (_, i) => i
                                    ).map((num) => (
                                        <SelectItem
                                            key={num}
                                            value={num
                                                .toString()
                                                .padStart(2, "0")}
                                        >
                                            {num.toString().padStart(2, "0")}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* AM/PM */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="time-period"
                                className="text-xs text-muted-foreground"
                            >
                                Period
                            </Label>
                            <Select
                                value={period}
                                onValueChange={(val) => {
                                    setPeriod(val);
                                    handleTimeChange(hours, minutes, val);
                                }}
                            >
                                <SelectTrigger
                                    id="time-period"
                                    className="h-9 w-full min-w-[80px]"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="min-w-[80px]">
                                    <SelectItem value="AM">AM</SelectItem>
                                    <SelectItem value="PM">PM</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimePicker;
