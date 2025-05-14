import { FaFire, FaTheaterMasks  } from "react-icons/fa";
import { MdTour, MdFamilyRestroom, MdOutlineSportsSoccer } from "react-icons/md";
import { LiaMountainSolid } from "react-icons/lia";
import { BiSolidDrink } from "react-icons/bi";
import { PiSailboat, PiDiscoBall  } from "react-icons/pi";
import { IoFastFoodOutline } from "react-icons/io5";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { BsTicketPerforated } from "react-icons/bs";
import { GiBeveledStar } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const categories = [
    { id: "trending", icon: <FaFire /> },
    { id: "tours", icon: <MdTour /> },
    { id: "families", icon: <MdFamilyRestroom /> },
    { id: "adventures", icon: <LiaMountainSolid /> },
    { id: "dates", icon: <BiSolidDrink /> },
    { id: "on-the-water", icon: <PiSailboat /> },
    { id: "food-drink", icon: <IoFastFoodOutline /> },
    { id: "art-culture", icon: <FaTheaterMasks /> },
    { id: "in-the-air", icon: <HiOutlinePaperAirplane /> },
    { id: "night-owls", icon: <PiDiscoBall /> },
    { id: "shows", icon: <BsTicketPerforated /> },
    { id: "seasonal", icon: <GiBeveledStar /> },
    { id: "sports", icon: <MdOutlineSportsSoccer /> },
];

function Categories() 
{
    const { t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState("trending");
    return (
            <div className="flex gap-10 items-center justify-around text-2xl py-5 px-14 mt-20 shadow-md overflow-x-auto">
            {categories.map(({ id, icon }) => (
                <div
                key={id}
                id={id}
                onClick={() => setSelectedCategory(id)}
                className={`p-1 flex flex-shrink-0 flex-col items-center cursor-pointer gap-2 text-gray-700 hover:text-[#E32359] ${selectedCategory === id ? "border-b-2 border-[#E32359] text-[#E32359]" : ""}`} 
                >
                    {icon}
                    <span className="text-sm">{t(`categories.${id}`)}</span>
                </div>
            ))}
            </div>
    );
}

export default Categories