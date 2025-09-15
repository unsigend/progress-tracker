// import dependencies
import { useState } from "react";

// import components
import RegisterForm from "@/components/auth/registerForm";

// import data
import graphData from "@/data/auth/graphData";

// import types
import type { RegisterDto } from "@/api/api";

const RegisterPage = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [formData, setFormData] = useState<RegisterDto>({
        email: "",
        password: "",
        name: "",
    });

    return (
        <div className="grid md:grid-cols-2 min-h-[600px]">
            {/* Left Side - Progress Chart */}
            {/* Graph Data rendered dynamically based on the current step */}
            <div className="bg-gray-50/50 p-8 flex items-center justify-center">
                <div className="w-full max-w-sm">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-gray-600 text-xl font-medium">
                            {graphData[currentStep - 1].title}
                        </h2>
                    </div>
                    {/* Main Metric */}
                    <div className="mb-12">
                        <div className="text-4xl font-bold text-gray-900 mb-4 leading-none">
                            {graphData[currentStep - 1].incremental1}
                        </div>
                        <div className="text-gray-500 text-base">
                            {graphData[currentStep - 1].incremental2}
                        </div>
                    </div>

                    {/* Pie Chart */}
                    {graphData[currentStep - 1].component({
                        chartData: graphData[currentStep - 1].chartData,
                    })}

                    {/* Additional spacing for balance */}
                    <div className="mt-8"></div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="p-8 flex items-center justify-center">
                <div className="w-full max-w-sm">
                    <RegisterForm
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                        formData={formData}
                        setFormData={setFormData}
                    />
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
