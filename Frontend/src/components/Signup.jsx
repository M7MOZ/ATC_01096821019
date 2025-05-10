import { useContext, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { IoCloseSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { AppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
function SignupModal() {
  const {isSignUpModal, setIsSignUpModal} = useContext(AppContext);
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
    console.log('signUpData', signUpData.username);
    
    try{
      setLoading(true);
      setError(false);

      const { data } = await axios.post("/api/auth/signup", signUpData, {
      headers: {
        "Content-Type": "application/json"
      }
    });
      console.log('data', data);
      
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
  useEffect(() => {
      ReactModal.setAppElement('#root');
    }, []);
  return (
    <div>
      <button className="cursor-pointer bg-[#E32359] text-white px-2 py-1 rounded font-semibold w-32" onClick={() => setIsSignUpModal(true)}>
          {t("log.signup")}
      </button>
      <ReactModal
        isOpen={isSignUpModal}
        onRequestClose={() => setIsSignUpModal(false)}
        contentLabel="Sign up Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            height: "80vh",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            padding: '20px',
          },
        }}
      >
        <div className='flex flex-col items-center py-5'>
          <h2 className='text-4xl font-bold mb-5'>{t("log.signup")}</h2>
          <form className='space-y-2.5 flex flex-col w-[80%]' onSubmit={handleSubmit}>

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
          <div className="flex items-center my-3">
              <hr className="flex-grow h-px w-px border-gray-300" />
              <span className="mx-4 text-gray-500">{t("log.or")}</span>
              <hr className="flex-grow h-px w-px border-gray-300" />
          </div>
          <button type="submit" className='border bg-[#1895de] text-white p-2 rounded w-[80%] flex items-center justify-center gap-2 cursor-pointer'>
              <div className='rounded-full bg-white p-1'>
                  <FcGoogle />
              </div>
              <span>{t("log.google")}</span>
          </button>
          {/* {error && <p className='text-red-500 text-sm mt-2'>{t("log.error")}</p>} */}
          <button onClick={() => setIsSignUpModal(false)} className='absolute top-2 right-2 cursor-pointer'>
              <IoCloseSharp className='text-2xl'/>
          </button>
        </div>
      </ReactModal>
    </div>
  );

}
export default SignupModal