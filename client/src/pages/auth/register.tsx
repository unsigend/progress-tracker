import { useState } from "react";
import RegisterForm from "@/components/auth/registerForm";
import AuthLayout from "@/layout/auth/authLayout";
import ChartContainer from "@/components/auth/chartContainer";
import graphData from "@/data/auth/graphData";
import type { CreateUserDto } from "@/api/api";

const RegisterPage = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [formData, setFormData] = useState<CreateUserDto>({
        email: "",
        password: "",
        name: "",
    });

    const currentGraphData = graphData[currentStep - 1];

    const leftContent = (
        <ChartContainer
            title={currentGraphData.title}
            primaryMetric={currentGraphData.incremental1}
            secondaryMetric={currentGraphData.incremental2}
            chart={currentGraphData.component({
                chartData: currentGraphData.chartData,
            })}
        />
    );

    return (
        <AuthLayout leftContent={leftContent}>
            <RegisterForm
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                formData={formData}
                setFormData={setFormData}
            />
        </AuthLayout>
    );
};

export default RegisterPage;
