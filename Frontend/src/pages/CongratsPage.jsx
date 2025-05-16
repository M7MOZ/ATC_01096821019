import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchEventById } from '../services/events';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import EventCard from '../components/EventCard';



const CongratsPage = () => {
  const {user} = useContext(AppContext);
  console.log('user:', user.reservedEvents);
  
  const fetchReservedEvents = async () => {
    const reservedIds = user.reservedEvents;
    const events = await Promise.all(reservedIds?.map(id => fetchEventById(id)));
    return events;
  };
  const { data: events, isLoading, isError } = useQuery({
    queryKey: ['reservedEvents'],
    queryFn: fetchReservedEvents,
    enabled: !!user?.reservedEvents?.length,
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries(['user']);
    queryClient.invalidateQueries(['reservedEvents']);
  }, []);
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong.</div>;
  
  return (
    <div className="p-10 mt-20 w-60% mx-auto flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">your reservation has been recorded</h1>
      <h1 className="font-semibold mb-4 text-gray-500">all your reservations:</h1>
      <div className="flex over-flow-y-auto gap-4 force-ltr">
        {events?.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default CongratsPage;
