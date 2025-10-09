// import dependencies
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

// import types
import type { StepData } from "@/features/auth/data/steps";
import type { RegisterUserDto } from "@/lib/api/api";

// import hooks
import { useGoogleLogin, useGithubLogin } from "@/hooks/use-auth";

const RegisterForm = ({
    stepData,
    currentStep,
    formData,
    setFormData,
    handleNextStep,
    handlePreviousStep,
}: {
    stepData: StepData;
    currentStep: number;
    formData: RegisterUserDto;
    setFormData: (formData: RegisterUserDto) => void;
    handleNextStep: () => void;
    handlePreviousStep: () => void;
}) => {
    // hook for the google login
    const googleLogin = useGoogleLogin();
    // hook for the github login
    const githubLogin = useGithubLogin();

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
                        {stepData.title}
                    </h1>
                    <Button
                        variant="link"
                        className="text-sm cursor-pointer p-0 h-auto"
                    >
                        <Link to={ROUTES_CONSTANTS.AUTH().LOGIN()}>Login</Link>
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground transition-all duration-300 text-left">
                    {stepData.description}
                </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor={stepData.field}>
                            {stepData.field.charAt(0).toUpperCase() +
                                stepData.field.slice(1)}
                        </FieldLabel>
                        <FieldContent>
                            <Input
                                id={stepData.field}
                                type={stepData.type}
                                placeholder={stepData.placeholder}
                                value={
                                    formData[
                                        stepData.field as keyof typeof formData
                                    ] || ""
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        [stepData.field]: e.target.value,
                                    })
                                }
                                autoFocus
                                className="transition-all duration-200"
                            />
                            {stepData.hint && (
                                <FieldDescription>
                                    {stepData.hint}
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
                        onClick={handleNextStep}
                    >
                        {stepData.buttonText}
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
                            onClick={() => googleLogin()}
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
                            onClick={() => githubLogin()}
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
