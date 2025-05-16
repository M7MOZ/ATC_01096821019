import { useQuery } from '@tanstack/react-query';
import { fetchEventById } from '../services/events';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';



const CongratsPage = () => {
  const {user} = useContext(AppContext);
  console.log('user:', user.reservedEvents);
  
  const fetchReservedEvents = async () => {
    const reservedIds = user.reservedEvents;
    const events = await Promise.all(reservedIds.map(id => fetchEventById(id)));
    return events;
  };
  const { data: events, isLoading, isError } = useQuery({
    queryKey: ['reservedEvents'],
    queryFn: fetchReservedEvents,
    enabled: !!user?.reservedEvents?.length,
  });
  console.log('events:', events);
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong.</div>;
  
  return (
    <div className="p-10 mt-20">
      <h1 className="text-2xl font-semibold mb-4">your reservation has been recorded</h1>
      <h1 className="font-semibold mb-4 text-gray-500">all your reservations:</h1>
      <ul className="space-y-4">
        {events.map(event => (
          <li key={event._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p>{event.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CongratsPage;
