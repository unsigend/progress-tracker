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

import { Link } from "react-router-dom";

interface BookCardProps {
    imageURL: string;
    link: string;
    className?: string;
}

const BookCard = ({ imageURL, link, className = "" }: BookCardProps) => {
    return (
        <Link
            to={link}
            className={`group block transition-all duration-200 hover:scale-102 hover:-translate-y-0.5 ${className}`}
        >
            <div className="relative w-40 h-52 bg-white rounded-sm shadow-sm hover:shadow-md transition-all duration-200">
                {/* Book Cover Image Only */}
                <img
                    src={imageURL}
                    alt="Book cover"
                    className="w-full h-full object-cover rounded-sm"
                />

                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-sm" />
            </div>
        </Link>
    );
};

export default BookCard;
