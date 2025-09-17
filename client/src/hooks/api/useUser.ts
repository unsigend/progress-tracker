// Combined current user hook with current user operations only

// import services
import {
    useCurrentUser,
    useUpdateCurrentUserMutation,
    useDeleteCurrentUserMutation,
} from "@/services/user";

// import types
import type { UpdateUserDto } from "@/api/api";

/**
 * Combined user hook for current user operations only
 * Backend only supports current user operations, not arbitrary user queries
 */
const useUser = () => {
    // Mutations for current user only
    const updateUserMutation = useUpdateCurrentUserMutation();
    const deleteUserMutation = useDeleteCurrentUserMutation();

    return {
        // Query hook for current user (to be called in components)
        useCurrentUser,

        // Current user actions
        updateCurrentUser: (data: UpdateUserDto) => updateUserMutation.mutate(data),
        deleteCurrentUser: () => deleteUserMutation.mutate(),

        // Mutation states
        updateState: {
            isPending: updateUserMutation.isPending,
            isError: updateUserMutation.isError,
            error: updateUserMutation.error,
        },
        deleteState: {
            isPending: deleteUserMutation.isPending,
            isError: deleteUserMutation.isError,
            error: deleteUserMutation.error,
        },
    };
};

export default useUser;