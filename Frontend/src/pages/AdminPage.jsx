import { useState } from 'react';
import { t } from 'i18next';    
import AddEvent from '../components/AddEvent';
    
function AdminPage() {
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
  const [formData, setFormData] = useState({});
    const [isAdd, setIsAdd] = useState(false);

  return (
    <div className='mt-20 p-10 '>
      
      <div className="w-[700px] mx-auto">
        <h1 className='text-3xl mb-5'>Admin Panel</h1>
        <h2 onClick={() => setIsAdd(!isAdd)} className='mb-5 border border-gray-500 rounded p-2 cursor-pointer'>Add New Event</h2>
        {isAdd && <AddEvent/>}
      </div>
      
    </div>
  )
}

export default AdminPage