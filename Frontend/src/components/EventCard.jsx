/* eslint-disable react/prop-types */
import Carousel from "./Carousel";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const EventCard = ({ event }) => {
    return (
        <div className="w-full max-w-sm bg-white">
            <Carousel>
                {event.gallery.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Event ${index + 1}`}
                        className="rounded-lg "
                    />
                ))}
            </Carousel>
            <div className="py-4 space-y-1.5">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">From <span className="font-semibold text-base text-black">${event.price}</span></p>
                    <p className=" text-gray-800"><span className="flex gap-1"><FaStar className="text-sm mt-1"/>{event.rating}</span></p>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 truncate">{event.title}</h3>
                <div className="flex items-center justify-between">
                    <span className="flex gap-1 text-sm text-gray-500 "><IoLocationOutline className="text-base"/>{event.location}</span>
                    <Link to={`/event/${event._id}`}>
                        <button className=" px-4 py-2 bg-[#E32359] text-white rounded-lg cursor-pointer">
                            Book Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
