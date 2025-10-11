// import dependencies
import { useState } from "react";

// import layout
import AuthLayout from "@/features/auth/layouts/template";

// import constants
import VALIDATION_CONSTANTS from "@/lib/constants/validation";

// import components
import ChartContainer from "@/features/auth/components/ChartContainer";
import RegisterForm from "@/features/auth/components/RegisterForm";

// import shadcn/ui components
import { toast } from "sonner";

// import data
import graphData from "@/features/auth/data/graph";
import steps from "@/features/auth/data/steps";

// import types
import type { RegisterRequestDto } from "@/lib/api/api";

// import hooks
import { useEmailCheck } from "@/hooks/use-auth";
import { useRegister } from "@/hooks/use-auth";

// import utils
import errorUtils from "@/lib/utils/error";
import validationUtils from "@/lib/utils/validation";

const RegisterPage = () => {
    // state for current step
    const [currentStep, setCurrentStep] = useState<number>(1);
    // state for form data
    const [formData, setFormData] = useState<RegisterRequestDto>({
        email: "",
        password: "",
        username: "",
    });
    // state for email check
    const currentGraphData = graphData[currentStep - 1];

    // hooks
    const { mutate: emailCheck } = useEmailCheck();
    const { mutate: register } = useRegister();

    const handlePreviousStep = () => {
        // go to the previous step
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleNextStep = async () => {
        if (steps[currentStep - 1].field === "email") {
            // validate the email
            if (!validationUtils.email(formData.email)) {
                toast.error("Invalid email address");
                return;
            }
            emailCheck(formData.email, {
                onSuccess: (exists: boolean) => {
                    if (exists) {
                        toast.error("Email already exists");
                    } else {
                        setCurrentStep(currentStep + 1);
                    }
                },
                onError: (error) => {
                    toast.error(errorUtils.extractErrorMessage(error));
                },
            });
            return;
        } else if (steps[currentStep - 1].field === "password") {
            // validate the password
            if (!validationUtils.password(formData.password)) {
                toast.error(
                    `Password must be between ${VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH} 
                    and ${VALIDATION_CONSTANTS.PASSWORD_MAX_LENGTH} characters`
                );
                return;
            }
            setCurrentStep(currentStep + 1);
        } else if (steps[currentStep - 1].field === "username") {
            // validate the username
            if (!validationUtils.username(formData.username)) {
                toast.error(
                    `Username must be between ${VALIDATION_CONSTANTS.USERNAME_MIN_LENGTH} 
                    and ${VALIDATION_CONSTANTS.USERNAME_MAX_LENGTH} characters`
                );
                return;
            }
            register(formData);
        }
    };

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
                    stepData={steps[currentStep - 1]}
                    currentStep={currentStep}
                    formData={formData}
                    setFormData={setFormData}
                    handleNextStep={handleNextStep}
                    handlePreviousStep={handlePreviousStep}
                />
            }
        />
    );
};

export default RegisterPage;
