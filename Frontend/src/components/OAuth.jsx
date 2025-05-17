import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { useGoogleLogin } from '../hooks/authHooks';
function OAuth() {
    const {setIsLoginModal, setIsSignUpModal} = useContext(AppContext);
    const { t } = useTranslation();
    const { mutate: loginWithGoogle, isPending } = useGoogleLogin({
        onSuccess: () => {
            setIsLoginModal(false);
            setIsSignUpModal(false);
        }
    });

    const handleGoogleLogin = (e) => {
    e.preventDefault();
    loginWithGoogle();
    };
    return (
        <button onClick={handleGoogleLogin} className='border bg-[#1895de] text-white p-2 rounded w-full flex items-center justify-center gap-2 cursor-pointer'>
            <div className='rounded-full bg-white p-1'>
                <FcGoogle />
            </div>
            <span>{isPending ? t("log.loading") : t("log.google")}</span>
        </button>
    )
}

export default OAuth