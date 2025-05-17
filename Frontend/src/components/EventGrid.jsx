/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query';
import { fetchAllEvents } from '../services/events';
import EventCard from './EventCard';
import { Spinner } from '../ui/Spinner';
import { useTranslation } from 'react-i18next';

function EventGrid({ selectedCategory }) {  
    const {t} = useTranslation();
    const { data: events, isLoading } = useQuery({
        queryKey: ['events'],
        queryFn: fetchAllEvents,
    });
    const filteredEvents = events?.filter((event) => {
        return event.category === selectedCategory;
    });
    if (isLoading) return <Spinner />;
    return (
        <div className="force-ltr grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
            { filteredEvents.length? filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
            )
            ) : (
                <div className="col-span-4 text-center">
                    <h1 className="text-xl font-semibold text-gray-500">{t("events.stayTuned")}</h1>
                </div>
            )}
        </div>
    )
}

export default EventGrid