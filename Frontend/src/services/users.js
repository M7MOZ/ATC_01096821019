import axios from './axios';

export const bookEvent = async ({userId, eventId}) => {
    const { data } = await axios.post("/users/book-event", { userId, eventId });
    return data;
};

export const saveEvent = async ({userId, eventId}) => {
    const { data } = await axios.post("/users/save-event", { userId, eventId });
    return data;
};