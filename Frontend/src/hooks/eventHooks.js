import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent, updateEvent } from "../services/events";


export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (eventId) => deleteEvent(eventId),
        onSuccess: () => {
            queryClient.invalidateQueries(['events']);
        },
        onError: (err) => {
        console.error("Delete failed:", err);
    }
});
};
export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updatedFields }) => updateEvent(id, updatedFields),
        onSuccess: () => {
        queryClient.invalidateQueries(['events']);
        },
        onError: (err) => {
        console.error("Update failed:", err);
        }
    });
};