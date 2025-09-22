// import dependencies
import { useQueryClient } from "@tanstack/react-query";
import { useKeys } from "@refinedev/core";

/**
 * Hook to invalidate the current user
 *
 * @note This hook implemented based on the source code of refine framework's
 * useInvalidate hook with cache key for the profile of the current user.
 * So the correctness of the hook will change if the source code of the hook changes.
 *
 * @returns {
 *  invalidateCurrentUser: () => void,
 * }
 */
const useInvalidateCurrentUser = () => {
    const queryKey = useKeys().keys().auth().action("identity").get();
    const queryClient = useQueryClient();

    return {
        invalidateCurrentUser: () => {
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
    };
};

export default useInvalidateCurrentUser;
