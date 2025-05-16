/* eslint-disable react/prop-types */
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineCancel  } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { bookEvent } from "../services/users";
function ReservationCard({event}) {
    const [spots, setSpots] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();
    const {user} = useContext(AppContext);
    const userId = user._id;
    const queryClient = new QueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: () => bookEvent({ userId, eventId: event._id }),
        onSuccess: async(data) => {
            console.log("Booking success:", data);
            await queryClient.invalidateQueries(['user']);
            await queryClient.invalidateQueries(['reservedEvents']);
            navigate("/congrats");
        }
    });

    const handleReserve = () => {
        if (selectedDate) {
            mutate();
        }
    }
    const handleSpots = (type) => {
        if (type === "inc") {
            if (spots < 15) {
                setSpots(spots + 1);
            }
        } else {
            if (spots > 1) {
                setSpots(spots - 1);
            }
        }
    }
    return (
        <div className="flex-1 rounded-lg shadow-2xl h-96 md:h-[420px] p-5  ">
            <div className="border-b border-gray-200 py-2">
                <p className="text-lg text-gray-800">From<span className="text-2xl font-semibold"> ${event.price}</span></p>
                <p className="text-gray-500">up to 15 guests</p>
            </div>
            <div className="mt-2 py-2 flex flex-col gap-5">
                <div className="flex justify-between border-2 border-gray-200 rounded-lg p-2 items-center gap-2">
                    <span>{spots}-{spots > 1 ? "spots" : "spot"}</span>
                    <div className="flex gap-2">
                        <button onClick={() => handleSpots("dec")} className={`border-2 ${spots > 1 ? "cursor-pointer" : "" } border-gray-200 text-2xl flex items-center justify-center w-6 h-6 rounded`}>-</button>
                        <button onClick={() => handleSpots("inc")} className={`border-2 ${spots < 15 ? "cursor-pointer" : "" } border-gray-200 text-2xl flex items-center justify-center w-6 h-6 rounded`}>+</button>
                    </div>
                </div>
                <div className="border-2 border-gray-200 rounded-lg">
                    <DatePicker
                        selected={selectedDate}
                        placeholderText="Select Date"
                        onChange={(date) => setSelectedDate(date)}
                        minDate={new Date(event.startDate)}
                        maxDate={new Date(event.endDate)}
                        className="  p-2 outline-none w-full"
                        wrapperClassName="w-full"
                    />
                </div>
                <button onClick={handleReserve} className={` text-white rounded-lg p-2 ${selectedDate ? "bg-[#E32359] cursor-pointer" : "bg-[#E32359]/80" } `}>
                    {isPending ? "Loading..." : "Reserve your spot"}
                </button>
                <div className="flex-1 bg-[#E32359]/10 rounded-lg p-2 border border-[#E32359]/20">
                    <div className="text-gray-700 text-sm">
                        <span className="text-lg text-gray-900 flex">
                            <MdOutlineCancel className='text-2xl text-[#E32359] font-light mr-2'/>
                            Cancellation 
                        </span> 
                        <p>Free cancellation up to 24 hours before the event</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReservationCard