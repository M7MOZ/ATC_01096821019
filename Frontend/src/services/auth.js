import axios from "./axios";

export const login = async ({email, password}) => {
    const { data } = await axios.post("/auth/login", { email, password }, { withCredentials: true });
    return data;
};

export const signUp = async ({username, email, password}) => {
    const { data } = await axios.post("/auth/signup", { username, email, password }, { withCredentials: true });
    return data;
};

export const getUser = async () => {
    const { data } = await axios.get("/auth/me");
    return data;
}

