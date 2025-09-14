// import components
import LoginForm from "@/components/auth/loginForm";
import LineChartComponent from "@/components/ui/LineChart";

// import utils
import random from "@/util/random";

// generate random data for the chart
const chartData = Array.from({ length: 8 }, () => ({
    value: random.generateRandomNumber(10, 100),
}));

const LoginPage = () => {
    return (
        <div className="grid md:grid-cols-2 min-h-[600px]">
            {/* Left Side - Progress Chart */}
            <div className="bg-gray-50/50 p-8 flex items-center justify-center">
                <div className="w-full max-w-sm">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-gray-600 text-xl font-medium">
                            Track Your Reading Progress
                        </h2>
                    </div>
                    {/* Main Metric */}
                    <div className="mb-12">
                        <div className="text-4xl font-bold text-gray-900 mb-4 leading-none">
                            +240 min
                        </div>
                        <div className="text-gray-500 text-base">
                            +40% from last week
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <LineChartComponent chartData={chartData} />

                    {/* Additional spacing for balance */}
                    <div className="mt-8"></div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="p-8 flex items-center justify-center">
                <div className="w-full max-w-sm">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
