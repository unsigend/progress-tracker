// import dependencies
import { useState } from "react";

// import layout
import AuthLayout from "@/components/layout/auth/template";

// import components
import ChartContainer from "@/components/charts/ChartContainer";
import RegisterForm from "../components/registerForm";

// import data
import graphData from "@/data/auth/graphData";

const RegisterPage = () => {
    // state for current step
    const [currentStep, setCurrentStep] = useState<number>(1);

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
        />
    );

    return <AuthLayout left={leftContent} right={rightContent} />;
};

export default RegisterPage;
