// import dependencies
import { useQuery } from "@tanstack/react-query";

// import api
import ApiClient from "@/lib/api/apiClient";

// import api key factory
import API_KEY_FACTORY from "@/lib/api/apiKeyFactory";
// import types
import type { StatisticsRecordingResponseDto } from "@/lib/api/api";

const useRecordingsStatistics = (query?: {
    startDate?: string;
    dateLimit?: number;
}) => {
    return useQuery({
        queryKey: API_KEY_FACTORY.STATISTICS().Recordings(query),
        queryFn: async (): Promise<StatisticsRecordingResponseDto> => {
            try {
                const response =
                    await ApiClient.api.statisticsControllerGetRecordingsStatistics(
                        query
                    );
                return response.data as unknown as StatisticsRecordingResponseDto;
            } catch (error) {
                console.error(error);
                return {
                    recordings: [],
                    totalCount: 0,
                };
            }
        },
        retry: 1,
    });
};

export { useRecordingsStatistics };
