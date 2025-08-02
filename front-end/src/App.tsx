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

// router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// layouts
import MainLayout from "@/components/layout/main";
import DashboardLayout from "@/components/layout/dashboard";

// landing pages
import LandingHome from "@/components/pages/landing/home";
import LandingAbout from "@/components/pages/landing/about";

// dashboard pages
import DashboardHome from "@/components/pages/dashboard/home";
import DashboardBookLibrary from "@/components/pages/dashboard/bookLibrary";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Main Layout */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<LandingHome />} />
                    <Route path="about" element={<LandingAbout />} />
                </Route>

                {/* Dashboard Layout */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardHome />} />
                    <Route
                        path="book-library"
                        element={<DashboardBookLibrary />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
