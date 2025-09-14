/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import dependencies
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";

// import components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

// import api
import apiClient, { setAuthToken } from "@/api/apiClient";

// import context
import UserContext from "@/context/userContext";

// import types
import type { AuthResponseDto, LoginDto, ResponseUserDto } from "@/api/api";
import type { AxiosResponse } from "axios";

const LoginForm = () => {
    // get setUser from context
    const { setUser, user } = useContext(UserContext) as {
        user: ResponseUserDto;
        setUser: (user: ResponseUserDto) => void;
    };
    // get form data
    const [formData, setFormData] = useState<LoginDto>({
        email: "",
        password: "",
    });

    // navigate
    const navigate = useNavigate();

    // if user is already logged in, redirect to dashboard
    useEffect(() => {
        if (user && user.id) {
            navigate("/dashboard");
        }
    }, []);

    // handle login
    const handleLogin = async () => {
        try {
            const jwtToken: AxiosResponse<AuthResponseDto> =
                await apiClient.api.authControllerLogin({
                    email: formData.email,
                    password: formData.password,
                });
            setAuthToken(jwtToken.data.access_token);
            // save the token to local storage
            localStorage.setItem("jwt-token", jwtToken.data.access_token);
            // get the user data
            const user: AxiosResponse<ResponseUserDto> =
                await apiClient.api.authControllerMe();
            setUser(user.data);

            // redirect to dashboard
            navigate("/dashboard");
        } catch (error: any) {
            // get the error message from the backend response
            const errorMessage =
                error.response.data.message instanceof Array
                    ? error.response.data.message[0]
                    : error.response.data.message;

            toast.error(errorMessage);
        }
    };
    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Welcome back!
                    </h1>
                    <Button variant="link" className="text-sm cursor-pointer">
                        <Link to="/signup">Sign Up</Link>
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
                    onClick={handleLogin}
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
                    <Button variant="outline" className="w-full cursor-pointer">
                        <img
                            src="/image/google.svg"
                            alt="Google"
                            className="size-4 mr-2"
                        />
                        Login with Google
                    </Button>
                    <Button variant="outline" className="w-full cursor-pointer">
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
