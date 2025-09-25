// import components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StepIndicator from "@/components/modules/auth/stepIndicator";
import Divider from "@/components/modules/ui/Divider";

// import data
import steps from "@/data/auth/stepData";

// import dependencies
import { Link, useRegister } from "@refinedev/core";
import { useState } from "react";

// import constants
import ROUTES_CONSTANTS from "@/constants/routes";
import VALIDATION_CONSTANTS from "@/constants/validation";

// import types
import type { EmailCheckResponseDto, RegisterUserDto } from "@/api/api";

// import hooks
import { useEmailCheck } from "@/hooks/use-email-check";
import { useOAuthLogin } from "@/hooks/use-oauth";

// import utils
import { validationUtils } from "@/utils/validation";
import { toast } from "sonner";

/**
 * Register form component
 * @param currentStep: current step
 * @param setCurrentStep: set current step
 * @param formData: form data
 * @param setFormData: set form data
 * @returns Register form component
 */
const RegisterForm = ({
    currentStep,
    setCurrentStep,
}: {
    currentStep: number;
    setCurrentStep: (step: number) => void;
}) => {
    const { login: loginWithOAuth } = useOAuthLogin();
    const [formData, setFormData] = useState<RegisterUserDto>({
        email: "",
        password: "",
        username: "",
    });

    // setup mutation hooks
    const { mutate: register } = useRegister();
    const { mutate: checkEmail } = useEmailCheck();

    const currentStepData = steps[currentStep - 1];

    /**
     * Handle previous step
     * @returns void
     */
    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    /**
     * Handle next step with validation
     * @returns void
     */
    const handleNextStep = () => {
        if (currentStep !== steps.length) {
            if (steps[currentStep - 1].field === "email") {
                if (!validationUtils.email(formData.email)) {
                    toast.error("Invalid email format");
                    return;
                } else {
                    checkEmail(formData.email, {
                        onSuccess: (response: EmailCheckResponseDto) => {
                            if (response.exists) {
                                toast.error("Email already exists");
                                return;
                            }
                            setCurrentStep(currentStep + 1);
                        },
                        onError: () => {
                            toast.error("Failed to check email");
                        },
                    });
                }
            } else if (steps[currentStep - 1].field === "password") {
                if (!validationUtils.password(formData.password)) {
                    toast.error(
                        `Password must between ${VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH}
                         and ${VALIDATION_CONSTANTS.PASSWORD_MAX_LENGTH} characters long`
                    );
                    return;
                } else {
                    setCurrentStep(currentStep + 1);
                }
            } else if (steps[currentStep - 1].field === "username") {
                if (!validationUtils.username(formData.username)) {
                    toast.error(
                        `Username must between ${VALIDATION_CONSTANTS.USERNAME_MIN_LENGTH}
                         and ${VALIDATION_CONSTANTS.USERNAME_MAX_LENGTH} characters long`
                    );
                    return;
                }
                setCurrentStep(currentStep + 1);
            }
        } else {
            // last step
            register(formData);
        }
    };

    return (
        <div className="w-full space-y-6">
            {/* Step Indicator */}
            <StepIndicator
                currentStep={currentStep}
                totalSteps={steps.length}
            />

            {/* Header */}
            <div className="text-center space-y-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-foreground transition-all duration-300">
                        {steps[currentStep - 1]?.title}
                    </h1>
                    <Button variant="link" className="text-sm cursor-pointer">
                        <Link to={ROUTES_CONSTANTS.AUTH().LOGIN()}>Login</Link>
                    </Button>
                </div>
                <p className="text-sm text-left text-muted-foreground transition-all duration-300">
                    {steps[currentStep - 1]?.description}
                </p>
            </div>

            {/* Form */}
            <div className="transition-all duration-300 ease-in-out">
                <form onSubmit={() => {}} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor={currentStepData?.field}>
                            {currentStepData?.field}
                        </Label>
                        <Input
                            id={currentStepData?.field}
                            type={currentStepData?.type}
                            placeholder={currentStepData?.placeholder}
                            value={
                                formData[
                                    currentStepData?.field as keyof RegisterUserDto
                                ] || ""
                            }
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    [currentStepData?.field]: e.target.value,
                                })
                            }
                            required
                            autoFocus
                            className="transition-all duration-200"
                        />
                        {currentStepData?.hint && (
                            <p className="text-xs text-muted-foreground">
                                {currentStepData?.hint}
                            </p>
                        )}
                    </div>
                </form>
            </div>

            <div className="space-y-4">
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
                        type="button"
                        onClick={handleNextStep}
                        className={`transition-all duration-200 ${
                            currentStep === 1 ? "w-full" : "flex-1"
                        } cursor-pointer`}
                    >
                        {currentStepData?.buttonText}
                    </Button>
                </div>

                {/* Social Login - Only show on first step */}
                {currentStep === 1 && (
                    <>
                        {/* Divider */}
                        <Divider text="Or continue with" />

                        {/* Social Login Buttons */}
                        <div className="space-y-2 transition-all duration-300">
                            <Button
                                variant="outline"
                                className="w-full cursor-pointer"
                                onClick={() => loginWithOAuth("google")}
                            >
                                <img
                                    src="/image/google.svg"
                                    alt="Google"
                                    className="size-4 mr-2 dark:invert"
                                />
                                Sign up with Google
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full cursor-pointer"
                                onClick={() => loginWithOAuth("github")}
                            >
                                <img
                                    src="/image/github.svg"
                                    alt="GitHub"
                                    className="size-4 mr-2 dark:invert"
                                />
                                Sign up with GitHub
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default RegisterForm;
