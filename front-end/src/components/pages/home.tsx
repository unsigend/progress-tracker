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

const Home = () => {
    return (
        <div className="container mx-auto w-[60%] px-6 py-16">
            <div className="flex flex-row items-center justify-between gap-2">
                <div className="flex-1 max-w-lg">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Progress tracking made simple
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        Track your goals, monitor your achievements, and
                        visualize your growth. Built for individuals who want to
                        stay motivated and see real progress in their personal
                        and professional journey.
                    </p>
                </div>
                <div className="flex-1 flex justify-center">
                    <img
                        src="/images/Hero.png"
                        alt="Progress tracking hero illustration"
                        className="max-w-md w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
