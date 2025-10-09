// import dependencies
import { useState } from "react";

// import layout
import AuthLayout from "@/features/auth/layouts/template";

// import components
import ChartContainer from "@/features/auth/components/ChartContainer";
import RegisterForm from "@/features/auth/components/RegisterForm";

// import data
import graphData from "@/features/auth/data/graph";

const RegisterPage = () => {
    // state for current step
    const [currentStep, setCurrentStep] = useState<number>(1);
    const currentGraphData = graphData[currentStep - 1];

    return (
        <AuthLayout
            left={
                <ChartContainer
                    title={currentGraphData.title}
                    primaryMetric={currentGraphData.incremental1}
                    secondaryMetric={currentGraphData.incremental2}
                    chart={currentGraphData.component({
                        chartData: currentGraphData.chartData,
                    })}
                />
            }
            right={
                <RegisterForm
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                />
            }
        />
    );
};

export default RegisterPage;
