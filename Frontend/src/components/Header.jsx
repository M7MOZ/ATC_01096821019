import { IoIosSearch } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import LoginModal from "./Login";
import SignupModal from "./Signup";
import { useTranslation } from "react-i18next";
import { logo } from "../assets/modules.js";
function Header() {
    const {t, i18n} = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    }
    return (
        <div className="p-3 flex items-center justify-between">
            <img src={logo} alt="logo" className="w-30 h-10 object-cover"/>
            <div className="flex bg-gray-100 rounded-3xl px-2 w-[355px] items-center">
                <IoIosSearch className="text-2xl"/>
                <input type="text" placeholder={t("search")} className=" p-2 outline-none "/>
            </div>
            <div className="space-x-4 flex items-center">
                <LoginModal />
                <SignupModal />
                <div className="group relative">
                    <MdLanguage className="text-2xl "/>
                    <div className="group-hover:block hidden absolute z-50 right-0 bg-white shadow-lg rounded-lg p-4">
                        <button onClick={() => changeLanguage("en")} className="text-sm cursor-pointer hover:text-[#E32359]">English</button>
                        <button onClick={() => changeLanguage("ar")}  className="text-sm cursor-pointer hover:text-[#E32359]">العربية</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header