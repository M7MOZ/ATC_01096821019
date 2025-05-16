/* eslint-disable react/prop-types */
import axios from 'axios';
import { t } from 'i18next';

const AddEvent = ({ formData, setFormData }) => {
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
        } catch (err) {
            console.error(err);
            alert("Failed to create event");
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input className='p-2 outline-none border rounded border-gray-500' name="title" placeholder="Title" onChange={handleChange} required />
            <input className='p-2 outline-none border rounded border-gray-500' name="location" placeholder="Location" onChange={handleChange} required />
            <input className='p-2 outline-none border rounded border-gray-500' name="price" type="number" placeholder="Price" onChange={handleChange} required />
            <input className='p-2 outline-none border rounded border-gray-500' name="rating" type="number" placeholder="Rating" max={5} onChange={handleChange} required />
            <input className='p-2 outline-none border rounded border-gray-500' name="image" placeholder="Main Image URL" onChange={handleChange} required />
            <textarea className='p-2 outline-none border rounded border-gray-500' name="description" placeholder="Description" onChange={handleChange} required />
            
            <div className="flex gap-2">
                {[0, 1, 2].map((index) => (
                    <input
                        key={index}
                        className='p-2 outline-none border rounded border-gray-500 flex-1'
                        placeholder={`Gallery URL ${index + 1}`}
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
            <input
                placeholder='start date'
                type="date"
                name="startDate"
                value={formData.startDate}
                min={new Date().toISOString().split('T')[0]} 
                onChange={handleChange}
                required
            />
            <input
                placeholder='end date'
                type="date"
                name="endDate"
                value={formData.endDate}
                min={formData.startDate || new Date().toISOString().split('T')[0]}
                onChange={handleChange}
                required
            />
            <button type="submit">Create Event</button>
        </form>
    );
};


export default AddEvent;
