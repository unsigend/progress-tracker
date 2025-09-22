/**
 * Hook to check if an email is valid
 */

// import dependencies
import { useMutation } from "@tanstack/react-query";

// import types
import type { AxiosResponse } from "axios";
import type { EmailCheckResponseDto } from "@/api/api";

// import api
import ApiClient from "@/api/apiClient";

/**
 * Hook to check if an email is valid
 * @returns {
 *  checkEmail: (email: string) => void,
 *  isPending: boolean,
 * }
 */
export const useEmailCheck = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: async (email: string): Promise<EmailCheckResponseDto> => {
            const response: AxiosResponse<EmailCheckResponseDto> =
                await ApiClient.api.authControllerEmailCheck(email);
            return response.data;
        },
    });

    return { mutate, isPending };
};
