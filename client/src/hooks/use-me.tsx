// import dependencies
import { useQuery } from "@tanstack/react-query";

// import api
import ApiClient from "@/lib/api/apiClient";

// import api key factory
import API_KEY_FACTORY from "@/lib/api/apiKeyFactory";

// import types
import type { UserResponseDto } from "@/lib/api/api";

/**
 * Hook for the current user
 * @returns useQuery for the current user
 */
const useMe = () => {
    return useQuery({
        queryKey: API_KEY_FACTORY.USER().Me(),
        queryFn: async (): Promise<UserResponseDto> => {
            const response = await ApiClient.api.userControllerGetMe();
            return response.data as unknown as UserResponseDto;
        },
    });
};

export { useMe };
