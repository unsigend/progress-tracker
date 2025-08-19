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
import { Search, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const searchBarVariants = cva(
    "relative flex items-center w-full rounded-lg border bg-background transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
    {
        variants: {
            variant: {
                default: "border-input hover:border-gray-400",
                ghost: "border-transparent bg-gray-50 hover:bg-gray-100",
                outline: "border-gray-300 shadow-sm",
            },
            size: {
                default: "h-10 px-3",
                sm: "h-8 px-2.5 text-sm",
                lg: "h-12 px-4 text-base",
            },
        },
        defaultVariants: {
            variant: "outline",
            size: "default",
        },
    }
);

interface SearchBarProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
        VariantProps<typeof searchBarVariants> {
    onClear?: () => void;
    showClearButton?: boolean;
    searchIconPosition?: "left" | "right";
    containerClassName?: string;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
    (
        {
            className,
            variant,
            size,
            placeholder = "Search...",
            value,
            onClear,
            showClearButton = true,
            searchIconPosition = "left",
            containerClassName,
            ...props
        },
        ref
    ) => {
        const hasValue = value && value.toString().length > 0;

        return (
            <div
                className={cn(
                    searchBarVariants({ variant, size }),
                    containerClassName
                )}
            >
                {searchIconPosition === "left" && (
                    <Search className="absolute left-3 h-4 w-4 text-gray-500" />
                )}

                <input
                    ref={ref}
                    type="text"
                    className={cn(
                        "flex-1 bg-transparent outline-none placeholder:text-gray-500",
                        searchIconPosition === "left" ? "pl-9" : "pl-0",
                        hasValue &&
                            showClearButton &&
                            searchIconPosition === "right"
                            ? "pr-16"
                            : hasValue && showClearButton
                            ? "pr-9"
                            : searchIconPosition === "right"
                            ? "pr-9"
                            : "pr-3",
                        className
                    )}
                    placeholder={placeholder}
                    value={value}
                    {...props}
                />

                {searchIconPosition === "right" && (
                    <Search className="absolute right-3 h-4 w-4 text-gray-500" />
                )}

                {hasValue && showClearButton && (
                    <button
                        type="button"
                        onClick={() => {
                            onClear?.();
                        }}
                        className={cn(
                            "absolute h-4 w-4 text-gray-500 hover:text-gray-700 transition-colors",
                            searchIconPosition === "right"
                                ? "right-9"
                                : "right-3"
                        )}
                        aria-label="Clear search"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        );
    }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
