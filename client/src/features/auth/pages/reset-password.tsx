// import dependencies
import { useState } from "react";
import { useNavigate } from "react-router";

// import components
import { toast } from "sonner";
import ResetPwdForm from "@/features/auth/components/ResetPwdForm";

// import types
import type {
    ResetPasswordRequestDto,
    ResetPasswordResponseDto,
    SendVerifyCodeResponseDto,
} from "@/lib/api/api";

// import hooks
import {
    useEmailCheck,
    useSendVerifyCode,
    useResetPassword,
} from "@/hooks/use-auth";

// import utils
import errorUtils from "@/lib/utils/error";
import validationUtils from "@/lib/utils/validation";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

const ResetPasswordPage = () => {
    // state management for reset password form
    const [resetForm, setResetForm] = useState<ResetPasswordRequestDto>({
        resetToken: "",
        code: "",
        newPassword: "",
    });
    const [email, setEmail] = useState<string>("");
    const [currentStep, setCurrentStep] = useState<
        "email" | "otp" | "password"
    >("email");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const navigate = useNavigate();

    // hooks for data and functionality
    const { mutate: emailCheck } = useEmailCheck();
    const { mutate: sendVerifyCode } = useSendVerifyCode();
    const { mutate: resetPassword } = useResetPassword();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(undefined);

        try {
            switch (currentStep) {
                case "email":
                    // Send verification code
                    await handleSendCode();
                    break;
                case "otp":
                    // Verify code and get reset token
                    await handleVerifyCode();
                    break;
                case "password":
                    // Reset password
                    await handleResetPassword();
                    break;
            }
        } catch {
            /* empty */
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendCode = async () => {
        // Basic email validation
        if (!validationUtils.email(email)) {
            setError("Please enter a valid email address");
            throw new Error("Invalid email");
        }

        // Check if email exists first
        return new Promise<void>((resolve, reject) => {
            emailCheck(email, {
                onSuccess: (exists: boolean) => {
                    if (!exists) {
                        setError("Email does not exist");
                        reject(new Error("Email not found"));
                        return;
                    }

                    // Only send verify code if email exists
                    sendVerifyCode(email, {
                        onSuccess: (response: SendVerifyCodeResponseDto) => {
                            setResetForm((prev) => ({
                                ...prev,
                                resetToken: response.resetToken,
                            }));
                            setCurrentStep("otp");
                            resolve();
                        },
                        onError: (error) => {
                            setError(errorUtils.extractErrorMessage(error));
                            reject(error);
                        },
                    });
                },
                onError: (error) => {
                    setError(errorUtils.extractErrorMessage(error));
                    reject(error);
                },
            });
        });
    };

    const handleVerifyCode = async () => {
        if (resetForm.code.length !== 6) {
            setError("Please enter the complete 6-digit code");
            throw new Error("Invalid code length");
        }

        // Verify code
        return new Promise<void>((resolve, reject) => {
            resetPassword(resetForm, {
                onSuccess: (response: ResetPasswordResponseDto) => {
                    if (!response.valid) {
                        setError(response.message);
                        reject(new Error(response.message));
                        return;
                    }
                    setCurrentStep("password");
                    resolve();
                },
                onError: (error) => {
                    setError(errorUtils.extractErrorMessage(error));
                    reject(error);
                },
            });
        });
    };

    const handleResetPassword = async () => {
        if (!resetForm.newPassword) {
            setError("Please enter a new password");
            throw new Error("Password required");
        }

        // Reset password
        return new Promise<void>((resolve, reject) => {
            resetPassword(resetForm, {
                onSuccess: (response: ResetPasswordResponseDto) => {
                    if (response.reset_success && response.valid) {
                        toast.success("Password reset successfully");
                        navigate(ROUTES_CONSTANTS.AUTH().LOGIN());
                        resolve();
                    } else {
                        setError(response.message);
                        reject(new Error(response.message));
                    }
                },
                onError: (error) => {
                    setError(errorUtils.extractErrorMessage(error));
                    reject(error);
                },
            });
        });
    };

    const handleBackToPrevious = () => {
        setError(undefined);
        switch (currentStep) {
            case "otp":
                setCurrentStep("email");
                setResetForm((prev) => ({ ...prev, code: "" }));
                break;
            case "password":
                setCurrentStep("otp");
                setResetForm((prev) => ({ ...prev, newPassword: "" }));
                break;
        }
    };

    return (
        <section className="container mx-auto min-h-screen flex items-center justify-center p-6">
            <ResetPwdForm
                email={email}
                setEmail={setEmail}
                resetForm={resetForm}
                setResetForm={setResetForm}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                currentStep={currentStep}
                onBackToPrevious={handleBackToPrevious}
                error={error}
                onClearError={() => setError(undefined)}
            />
        </section>
    );
};

export default ResetPasswordPage;
