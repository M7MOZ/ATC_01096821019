import { useContext, useState } from 'react';
import ReactModal from 'react-modal';
import { IoCloseSharp } from "react-icons/io5";
import { AppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import OAuth from './OAuth';
import { signUp } from '../services/auth';
import { useMutation } from '@tanstack/react-query';
function SignupModal() {
  const {isSignUpModal, setIsSignUpModal, modalStyleObject, setIsLoginModal, setUser} = useContext(AppContext);
  const {t} = useTranslation();
  // a state that holds the data of the signup form
  const [signUpData, setSignUpData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  // a function that handles the change of the input fields
  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.id]: e.target.value
    });
  }
  // a function that handles the submit of the form
  // it sends a post request to the server with the data of the form
  const { mutate, isPending } = useMutation({
      mutationFn: () => signUp({ username : signUpData.username, email : signUpData.email, password: signUpData.password  }),
      onSuccess: (data) => {
          setUser(data);
          console.log(data);
          setIsSignUpModal(false);
      },
      onError: (error) => {
          if (error.response && error.response.data) {
              setErrorMessage(error.response.data.message);
          } else {
              setErrorMessage("Something went wrong!");
          }
      }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
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
              <input required type="text" id = 'username' className='border border-gray-200 rounded outline-none p-2'
              onChange={ handleChange }/>

              <label className='font-medium'>{t("log.email")}</label>
              <input required type="email" id = 'email' className='border border-gray-200 rounded outline-none p-2'
              onChange={ handleChange }/>

              <label className='font-medium'>{t("log.password")}</label>
              <input required type="password" id = 'password' className='border border-gray-200 rounded outline-none p-2'
              onChange={ handleChange }/>

              <button disabled = {isPending} type="submit" className='border bg-[#E32359] text-white text-2xl font-semibold p-2 rounded mt-2 cursor-pointer'>
                {isPending ? t("log.loading") :t("log.signup")}
              </button>
          </form>
          {/*line break*/}
          <span className="m-3 text-gray-500">{t("log.or")}</span>
          
          {/* Google authentication */}
          <OAuth />
          
          <p className='text-sm mt-6'> {t("log.already")} <span className='hover:underline cursor-pointer' onClick={() => {setIsSignUpModal(false), setIsLoginModal(true)}}>{t("log.login")}</span></p>
          
          {errorMessage && <p className='text-red-500 text-sm mt-2'>{t("log.exists")}</p>}
          
          <button onClick={() => setIsSignUpModal(false)} className='absolute top-2 right-2 cursor-pointer'>
              <IoCloseSharp className='text-2xl'/>
          </button>
        </div>
      </ReactModal>
    </div>
  );

}
export default SignupModal