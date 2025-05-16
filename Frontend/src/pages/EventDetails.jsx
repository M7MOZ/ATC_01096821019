import { useParams } from 'react-router-dom';
import {Spinner} from '../ui/Spinner';
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineWatchLater, MdOutlineCancel  } from "react-icons/md";
import ReservationCard from '../components/ReservationCard';
import { fetchEventById } from '../services/events';
import { useQuery } from '@tanstack/react-query';
const EventDetails = () => {
  const { id } = useParams();

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', id],
    queryFn: () => fetchEventById(id),
    enabled: !!id
  });

  if (isLoading) return <Spinner/>;

  return (
    <div className="px-10 sm:px-15 md:px-20 lg:px-40 py-6 mt-20 force-ltr">
      <h1 className="text-3xl font-medium mb-4">{event.title}</h1>
      <div className=" mb-2 flex items-center gap-1">
        <IoLocationOutline className='text-3xl '/>
        <span className="text-gray-800 font-medium text-lg
        mt-1">{event.location}</span>
      </div>

      <div className="flex flex-col gap-10 md:flex-row ">
        <div className="max-w-2xl">
          <div className="grid grid-cols-2 gap-4 max-w-2xl ">
            {event.gallery.map((img, i) => (
              <img key={i} src={img} alt={`event ${i}`} className="rounded-lg object-cover" />
            ))}
          </div>
          <p className="mt-6 text-gray-700">{event.description}</p>
          <div className="flex text-xl mt-6">
            <MdOutlineWatchLater className='text-2xl text-[#E32359] font-light mr-2'/>
            <p className=" text-gray-800 font-semibold">Duration:</p>
            <p className=" text-gray-600 ">&nbsp; 1 hour, 15 minutes</p>
          </div>
          <div className="flex text-xl mt-6">
            <MdOutlineCancel className='text-2xl text-[#E32359] font-light mr-2'/>
            <p className=" text-gray-800 font-semibold">Cancellation:</p>
            <p className=" text-gray-600 ">&nbsp; 24 hours</p>
          </div>
        </div>
        <ReservationCard event={event} />
      </div>

    </div>
  );
};

export default EventDetails;
