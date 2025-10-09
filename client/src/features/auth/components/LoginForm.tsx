// import dependencies
import { Link } from "react-router";

// import components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldContent,
    FieldLabel,
    FieldGroup,
    FieldSeparator,
} from "@/components/ui/field";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

// import types
import type { LoginRequestDto } from "@/lib/api/api";

const LoginForm = ({
    loginForm,
    setLoginForm,
    onSubmit,
    isLoading,
}: {
    loginForm: LoginRequestDto;
    setLoginForm: (loginForm: LoginRequestDto) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
}) => {
    return (
        <div className="w-full max-w-md mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-foreground">
                        Welcome back!
                    </h1>
                    <Button
                        variant="link"
                        className="text-sm cursor-pointer p-0 h-auto"
                    >
                        <Link to={ROUTES_CONSTANTS.AUTH().REGISTER()}>
                            Sign Up
                        </Link>
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground text-left">
                    Enter your email below to login to your account
                </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-6">
                <FieldGroup>
                    {/* Email Field */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <FieldContent>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                className="transition-colors"
                                value={loginForm.email}
                                onChange={(e) =>
                                    setLoginForm({
                                        ...loginForm,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </FieldContent>
                    </Field>

                    {/* Password Field */}
                    <Field>
                        <div className="flex items-center justify-between">
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <a
                                href="#"
                                className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline cursor-pointer transition-colors"
                            >
                                Forgot your password?
                            </a>
                        </div>
                        <FieldContent>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="transition-colors"
                                value={loginForm.password}
                                onChange={(e) =>
                                    setLoginForm({
                                        ...loginForm,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </FieldContent>
                    </Field>
                </FieldGroup>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing in..." : "Sign In"}
                </Button>
            </form>

            {/* Social Login Section */}
            <div className="space-y-4">
                <FieldSeparator className="mb-4">
                    Or continue with
                </FieldSeparator>

                <div className="space-y-3">
                    <Button
                        variant="outline"
                        className="w-full cursor-pointer"
                        disabled={isLoading}
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
                        disabled={isLoading}
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
        </div>
    );
};

export default LoginForm;
