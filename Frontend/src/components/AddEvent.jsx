/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { t } from 'i18next';

const AddEventModal = ({ onClose, onSuccess }) => {
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
    const {isAddEventModal, setIsAddEventModal, modalStyleObject} = useContext(AppContext);
    const [formData, setFormData] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const galleryArray = formData.gallery.split(',').map(url => url.trim());
            await axios.post('/api/events', { ...formData, gallery: galleryArray });
            onSuccess(); 
            onClose();   
        } catch (err) {
            console.error(err);
            alert("Failed to create event");
        }
    };
    

    return (
        <div>
            <button className='cursor-pointer hover:underline' onClick={() => setIsAddEventModal(true)}>{t("header.addEvent")}</button>
            <ReactModal
                isOpen={isAddEventModal}
                onRequestClose={onClose}
                contentLabel="Add New Event"
                style={modalStyleObject}
                >
                <h2 className='mb-5'>Add New Event</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input className='p-2 outline-none border rounded border-gray-500' name="title" placeholder="Title" onChange={handleChange} required />
                    <input className='p-2 outline-none border rounded border-gray-500' name="location" placeholder="Location" onChange={handleChange} required />
                    <input className='p-2 outline-none border rounded border-gray-500' name="price" type="number" placeholder="Price" onChange={handleChange} required />
                    <input className='p-2 outline-none border rounded border-gray-500' name="rating" type="number" placeholder="Rating" max={5} onChange={handleChange} required />
                    <input className='p-2 outline-none border rounded border-gray-500' name="image" placeholder="Main Image URL" onChange={handleChange} required />
                    <textarea className='p-2 outline-none border rounded border-gray-500' name="description" placeholder="Description" onChange={handleChange} required />
                    <input className='p-2 outline-none border rounded border-gray-500' name="gallery" placeholder="Gallery URLs (comma separated)" onChange={handleChange} required />
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
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </ReactModal>
        </div>
    );
};

export default AddEventModal;
