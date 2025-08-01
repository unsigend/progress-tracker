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

import React from "react";

interface FeatureBarProps {
    icon: React.ReactNode;
    title: string;
    text: string;
}

const FeatureCard = ({ icon: Icon, title, text }: FeatureBarProps) => {
    return (
        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4">
            {/* Icon Container */}
            <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-full flex items-center justify-center">
                    {Icon}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {text}
                </p>
            </div>
        </div>
    );
};

export default FeatureCard;
