// import dependencies
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";

// import components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// import hooks
import { useLogin } from "@/hooks/useAuth";

// import constants
import AUTH_ROUTES from "@/constants/routes";

// import types
import type { LoginDto } from "@/api/api";

// import constants
import ROUTES from "@/constants/routes";

const LoginForm = () => {
    // navigate
    const navigate = useNavigate();

    // login mutation
    const { mutate, isPending } = useLogin();

    const login = (data: LoginDto) => {
        mutate(data);
        if (isPending) {
            toast.loading("Logging in...");
        } else {
            // redirect to dashboard
            navigate(ROUTES.DASHBOARD);
        }
    };

    // get form data
    const [formData, setFormData] = useState<LoginDto>({
        email: "",
        password: "",
    });

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Welcome back!
                    </h1>
                    <Button variant="link" className="text-sm cursor-pointer">
                        <Link to={AUTH_ROUTES.SIGNUP}>Sign Up</Link>
                    </Button>
                </div>
                <p className="text-sm text-left text-gray-600">
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
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a
                            href="#"
                            className="text-sm text-gray-600 hover:text-gray-900 underline-offset-4 hover:underline cursor-pointer"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
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
                    onClick={() => login(formData)}
                >
                    Login
                </Button>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-2">
                    <Button
                        variant="outline"
                        className="w-full cursor-pointer"
                        onClick={() => {}}
                    >
                        <img
                            src="/image/google.svg"
                            alt="Google"
                            className="size-4 mr-2"
                        />
                        Login with Google
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full cursor-pointer"
                        onClick={() => {}}
                    >
                        <img
                            src="/image/github.svg"
                            alt="GitHub"
                            className="size-4 mr-2"
                        />
                        Login with GitHub
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
