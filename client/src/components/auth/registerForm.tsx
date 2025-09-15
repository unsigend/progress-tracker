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
import apiClient, { setAuthToken } from "@/api/apiClient";

// import util
import validate from "@/util/validate";

// import types
import type {
    EmailCheckResponseDto,
    RegisterDto,
    ResponseUserDto,
} from "@/api/api";
import type { AxiosResponse } from "axios";

// import context
import UserContext from "@/context/userContext";

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
    formData: RegisterDto;
    setFormData: React.Dispatch<React.SetStateAction<RegisterDto>>;
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
        mutationFn: (user: RegisterDto) =>
            apiClient.api.authControllerRegister(user),
        onSuccess: async (data) => {
            // save the token to local storage
            localStorage.setItem("jwt-token", data?.data.access_token);
            // set the jwt token to the api client
            setAuthToken(data?.data.access_token);
            // get the user data
            const user: AxiosResponse<ResponseUserDto> =
                await apiClient.api.authControllerMe();
            setUser(user.data);
            // after successful creation, redirect to the dashboard
            navigate("/dashboard");
        },
        onError: (error: any) => {
            const errorMessage =
                error.response?.data.message instanceof Array
                    ? error.response?.data.message[0]
                    : error.response?.data.message;
            toast.error(errorMessage);
        },
    });

    // handle input change and set form data
    const handleInputChange = (value: string) => {
        if (currentStepData) {
            setFormData((prev: RegisterDto) => ({
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
                // validate email
                if (!validate.email(formData.email || "")) {
                    toast.error("Please enter a valid email address");
                    return;
                }

                const result: AxiosResponse<EmailCheckResponseDto> =
                    await apiClient.api.authControllerEmailCheck({
                        email: formData.email || "",
                    });
                if (result.data.exists) {
                    toast.error("Email already in use");
                    return;
                }
            } else if (currentField === "password") {
                // validate password
                if (!validate.password(formData.password || "")) {
                    toast.error("Password must be at least 8 characters long");
                    return;
                }
            } else if (currentField === "name") {
                // validate username
                if (!validate.username(formData.name || "")) {
                    toast.error(
                        "Username must be between 3 and 20 characters long"
                    );
                    return;
                }
            }
            // move to next step
            setCurrentStep(currentStep + 1);
        } else {
            const user: RegisterDto = {
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
                        <Link to="/login">Login</Link>
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
                                    currentStepData?.field as keyof RegisterDto
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
