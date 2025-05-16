import { useQuery } from '@tanstack/react-query';
import { fetchAllEvents } from '../services/events';
import EventCard from './EventCard';
import { Spinner } from '../ui/Spinner';

function EventGrid() {  
    const { data: events, isLoading } = useQuery({
        queryKey: ['events'],
        queryFn: fetchAllEvents,
    });
    if (isLoading) return <Spinner />;
    
    return (
        <div className="force-ltr grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
            {events.map((event) => (
                <EventCard key={event._id} event={event} />
            ))}
        </div>
    )
}

export default EventGrid