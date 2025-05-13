import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
function OAuth() {
    const {setIsLoginModal, setIsSignUpModal, setUser} = useContext(AppContext);
    const { t } = useTranslation();
    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const { data } = await axios.post("/api/auth/google", {
                username: result.user.displayName,
                email: result.user.email,
                image: result.user.photoURL
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setIsLoginModal(false);
            setIsSignUpModal(false);
            setUser(data);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <button onClick={handleGoogleLogin} className='border bg-[#1895de] text-white p-2 rounded w-full flex items-center justify-center gap-2 cursor-pointer'>
            <div className='rounded-full bg-white p-1'>
                <FcGoogle />
            </div>
            <span>{t("log.google")}</span>
        </button>
    )
}

export default OAuth