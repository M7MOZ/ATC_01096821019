import { useState } from 'react';
import AddEvent from '../components/AddEvent';
import { useTranslation } from 'react-i18next';
    
function AdminPage() {
    const [isAdd, setIsAdd] = useState(false);
    const {t} = useTranslation();
    return (
        <div className='mt-20 p-10 '>
          
          <div className="w-[700px] mx-auto">
            <h1 className='text-3xl mb-5'>{t("admin.adminPanel")}</h1>
            <h2 onClick={() => setIsAdd(!isAdd)} className='mb-5 border border-gray-500 rounded p-2 cursor-pointer'>{t("admin.addEvent")}</h2>
            {isAdd && <AddEvent setIsAdd = {setIsAdd}/>}
          </div>
          
        </div>
    )
}

export default AdminPage