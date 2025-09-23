/* eslint-disable @typescript-eslint/no-unused-vars */

// import dependencies
import { AuthProvider } from "@refinedev/core";

// import api
import ApiClient from "@/api/apiClient";

// import types
import type {
    LoginRequestDto,
    RegisterUserDto,
    LoginResponseDto,
    UserResponseDto,
} from "@/api/api";
import type { AxiosResponse } from "axios";

// import constants
import ROUTES_CONSTANTS from "@/constants/routes";
import AUTH_CONSTANTS from "@/constants/auth";
import errorUtils from "@/utils/error";

export const authProvider: AuthProvider = {
    /**
     * Login a user
     * @param loginRequest
     * @returns {
     *  success: boolean,
     *  redirectTo: string,
     *  error: {
     *    name: string,
     *    message: string
     *  }
     * }
     */
    login: async (loginRequest: LoginRequestDto) => {
        try {
            const response: AxiosResponse<LoginResponseDto> =
                (await ApiClient.api.authControllerLogin(
                    loginRequest
                )) as unknown as AxiosResponse<LoginResponseDto>;

            const data: LoginResponseDto = response.data as LoginResponseDto;

            // Store the token
            localStorage.setItem(
                AUTH_CONSTANTS.ACCESS_TOKEN_KEY,
                data.access_token
            );

            return {
                success: true,
                redirectTo: ROUTES_CONSTANTS.DASHBOARD().HOME(),
            };
        } catch (error) {
            return {
                success: false,
                error: {
                    name:
                        errorUtils.extractErrorMessage(error) || "Login failed",
                    message: "Invalid email or password",
                },
                redirectTo: ROUTES_CONSTANTS.AUTH().LOGIN(),
            };
        }
    },

    /**
     * Logout a user
     * @returns {
     *  success: boolean,
     *  redirectTo: string,
     * }
     */
    logout: async () => {
        localStorage.removeItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);
        return {
            success: true,
            redirectTo: ROUTES_CONSTANTS.LANDING().HOME(),
        };
    },

    /**
     * Check if a user is authenticated
     * @returns {
     *  authenticated: boolean,
     * }
     */
    check: async () => {
        const token = localStorage.getItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);

        return { authenticated: Boolean(token) };
    },

    /**
     * Handle error
     * @param _error
     * @returns {
     *  error: {name: string, message: string}
     * }
     */
    onError: async (_error) => {
        throw new Error("Not implemented");
    },
    // optional methods

    /**
     * Register a user
     * @param registerRequest
     * @returns {
     *  success: boolean,
     *  redirectTo: string,
     *  error: {name: string, message: string}
     * }
     */
    register: async (registerRequest: RegisterUserDto) => {
        const response = await ApiClient.api.authControllerRegister(
            registerRequest
        );

        if (response.status === 201) {
            localStorage.setItem(
                AUTH_CONSTANTS.ACCESS_TOKEN_KEY,
                response.data.access_token
            );
            return {
                success: true,
                redirectTo: ROUTES_CONSTANTS.DASHBOARD().HOME(),
            };
        } else {
            return {
                success: false,
                error: {
                    name: "Register failed",
                    message: "Register Failed",
                },
                redirectTo: ROUTES_CONSTANTS.AUTH().SIGNUP(),
            };
        }
    },

    /**
     * Forgot password
     * @param _params
     * @returns {
     *  error: {name: string, message: string}
     * }
     */
    forgotPassword: async (_params) => {
        throw new Error("Not implemented");
    },

    /**
     * Update password
     * @param _params
     * @returns {
     *  error: {name: string, message: string}
     * }
     */
    updatePassword: async (_params) => {
        throw new Error("Not implemented");
    },

    /**
     * Get identity
     * @returns {
     *  error: {name: string, message: string}
     * }
     */
    getIdentity: async () => {
        const response: AxiosResponse<UserResponseDto> =
            await ApiClient.api.userControllerGetMe();

        if (response.status < 200 || response.status > 299) {
            return null;
        }

        return response.data;
    },

    /**
     * Get permissions
     * @returns {
     *  error: {name: string, message: string}
     * }
     */
    getPermissions: async () => {
        throw new Error("Not implemented");
    },
};

export default authProvider;
