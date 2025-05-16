// import { IoIosSearch } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUser  } from "react-icons/fa";
import LoginModal from "./Login";
import SignupModal from "./Signup";
// import { useTranslation } from "react-i18next";
import { AppContext } from "../context/AppContext.jsx";
import { useContext, useState } from "react";
import { changeLanguage } from "../i18n.js";
import AddEventModal from "./AddEvent.jsx";
import axios from "axios";
function Header() {
    // const {t} = useTranslation();
    const {isSignUpModal, isLoginModal, user, setEvents, setIsAddEventModal} = useContext(AppContext);
    const [authMenu, setAuthMenu] = useState(false);

    const toggleAuthMenu = () => {
        if (!(isSignUpModal || isLoginModal)) {
            setAuthMenu(!authMenu);
        }
    }
    const fetchEvents = () => {
        axios.get('/api/events').then(res => setEvents(res.data));
    };

    return (
        <div className={`force-ltr px-8 flex justify-between bg-[#F8F8F5] border-b-1 border-gray-100 fixed top-0 left-0 right-0 `} >
            <img src="https://www.peek.com/images/nav/peek-logo-dde124cc27ad821dce0f0385caad1b5e.png?vsn=d" alt="logo" className="w-17 h-17"/>
            {/* <div className="flex flex-row-reverse m-4 py-1 px-3 bg-gray-50 rounded-2xl w-[455px] border border-gray-200 items-center mx-auto">
                <IoIosSearch className="text-2xl"/>
                <input type="text" placeholder={t("header.search")} className=" p-2 flex-1 outline-none "/>
            </div> */}
            <div className="flex items-center gap-5 cursor-pointer" >
                <div onClick={toggleAuthMenu} className="flex gap-2 items-center bg-gray-50 border border-gray-200 p-1 rounded-sm hover:shadow-sm transition-all group relative">
                    <RxHamburgerMenu className="text-3xl text-gray-800"/>
                    {
                        user._id ? <img src={`https://ui-avatars.com/api/?name=${user.username}&size=400`} alt="user" className="w-8 h-8 rounded-full"/> : <FaRegUser className="text-2xl text-gray-800"/>
                    }
                    <div className={` ${authMenu? "absolute" : "hidden"} z-50 right-0 top-10 bg-white shadow-lg rounded-lg p-2 w-30 flex flex-col items-center gap-2`}>
                        {
                            user._id ? (
                                <>
                                    <AddEventModal
                                        onSuccess={fetchEvents}
                                        onClose={() => setIsAddEventModal(false)}
                                    />
                                </>
                            ) : (
                                <>
                                    <SignupModal />
                                    <LoginModal />
                                </>
                            )
                        }
                    </div>
                </div>
                <div className="group relative">
                    <MdLanguage className="text-3xl text-gray-800"/>
                    <div className={`group-hover:block hidden absolute z-50 right-0 bg-white shadow-lg rounded-lg p-4 `}>
                        <button onClick={() => changeLanguage("en")} className="text-md cursor-pointer hover:text-[#E32359]">English</button>
                        <button onClick={() => changeLanguage("ar")}  className="text-md cursor-pointer hover:text-[#E32359]">العربية</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header