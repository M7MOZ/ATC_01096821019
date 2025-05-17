/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';

const AddEvent = ({ setIsAdd }) => {
    const [formData, setFormData] = useState({
        category: "trending",
    });
    
    const categories = [
        "trending",
        "tours",
        "families",
        "adventures",
        "dates",
        "on-the-water",
        "food-drink",
        "art-culture",
        "in-the-air",
        "night-owls",
        "shows",
        "seasonal",
        "sports",
    ];
    const { t } = useTranslation();
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGalleryChange = (index, value) => {
        const newGallery = [...(formData.gallery || [])];
        newGallery[index] = value;
        setFormData(prev => ({ ...prev, gallery: newGallery }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const galleryArray = formData.gallery 
                ? formData.gallery.filter(url => url && url.trim() !== '')
                : [];
            
            await axios.post('/api/events', { 
                ...formData, 
                gallery: galleryArray 
            });
            setIsAdd(false);
        } catch (err) {
            console.error(err);
            alert("Failed to create event");
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

            <input className='p-2 outline-none border rounded border-gray-500' name="title" placeholder={t("admin.eventName")} onChange={handleChange} required />
            <input className='p-2 outline-none border rounded border-gray-500' name="location" placeholder={t("admin.eventLocation")} onChange={handleChange} required />
            <input className='p-2 outline-none border rounded border-gray-500' name="price" type="number" placeholder={t("admin.eventPrice")} onChange={handleChange} required />
            <input className='p-2 outline-none border rounded border-gray-500' name="rating" type="number" placeholder={t("admin.eventRating")} max={5} onChange={handleChange} required />
            <textarea className='p-2 outline-none border rounded border-gray-500' name="description" placeholder={t("admin.eventDescription")} onChange={handleChange} required />
            
            <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3].map((index) => (
                    <input
                        key={index}
                        className='p-2 outline-none border rounded border-gray-500 flex-1'
                        placeholder={`${t("admin.imageUrl")} ${index + 1}`}
                        value={formData.gallery?.[index] || ''}
                        onChange={(e) => handleGalleryChange(index, e.target.value)}
                    />
                ))}
            </div>

            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className='p-2 outline-none border rounded border-gray-500'
            >
                {categories.map(cat => (
                    <option value={cat} key={cat}>
                        {t(`categories.${cat}`)}
                    </option>
                ))}
            </select>
            <DatePicker
            selected={formData.startDate}
            minDate={new Date().toISOString().split('T')[0]}
            onChange={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
            placeholderText={t("admin.startDate")}
            className="border border-gray-500 rounded p-2 outline-none w-full"
            wrapperClassName="w-full"
            />

            <DatePicker
            selected={formData.endDate}
            minDate={formData.startDate || new Date().toISOString().split('T')[0]}
            onChange={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
            placeholderText={t("admin.endDate")}
            className="border border-gray-500 rounded p-2 outline-none w-full"
            wrapperClassName="w-full"
            />
            <button type="submit" className='cursor-pointer'>{t("admin.addEvent")}</button>
        </form>
    );
};


export default AddEvent;
