import { useContext, useState } from 'react';
import ReactModal from 'react-modal';
import { IoCloseSharp } from "react-icons/io5";
import { AppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import OAuth from './OAuth';
function SignupModal() {
  const {isSignUpModal, setIsSignUpModal, modalStyleObject, setIsLoginModal} = useContext(AppContext);
  const {t} = useTranslation();
  // a state that holds the data of the signup form
  const [signUpData, setSignUpData] = useState({});

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // a function that handles the change of the input fields
  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
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

      const { data } = await axios.post("/api/auth/signup", signUpData, {
      headers: {
        "Content-Type": "application/json"
      }
    });
      if(!data.success){
        setError(true);
        return;
      }
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
      <button className="cursor-pointer hover:text-[#E32359]" onClick={() => setIsSignUpModal(true)}>
          {t("log.signup")}
      </button>
      <ReactModal
        isOpen={isSignUpModal}
        onRequestClose={() => setIsSignUpModal(false)}
        contentLabel="Sign up Modal"
        style={modalStyleObject}
      >
        <div className='flex flex-col items-center py-5 px-10'>
          <h2 className='text-4xl font-bold mb-5'>{t("log.signup")}</h2>
          <form className='space-y-2.5 flex flex-col w-full' onSubmit={handleSubmit}>

              <label className='font-medium'>{t("log.username")}</label>
              <input type="text" id = 'username' className='border border-gray-200 rounded outline-none p-2'
              onChange={ handleChange }/>

              <label className='font-medium'>{t("log.email")}</label>
              <input type="email" id = 'email' className='border border-gray-200 rounded outline-none p-2'
              onChange={ handleChange }/>

              <label className='font-medium'>{t("log.password")}</label>
              <input type="password" id = 'password' className='border border-gray-200 rounded outline-none p-2'
              onChange={ handleChange }/>

              <button disabled = {loading} type="submit" className='border bg-[#E32359] text-white text-2xl font-semibold p-2 rounded mt-2 cursor-pointer'>
                {loading ? t("log.loading") :t("log.signup")}
              </button>
          </form>
          {/*line break*/}
          <span className="m-3 text-gray-500">{t("log.or")}</span>
          
          {/* Google authentication */}
          <OAuth />
          
          <p className='text-sm mt-6'> {t("log.already")} <span className='hover:underline cursor-pointer' onClick={() => {setIsSignUpModal(false), setIsLoginModal(true)}}>{t("log.login")}</span></p>
          
          {error && <p className='text-red-500 text-sm mt-2'>{t("log.error")}</p>}
          
          <button onClick={() => setIsSignUpModal(false)} className='absolute top-2 right-2 cursor-pointer'>
              <IoCloseSharp className='text-2xl'/>
          </button>
        </div>
      </ReactModal>
    </div>
  );

}
export default SignupModal