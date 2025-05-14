import { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import EventCard from './EventCard';

function EventGrid() {  
    const { events } = useContext(AppContext);
    return (
        <div className="force-ltr grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
            {events.map((event) => (
                <EventCard key={event._id} event={event} />
            ))}
        </div>
    )
}

export default EventGrid