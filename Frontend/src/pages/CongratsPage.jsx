import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchEventById } from '../services/events';
import EventCard from '../components/EventCard';
import { useUser } from '../hooks/authHooks';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {Spinner} from '../ui/Spinner';


const CongratsPage = () => {
  const { data: user } = useUser();
  const {t} = useTranslation();
  const fetchReservedEvents = async () => {
    const reservedIds = user.reservedEvents;
    const events = await Promise.all(reservedIds?.map(id => fetchEventById(id)));
    return events;
  };
  const { data: events, isLoading } = useQuery({
    queryKey: ['reservedEvents'],
    queryFn: fetchReservedEvents,
    enabled: !!user?.reservedEvents?.length,
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries(['user']);
    queryClient.invalidateQueries(['reservedEvents']);
  }, [user]);
  
  if (isLoading) return <Spinner/>;
  
  return (
    <div className="p-10 mt-20">
      <h1 className="text-2xl font-semibold mb-4">{t("events.congratulations")}</h1>
      <h1 className="font-semibold mb-4 text-gray-500">{t("events.bookedEvents")}</h1>
      <div className="flex gap-4 flex-wrap">
        {events?.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default CongratsPage;
