import { useContext } from "react";
import {heroImg} from "../assets/modules.js";
import { AppContext } from "../context/AppContext.jsx";
import { useTranslation } from "react-i18next";
function HeroSection() {
    const {setIsSignUpModal} = useContext(AppContext);
    const {t, i18n} = useTranslation();
    const lang = i18n.language;
    
    return (
        <div className="h-[70vh] overflow-hidden relative">
            <img src={heroImg} className="object-cover object-center relative" />
            {/*overlay to reduce image opacity*/}
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className={`absolute top-40 ${lang === "ar" ? "right-15" : "left-15"} text-white font-bold text-5xl space-y-4`} dir = {lang === "ar" ? "rtl" : "ltr"}>
                <h1>
                    {t("hero.hero_one")}
                </h1>
                <p className="text-2xl font-normal">
                    {t("hero.hero_two")}
                </p>
                <button onClick={() => setIsSignUpModal(true)} className="bg-[#E32359] text-white p-2 rounded text-xl font-semibold cursor-pointer">{t("hero.get_started")}</button>
            </div>
        </div>
    )
}

export default HeroSection