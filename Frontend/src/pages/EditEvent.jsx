/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import { useQuery } from '@tanstack/react-query';
import { fetchEventById } from '../services/events';
import { Spinner } from '../ui/Spinner';
import { useUpdateEvent } from '../hooks/eventHooks';
const categories = [
    "trending", "tours", "families", "adventures", "dates",
    "on-the-water", "food-drink", "art-culture", "in-the-air",
    "night-owls", "shows", "seasonal", "sports"
];

function EditEvent() {
    const { id } = useParams();
    const { t } = useTranslation();

    const { data: event, isLoading } = useQuery({
        queryKey: ['event', id],
        queryFn: () => fetchEventById(id),
        enabled: !!id,
    });

    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (event) {
            setFormData({
                ...event,
                startDate: event.startDate ? new Date(event.startDate) : null,
                endDate: event.endDate ? new Date(event.endDate) : null
            });
        }
    }, [event]);
    const updateMutation = useUpdateEvent();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGalleryChange = (index, value) => {
        const newGallery = [...(formData.gallery || [])];
        newGallery[index] = value;
        setFormData(prev => ({ ...prev, gallery: newGallery }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleanGallery = formData.gallery?.filter(url => url.trim() !== '') || [];
        updateMutation.mutate({
            id,
            updatedFields: { ...formData, gallery: cleanGallery },
        });
    };

    if (isLoading || !formData) return <Spinner />;

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-20 p-10'>
            <input className='p-2 border rounded border-gray-500' name="title" value={formData.title} onChange={handleChange} required />
            <input className='p-2 border rounded border-gray-500' name="location" value={formData.location} onChange={handleChange} required />
            <input className='p-2 border rounded border-gray-500' name="price" type="number" value={formData.price} onChange={handleChange} required />
            <input className='p-2 border rounded border-gray-500' name="rating" type="number" value={formData.rating} onChange={handleChange} required max={5} />
            <textarea className='p-2 border rounded border-gray-500' name="description" value={formData.description} onChange={handleChange} required />

            <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3].map((index) => (
                    <input
                        key={index}
                        className='p-2 border rounded border-gray-500 flex-1'
                        value={formData.gallery?.[index] || ''}
                        onChange={(e) => handleGalleryChange(index, e.target.value)}
                        placeholder={`${t("admin.imageUrl")} ${index + 1}`}
                    />
                ))}
            </div>

            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className='p-2 border rounded border-gray-500'
            >
                {categories.map(cat => (
                    <option key={cat} value={cat}>
                        {t(`categories.${cat}`)}
                    </option>
                ))}
            </select>

            <DatePicker
                selected={formData.startDate}
                onChange={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                className="border border-gray-500 rounded p-2 outline-none w-full"
                placeholderText={t("admin.startDate")}
            />

            <DatePicker
                selected={formData.endDate}
                onChange={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
                minDate={formData.startDate || new Date()}
                className="border border-gray-500 rounded p-2 outline-none w-full"
                placeholderText={t("admin.endDate")}
            />

            <button type="submit" disabled={updateMutation.isPending} className='cursor-pointer'>
                {updateMutation.isPending ? t("log.loading") : t("admin.edit")}
            </button>
        </form>
    );
}

export default EditEvent;
