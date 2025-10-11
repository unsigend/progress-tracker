// import dependencies
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// import api
import ApiClient from "@/lib/api/apiClient";

// import types
import type { RecordingResponseDto, RecordingCreateDto } from "@/lib/api/api";

// import api key factory
import API_KEY_FACTORY from "@/lib/api/apiKeyFactory";

/**
 * Hook for the recordings
 * @param userBookId - The id of the user book
 * @returns useQuery for the recordings
 */
const useRecordings = (userBookId: string) => {
    return useQuery({
        queryKey: API_KEY_FACTORY.RECORDING().Detail(userBookId),
        queryFn: async (): Promise<RecordingResponseDto[]> => {
            const response =
                await ApiClient.api.userBookControllerGetRecordings(userBookId);
            return response.data as unknown as RecordingResponseDto[];
        },
    });
};

/**
 * Hook for the create recording
 * @param userBookId - The id of the user book
 * @returns useMutation for the create recording
 */
const useCreateRecording = (userBookId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (recording: RecordingCreateDto) => {
            const response =
                await ApiClient.api.userBookControllerCreateRecording(
                    userBookId,
                    recording
                );
            return response.data as unknown as RecordingResponseDto;
        },
        onSuccess: () => {
            // invalidate the recordings query
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY.RECORDING().Detail(userBookId),
            });
        },
    });
};

/**
 * Hook for the delete recordings
 * @param userBookId - The id of the user book
 * @returns useMutation for the delete recordings
 */
const useDeleteRecordings = (userBookId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const response =
                await ApiClient.api.userBookControllerDeleteRecordings(
                    userBookId
                );
            return response.data as unknown as boolean;
        },
        onSuccess: () => {
            // invalidate the recordings query
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY.RECORDING().Detail(userBookId),
            });
        },
    });
};

export { useRecordings, useCreateRecording, useDeleteRecordings };
