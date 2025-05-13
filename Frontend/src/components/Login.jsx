import { useContext, useState } from 'react';
import ReactModal from 'react-modal';
import { IoCloseSharp } from "react-icons/io5";
import { AppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import OAuth from './OAuth';
function LoginModal() {
  
  const {isLoginModal, setIsLoginModal, modalStyleObject, setUser, setIsSignUpModal} = useContext(AppContext);
  const loginStyleObject = {...modalStyleObject, content: {...modalStyleObject.content, height: "72vh"}}
  const {t} = useTranslation();
  const [loginData, setLoginData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // a function that handles the change of the input fields
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value
    });
  }
  // a function that handles the submit of the form
  // it sends a post request to the server with the data of the form
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      setLoading(true);
      setError(false);

      const { data } = await axios.post("/api/auth/login", loginData, {
      headers: {
        "Content-Type": "application/json"
      }
    });
      setUser(data);
      
      setIsLoginModal(false);
    }
    catch(err){
      console.log(err);
      setLoading(false);
      setError(true);
    }
    finally{
      setLoading(false);
    }
    
  }
  return (
    <div>
      <button className="cursor-pointer hover:text-[#E32359]" onClick={() => setIsLoginModal(true)}>{t("log.login")}</button>
      <ReactModal
        isOpen={isLoginModal}
        onRequestClose={() => setIsLoginModal(false)}
        contentLabel="Login Modal"
        style={loginStyleObject}
      >
        <div className='flex flex-col items-center py-5 px-10'>
            <h2 className='text-4xl font-bold mb-5'>{t("log.login")}</h2>
            <form className='space-y-2.5 flex flex-col w-full' onSubmit={handleSubmit}>
                <label className='font-medium'>{t("log.email")}</label>
                <input type="email" id = 'email' onChange={handleChange} className='border border-gray-200 rounded outline-none p-2'/>
                <label className='font-medium'>{t("log.password")}</label>
                <input type="password" id = 'password' onChange={handleChange} className='border border-gray-200 rounded outline-none p-2'/>
                <button disabled = {loading} type="submit" className='border bg-[#E32359] text-white text-2xl font-semibold p-2 rounded mt-2 cursor-pointer'>{t("log.login")}</button>
            </form>
            {/*line break*/}
            <span className="m-3 text-gray-500">{t("log.or")}</span>
            {/* Google authentication */}
            <OAuth />

            <p className='text-sm mt-6'>{t("log.dont")}<span className='hover:underline cursor-pointer' onClick={() => { setIsLoginModal(false), setIsSignUpModal(true) }}>{t("log.signup")}</span></p>

            {error && <span className='text-red-500'>{t("log.error")}</span>}
            <button onClick={() => setIsLoginModal(false)} className='absolute top-4 right-2 cursor-pointer'>
                <IoCloseSharp className='text-2xl'/>
            </button>
        </div>
      </ReactModal>
    </div>
  );

}
export default LoginModal