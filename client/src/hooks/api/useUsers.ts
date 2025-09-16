// Combined users hook with all users CRUD operations

// import services
import {
    useUser as useUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} from "@/services/users";

// import types
import type { UpdateUserDto } from "@/api/api";

/**
 * Combined users hook with all CRUD operations
 */
const useUsers = () => {
    // Mutations
    const updateUserMutation = useUpdateUserMutation();
    const deleteUserMutation = useDeleteUserMutation();

    return {
        // Query hooks (to be called in components)
        useUser: useUserQuery,

        // CRUD actions
        updateUser: (id: string, data: UpdateUserDto) => updateUserMutation.mutate({ id, data }),
        deleteUser: (id: string) => deleteUserMutation.mutate(id),

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

export default useUsers;