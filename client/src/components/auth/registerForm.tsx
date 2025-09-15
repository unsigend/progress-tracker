/* eslint-disable @typescript-eslint/no-explicit-any */

// import dependencies
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";

// import components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import StepIndicator from "@/components/auth/stepIndicator";
import Divider from "@/components/ui/Divider";

// import data
import steps from "@/data/auth/stepData";

// import api
import apiClient from "@/api/apiClient";

// import util
import validate from "@/util/validate";
import { saveAuthToken, getErrorMessage } from "@/utils/auth";
import { AUTH_ROUTES, ERROR_MESSAGES } from "@/constants/auth";

// import types
import type {
    EmailCheckResponseDto,
    CreateUserDto,
    ResponseUserDto,
} from "@/api/api";
import type { AxiosResponse } from "axios";

// import context
import UserContext from "@/context/userContext";

// import util
import { handleGithubAuth, handleGoogleAuth } from "@/util/OAuth";

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
    formData,
    setFormData,
}: {
    currentStep: number;
    setCurrentStep: (step: number) => void;
    formData: CreateUserDto;
    setFormData: React.Dispatch<React.SetStateAction<CreateUserDto>>;
}) => {
    // get setUser from context
    const { setUser } = useContext(UserContext) as {
        user: ResponseUserDto;
        setUser: (user: ResponseUserDto) => void;
    };
    // navigate
    const navigate = useNavigate();

    // get current step data
    const currentStepData = steps.find((step) => step.id === currentStep);

    // create user mutation
    const mutation = useMutation({
        mutationFn: (user: CreateUserDto) =>
            apiClient.api.authControllerRegister(user),
        onSuccess: async (data) => {
            saveAuthToken(data?.data.access_token);
            const user: AxiosResponse<ResponseUserDto> =
                await apiClient.api.authControllerMe();
            setUser(user.data);
            navigate(AUTH_ROUTES.DASHBOARD);
        },
        onError: (error: any) => {
            toast.error(getErrorMessage(error));
        },
    });

    // handle input change and set form data
    const handleInputChange = (value: string) => {
        if (currentStepData) {
            setFormData((prev: CreateUserDto) => ({
                ...prev,
                [currentStepData.field]: value,
            }));
        }
    };

    // handle next step
    const handleNextStep = async (event: React.FormEvent) => {
        event.preventDefault();
        if (currentStep < steps.length) {
            const currentField = steps[currentStep - 1].field;

            // validate based on current field

            if (currentField === "email") {
                if (!validate.email(formData.email || "")) {
                    toast.error(ERROR_MESSAGES.INVALID_EMAIL);
                    return;
                }

                const result: AxiosResponse<EmailCheckResponseDto> =
                    await apiClient.api.authControllerEmailCheck({
                        email: formData.email || "",
                    });
                if (result.data.exists) {
                    toast.error(ERROR_MESSAGES.EMAIL_EXISTS);
                    return;
                }
            } else if (currentField === "password") {
                if (!validate.password(formData.password || "")) {
                    toast.error(ERROR_MESSAGES.PASSWORD_REQUIRED);
                    return;
                }
            } else if (currentField === "name") {
                if (!validate.username(formData.name || "")) {
                    toast.error(ERROR_MESSAGES.USERNAME_REQUIRED);
                    return;
                }
            }
            // move to next step
            setCurrentStep(currentStep + 1);
        } else {
            const user: CreateUserDto = {
                email: formData.email,
                password: formData.password,
                name: formData.name,
            };
            mutation.mutate(user);
        }
    };

    // handle previous step
    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
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
                    <h1 className="text-2xl font-semibold text-gray-900 transition-all duration-300">
                        {steps[currentStep - 1]?.title}
                    </h1>
                    <Button variant="link" className="text-sm cursor-pointer">
                        <Link to={AUTH_ROUTES.LOGIN}>Login</Link>
                    </Button>
                </div>
                <p className="text-sm text-left text-gray-600 transition-all duration-300">
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
                                    currentStepData?.field as keyof CreateUserDto
                                ] || ""
                            }
                            onChange={(e) => handleInputChange(e.target.value)}
                            required
                            autoFocus
                            className="transition-all duration-200"
                        />
                        {currentStepData?.hint && (
                            <p className="text-xs text-gray-500">
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
                        type="submit"
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
                                onClick={handleGoogleAuth}
                            >
                                <img
                                    src="/image/google.svg"
                                    alt="Google"
                                    className="size-4 mr-2"
                                />
                                Sign up with Google
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full cursor-pointer"
                                onClick={handleGithubAuth}
                            >
                                <img
                                    src="/image/github.svg"
                                    alt="GitHub"
                                    className="size-4 mr-2"
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
