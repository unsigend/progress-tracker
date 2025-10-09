// import dependencies
import { useState } from "react";
import { Link } from "react-router";

// import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldContent,
    FieldLabel,
    FieldDescription,
    FieldGroup,
    FieldSeparator,
} from "@/components/ui/field";

// import components
import StepIndicator from "@/features/auth/components/StepIndicator";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

// import data
import steps from "@/features/auth/data/steps";
import type { StepData } from "@/features/auth/data/steps";

const RegisterForm = ({
    currentStep,
    setCurrentStep,
}: {
    currentStep: number;
    setCurrentStep: (step: number) => void;
}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
    });

    const currentStepData: StepData = steps[currentStep - 1];

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleNextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        } else {
            // TODO: Handle form submission
            console.log("Form submitted:", formData);
        }
    };

    const handleInputChange =
        (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({
                ...prev,
                [field]: e.target.value,
            }));
        };

    const handleOAuthLogin = (provider: "google" | "github") => {
        // TODO: Handle OAuth login
        console.log(`OAuth login with ${provider}`);
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-8">
            {/* Step Indicator */}
            <StepIndicator
                currentStep={currentStep}
                totalSteps={steps.length}
            />

            {/* Header */}
            <div className="text-center space-y-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-foreground transition-all duration-300">
                        {currentStepData?.title}
                    </h1>
                    <Button
                        variant="link"
                        className="text-sm cursor-pointer p-0 h-auto"
                    >
                        <Link to={ROUTES_CONSTANTS.AUTH().LOGIN()}>Login</Link>
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground transition-all duration-300 text-left">
                    {currentStepData?.description}
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleNextStep();
                }}
                className="space-y-6"
            >
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor={currentStepData?.field}>
                            {currentStepData?.field.charAt(0).toUpperCase() +
                                currentStepData?.field.slice(1)}
                        </FieldLabel>
                        <FieldContent>
                            <Input
                                id={currentStepData?.field}
                                type={currentStepData?.type}
                                placeholder={currentStepData?.placeholder}
                                value={
                                    formData[
                                        currentStepData?.field as keyof typeof formData
                                    ] || ""
                                }
                                onChange={handleInputChange(
                                    currentStepData?.field
                                )}
                                autoFocus
                                className="transition-all duration-200"
                            />
                            {currentStepData?.hint && (
                                <FieldDescription>
                                    {currentStepData?.hint}
                                </FieldDescription>
                            )}
                        </FieldContent>
                    </Field>
                </FieldGroup>

                {/* Navigation Buttons */}
                <div className="flex gap-3">
                    {currentStep > 1 && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handlePreviousStep}
                            className="flex-1 transition-all duration-200 cursor-pointer"
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        type="submit"
                        className={`transition-all duration-200 ${
                            currentStep === 1 ? "w-full" : "flex-1"
                        } cursor-pointer`}
                    >
                        {currentStepData?.buttonText}
                    </Button>
                </div>
            </form>

            {/* Social Login - Only show on first step */}
            {currentStep === 1 && (
                <div className="space-y-4">
                    <FieldSeparator className="mb-4">
                        Or continue with
                    </FieldSeparator>

                    <div className="space-y-3">
                        <Button
                            variant="outline"
                            className="w-full cursor-pointer"
                            onClick={() => handleOAuthLogin("google")}
                        >
                            <img
                                src="/image/google.svg"
                                alt="Google"
                                className="size-4 mr-2 dark:invert"
                            />
                            Continue with Google
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full cursor-pointer"
                            onClick={() => handleOAuthLogin("github")}
                        >
                            <img
                                src="/image/github.svg"
                                alt="GitHub"
                                className="size-4 mr-2 dark:invert"
                            />
                            Continue with GitHub
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterForm;
