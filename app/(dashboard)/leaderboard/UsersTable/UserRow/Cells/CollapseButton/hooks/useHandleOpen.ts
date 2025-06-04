/**
 * @fileoverview
 * Custom hook to handle opening a user panel by:
 * - Selecting the current user into state
 * - Toggling the collapsed UI state for that user
 * - Invalidating and refreshing the React Query cache for that user
 *
 * Best practices followed:
 * - Centralized query key management
 * - Optimistic UI toggle
 * - Controlled cache invalidation with specific queryKey
 */

import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import { useUsersStore } from "@/app/store/users";
import usersQueryKeys from "@/ReactQuery/queryKeys/users";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Custom hook to provide a handler for toggling the open/collapsed state
 * of a user-specific UI section, while revalidating that user's query cache.
 *
 * This ensures data stays fresh and UI remains in sync with server state.
 *
 * @returns {{ handleOpen: () => Promise<void> }} An object with the handleOpen function
 */
const useHandleOpen = (): { handleOpen: () => Promise<void> } => {
  // Access React Query's query client to perform cache operations
  const queryClient = useQueryClient();

  // Extract the currently authenticated user from context
  const { currentUser } = useCurrentUserContext();

  // Zustand store: set the currently selected user globally
  const { setSelectedUser } = useUsersStore((state) => state);

  // Zustand store: retrieve the collapsed state for the current user,
  // falling back to true if undefined
  const isCollapsed = useUsersStore(
    (state) => state.user.isCollapsed[currentUser.email] ?? true
  );

  // Zustand store: updater for the collapsed state
  const setIsCollapsed = useUsersStore((state) => state.setIsCollapsed);

  /**
   * Handles opening a user panel:
   * - Updates the selected user
   * - Toggles the collapsed UI state for the current user
   * - Invalidates and revalidates the query cache for that user
   */
  const handleOpen = async () => {
    // Sync selected user state globally
    setSelectedUser({ ...currentUser });

    // Toggle UI open/close state for this user
    setIsCollapsed(currentUser.email, !isCollapsed);

    // Invalidate and refetch query associated with this user
    await queryClient.invalidateQueries({
      queryKey: [usersQueryKeys.currentUser, currentUser.email],
    });
  };

  return { handleOpen };
};

export default useHandleOpen;
