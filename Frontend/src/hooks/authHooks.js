// hooks/useGoogleLogin.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import { app } from '../firebase.js'; // adjust the path if needed
import { getUser } from '../services/auth.js';

export const useGoogleLogin = ({ onSuccess }) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        const result = await signInWithPopup(auth, provider);

        const { data } = await axios.post(
            '/api/auth/google',
            {
            username: result.user.displayName,
            email: result.user.email,
            image: result.user.photoURL,
            },
            {
            headers: {
                'Content-Type': 'application/json',
            }
            }
        );

        return data;
        },
        onSuccess: async (data) => {
        await queryClient.invalidateQueries({ queryKey: ['user'] });
        if (onSuccess) onSuccess(data);
        },
        onError: (error) => {
        console.error("Google login failed:", error);
        }
    });
};


export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getUser,
})}