// import types
import type {
    FileDeleteResponseDto,
    FileUploadResponseDto,
} from "@/lib/api/api";

// import api client
import ApiClient from "@/lib/api/apiClient";

/**
 * Hook for the file upload
 * @returns useMutation for the file upload
 */
const useFileUpload = (): {
    mutate: (file: File) => Promise<FileUploadResponseDto>;
} => {
    const mutate = async (file: File): Promise<FileUploadResponseDto> => {
        const response = await ApiClient.api.cloudControllerUploadFile({
            file,
        });
        return response.data as unknown as FileUploadResponseDto;
    };
    return { mutate };
};

/**
 * Hook for the file delete
 * @returns useMutation for the file delete
 */
const useFileDelete = (): {
    mutate: (fileUrl: string) => Promise<FileDeleteResponseDto>;
} => {
    const mutate = async (fileUrl: string): Promise<FileDeleteResponseDto> => {
        const response = await ApiClient.api.cloudControllerDeleteFile({
            file_url: fileUrl,
        });
        return response.data as unknown as FileDeleteResponseDto;
    };
    return { mutate };
};

/**
 * Hook for the file upload avatar
 * @returns useMutation for the file upload avatar
 */
const useFileUploadAvatar = (): {
    mutate: (file: File) => Promise<FileUploadResponseDto>;
} => {
    const mutate = async (file: File): Promise<FileUploadResponseDto> => {
        const response = await ApiClient.api.cloudControllerUploadAvatar({
            file,
        });
        return response.data as unknown as FileUploadResponseDto;
    };
    return { mutate };
};

export { useFileUpload, useFileDelete, useFileUploadAvatar };
