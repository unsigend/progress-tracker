/**
 * MIT License
 *
 * Copyright (c) 2025 Qiu Yixiang
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import * as React from "react";
import { AlertTriangle, RefreshCw, XCircle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const errorMessageVariants = cva(
    "flex flex-col items-center justify-center space-y-4 p-8 rounded-lg border",
    {
        variants: {
            variant: {
                default: "bg-red-50 border-red-200 text-red-800",
                outline: "bg-background border-red-200 text-red-600",
                subtle: "bg-gray-50 border-gray-200 text-gray-700",
            },
            size: {
                default: "min-h-[200px]",
                sm: "min-h-[120px] p-6",
                lg: "min-h-[300px] p-12",
                full: "h-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const iconVariants = cva("", {
    variants: {
        variant: {
            default: "text-red-500",
            outline: "text-red-500",
            subtle: "text-gray-500",
        },
        size: {
            default: "w-12 h-12",
            sm: "w-8 h-8",
            lg: "w-16 h-16",
            full: "w-12 h-12",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

interface ErrorMessageProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof errorMessageVariants> {
    title?: string;
    message: string;
    icon?: "alert" | "x-circle" | "refresh";
    showRetry?: boolean;
    onRetry?: () => void;
    retryText?: string;
}

const ErrorMessage = React.forwardRef<HTMLDivElement, ErrorMessageProps>(
    (
        {
            className,
            variant,
            size,
            title = "Something went wrong",
            message,
            icon = "alert",
            showRetry = false,
            onRetry,
            retryText = "Try again",
            ...props
        },
        ref
    ) => {
        const IconComponent = {
            alert: AlertTriangle,
            "x-circle": XCircle,
            refresh: RefreshCw,
        }[icon];

        return (
            <div
                ref={ref}
                className={cn(
                    errorMessageVariants({ variant, size, className })
                )}
                role="alert"
                aria-live="polite"
                {...props}
            >
                <IconComponent
                    className={cn(iconVariants({ variant, size }))}
                />

                <div className="text-center space-y-2">
                    <h3 className="font-semibold text-lg">{title}</h3>
                    <p className="text-sm opacity-90 max-w-md mx-auto leading-relaxed">
                        {message}
                    </p>
                </div>

                {showRetry && onRetry && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onRetry}
                        className="mt-2"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        {retryText}
                    </Button>
                )}
            </div>
        );
    }
);

ErrorMessage.displayName = "ErrorMessage";

export default ErrorMessage;
