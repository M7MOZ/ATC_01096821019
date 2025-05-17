/* eslint-disable react/prop-types */
import Carousel from "./Carousel";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useUser } from "../hooks/authHooks";
import { useDeleteEvent } from "../hooks/eventHooks";
const EventCard = ({ event }) => {
    const {t} = useTranslation();
    const {setIsLoginModal} = useContext(AppContext);
    const { data: user } = useUser();
    const navigate = useNavigate();
    const handleBooking = () => { 
        if (user?._id) {
            navigate(`/event/${event?._id}`);
        } else {
            setIsLoginModal(true);
        }
    }
    const booked = user?.reservedEvents?.includes(event?._id);   
    const { mutate: deleteEventMutate, isDeletePending } = useDeleteEvent();

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this event?")) {
            deleteEventMutate(event?._id);
        }
    };
    return (
        <div className="w-full max-w-sm bg-white">
            <Carousel>
                {event?.gallery.map((image, index) => (
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
                    <p className="text-sm text-gray-600">From <span className="font-semibold text-base text-black">${event?.price}</span></p>
                    <p className=" text-gray-800"><span className="flex gap-1"><FaStar className="text-sm mt-1"/>{event?.rating}</span></p>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 truncate">{event?.title}</h3>
                {
                    user?.role === "admin" ? (
                        <div className="flex justify-between">
                            <button onClick={ handleDelete} className={`p-2 w-25 text-white font-medium rounded cursor-pointer bg-red-500`}>
                                {isDeletePending ? t("log.loading") : t("admin.delete")}
                            </button>
                            <Link to={`/edit/${event?._id}`} >
                                {<button className={`p-2 w-25 text-white font-medium rounded cursor-pointer bg-gray-500`}>
                                    {t("admin.edit")}
                                </button>}
                            </Link>
                        </div>
                    ):
                    (
                        <div className="flex justify-between">
                            <span className="flex gap-1 text-sm text-gray-500 mt-5 truncate"><IoLocationOutline className="text-base"/>{event?.location}</span>
                            <button disabled = {booked} onClick={handleBooking} className={`p-2 w-25 text-white font-medium rounded ${!booked ? "bg-[#E32359] cursor-pointer" : "bg-[#E32359]/80" }`}>
                                {booked? t("events.booked") :t("events.book")}
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default EventCard;
