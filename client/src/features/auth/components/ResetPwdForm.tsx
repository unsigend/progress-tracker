// import dependencies
import { Link } from "react-router";

// import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Field,
    FieldContent,
    FieldLabel,
    FieldGroup,
    FieldDescription,
} from "@/components/ui/field";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

// import types
import type { ResetPasswordRequestDto } from "@/lib/api/api";

// import icons
import { ArrowLeft } from "lucide-react";

interface ResetPwdFormProps {
    email: string;
    setEmail: (email: string) => void;
    resetForm: ResetPasswordRequestDto;
    setResetForm: (resetForm: ResetPasswordRequestDto) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    currentStep: "email" | "otp" | "password";
    onBackToPrevious: () => void;
    error?: string;
    onClearError: () => void;
}

const ResetPwdForm = ({
    email,
    setEmail,
    resetForm,
    setResetForm,
    onSubmit,
    isLoading,
    currentStep,
    onBackToPrevious,
    error,
    onClearError,
}: ResetPwdFormProps) => {
    const getStepTitle = () => {
        switch (currentStep) {
            case "email":
                return "Reset Password";
            case "otp":
                return "Verify Code";
            case "password":
                return "New Password";
            default:
                return "Reset Password";
        }
    };

    const getStepDescription = () => {
        switch (currentStep) {
            case "email":
                return "Enter your email address and we'll send you a verification code to reset your password.";
            case "otp":
                return "Enter the 6-digit verification code sent to your email address.";
            case "password":
                return "Enter your new password to complete the reset process.";
            default:
                return "";
        }
    };

    const getButtonText = () => {
        switch (currentStep) {
            case "email":
                return isLoading ? "Sending Code..." : "Send Verification Code";
            case "otp":
                return isLoading ? "Verifying..." : "Verify Code";
            case "password":
                return isLoading ? "Resetting Password..." : "Reset Password";
            default:
                return "Submit";
        }
    };

    const isButtonDisabled = () => {
        switch (currentStep) {
            case "email":
                return isLoading || !email;
            case "otp":
                return isLoading || resetForm.code.length !== 6;
            case "password":
                return isLoading || !resetForm.newPassword;
            default:
                return isLoading;
        }
    };

    return (
        <Card className="max-w-2xl w-full">
            <CardHeader className="text-center space-y-3 pb-6">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-3xl font-bold text-foreground">
                        {getStepTitle()}
                    </CardTitle>
                    <Button
                        variant="link"
                        className="text-sm cursor-pointer p-0 h-auto"
                    >
                        <Link to={ROUTES_CONSTANTS.AUTH().LOGIN()}>
                            Back to Login
                        </Link>
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground text-left">
                    {getStepDescription()}
                </p>
            </CardHeader>

            <CardContent className="px-8 pb-8 space-y-8">
                {/* Form */}
                <form onSubmit={onSubmit} className="space-y-6">
                    <FieldGroup>
                        {/* Email Step */}
                        {currentStep === "email" && (
                            <Field>
                                <FieldLabel htmlFor="email">
                                    Email Address
                                </FieldLabel>
                                <FieldContent>
                                    <Input
                                        id="email"
                                        type="text"
                                        placeholder="m@example.com"
                                        className={`transition-colors ${
                                            error
                                                ? "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
                                                : ""
                                        }`}
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (error) onClearError();
                                        }}
                                    />
                                    {error && (
                                        <div className="mt-2 p-3 rounded-md bg-destructive/10 border border-destructive/20 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                                            <p className="text-sm text-destructive font-medium flex items-center gap-2">
                                                <svg
                                                    className="w-4 h-4 flex-shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {error}
                                            </p>
                                        </div>
                                    )}
                                </FieldContent>
                            </Field>
                        )}

                        {/* OTP Step */}
                        {currentStep === "otp" && (
                            <Field>
                                <FieldLabel>Verification Code</FieldLabel>
                                <FieldContent className="flex flex-col gap-4">
                                    <div className="flex justify-center">
                                        <InputOTP
                                            maxLength={6}
                                            value={resetForm.code}
                                            onChange={(value) => {
                                                setResetForm({
                                                    ...resetForm,
                                                    code: value,
                                                });
                                                if (error) onClearError();
                                            }}
                                            className={
                                                error
                                                    ? "aria-invalid:border-destructive"
                                                    : ""
                                            }
                                        >
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                    {error && (
                                        <div className="mt-2 p-3 rounded-md bg-destructive/10 border border-destructive/20 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                                            <p className="text-sm text-destructive font-medium flex items-center gap-2">
                                                <svg
                                                    className="w-4 h-4 flex-shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {error}
                                            </p>
                                        </div>
                                    )}
                                    <FieldDescription>
                                        Check your email for the 6-digit
                                        verification code
                                    </FieldDescription>
                                </FieldContent>
                            </Field>
                        )}

                        {/* Password Step */}
                        {currentStep === "password" && (
                            <Field>
                                <FieldLabel htmlFor="newPassword">
                                    New Password
                                </FieldLabel>
                                <FieldContent>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        placeholder="Enter your new password"
                                        className={`transition-colors ${
                                            error
                                                ? "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
                                                : ""
                                        }`}
                                        value={resetForm.newPassword}
                                        onChange={(e) => {
                                            setResetForm({
                                                ...resetForm,
                                                newPassword: e.target.value,
                                            });
                                            if (error) onClearError();
                                        }}
                                    />
                                    {error && (
                                        <div className="mt-2 p-3 rounded-md bg-destructive/10 border border-destructive/20 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                                            <p className="text-sm text-destructive font-medium flex items-center gap-2">
                                                <svg
                                                    className="w-4 h-4 flex-shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {error}
                                            </p>
                                        </div>
                                    )}
                                </FieldContent>
                            </Field>
                        )}
                    </FieldGroup>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full cursor-pointer"
                        disabled={isButtonDisabled()}
                    >
                        {getButtonText()}
                    </Button>

                    {/* Back Button */}
                    {currentStep !== "email" && (
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full cursor-pointer"
                            onClick={onBackToPrevious}
                            disabled={isLoading}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    )}
                </form>
            </CardContent>
        </Card>
    );
};

export default ResetPwdForm;
