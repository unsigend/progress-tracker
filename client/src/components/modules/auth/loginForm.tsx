// import dependencies
import { Link } from "@refinedev/core";
import { useState } from "react";

// import components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// import constants
import ROUTES_CONSTANTS from "@/constants/routes";

// import hooks
import { useLogin } from "@refinedev/core";
import { useOAuthLogin } from "@/hooks/use-oauth";

// import types
import type { LoginRequestDto } from "@/api/api";

const LoginForm = () => {
    const [loginFormData, setLoginFormData] = useState<LoginRequestDto>({
        email: "",
        password: "",
    });
    const { mutate: login } = useLogin();
    const { login: loginWithOAuth } = useOAuthLogin();

    const handleLogin = (
        e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
    ) => {
        e.preventDefault();
        login(loginFormData);
    };

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-foreground">
                        Welcome back!
                    </h1>
                    <Button variant="link" className="text-sm cursor-pointer">
                        <Link to={ROUTES_CONSTANTS.AUTH().SIGNUP()}>
                            Sign Up
                        </Link>
                    </Button>
                </div>
                <p className="text-sm text-left text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>

            {/* Form */}
            <form className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={loginFormData.email}
                        onChange={(e) =>
                            setLoginFormData({
                                ...loginFormData,
                                email: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline cursor-pointer"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        required
                        value={loginFormData.password}
                        onChange={(e) =>
                            setLoginFormData({
                                ...loginFormData,
                                password: e.target.value,
                            })
                        }
                    />
                </div>
            </form>

            {/* Actions */}
            <div className="space-y-4">
                <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    onClick={(e) => handleLogin(e)}
                >
                    Login
                </Button>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-2">
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
                        Login with Google
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
                        Login with GitHub
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
