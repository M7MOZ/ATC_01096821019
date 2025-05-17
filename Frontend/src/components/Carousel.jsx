/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
function Carousel({children}) {
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
        </div>
    )
}

export default Carousel