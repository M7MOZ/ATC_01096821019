import axios from "./axios";

export const cancelEvent = async (eventId) => {
    const { data } = await axios.post("/events/cancel", { eventId });
    return data;
};

export const fetchEventById = async (eventId) => {
    const { data } = await axios.get(`/events/${eventId}`);
    return data;
};

export const fetchAllEvents = async () => {
    const { data } = await axios.get("/events");
    return data;
};
