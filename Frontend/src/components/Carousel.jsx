/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { IoBookmarkOutline, IoBookmark  } from "react-icons/io5";
function Carousel({children}) {
    const [save, isSaved] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const togleSave = () => {
        isSaved(!save);
    }
    const prev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + children.length) % children.length);
    }
    const next = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % children.length);
    }
    return (
        <div className="relative overflow-hidden">
            <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${currentImageIndex * 100}%)`}}>
                {children}
            </div>
            <div className="absolute inset-0 flex items-center justify-between px-4">
                <button onClick={prev} className="bg-white rounded-full p-2 shadow-md hover:bg-gray-200">
                    <FaChevronLeft className="text-gray-800" />
                </button>
                <button onClick={next} className="bg-white rounded-full p-2 shadow-md hover:bg-gray-200">
                    <FaChevronRight className="text-gray-800" />
                </button>
            </div>
            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {children.map((_, index) => (
                        <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${currentImageIndex === index ? "bg-[#E32359]" : "bg-gray-100"}`}
                        ></div>
                    ))}
                </div>
            </div>
            <div onClick={togleSave} className="absolute top-2 right-2 text-3xl text-white hover:text-4xl transition-all duration-300">
                {save ? <IoBookmark className="text-[#E32359]"/> : <IoBookmarkOutline/>}
            </div>
        </div>
    )
}

export default Carousel