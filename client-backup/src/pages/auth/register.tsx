// import dependencies
import { useState } from "react";

// import components
import RegisterForm from "@/components/auth/registerForm";
import AuthTemplateLayout from "@/layout/auth/template";
import ChartContainer from "@/components/ui/chartContainer";

// import data
import graphData from "@/data/auth/graphData";

// import types
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

    const rightContent = (
        <RegisterForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            formData={formData}
            setFormData={setFormData}
        />
    );

    return <AuthTemplateLayout left={leftContent} right={rightContent} />;
};

export default RegisterPage;
