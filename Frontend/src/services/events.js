import axios from "./axios";

export const fetchEventById = async (eventId) => {
    const { data } = await axios.get(`/events/${eventId}`);
    return data;
};

export const fetchAllEvents = async () => {
    const { data } = await axios.get("/events");
    return data;
};

export const deleteEvent = async (eventId) => {
    const { data } = await axios.delete(`/events/${eventId}`);
    return data;
};

export const updateEvent = async (eventId, updatedFields) => {
    const { data } = await axios.put(`/events/${eventId}`, updatedFields);
    return data;
};