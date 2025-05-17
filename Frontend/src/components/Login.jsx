import { useContext, useState } from 'react';
import ReactModal from 'react-modal';
import { IoCloseSharp } from "react-icons/io5";
import { AppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { login } from '../services/auth';
import OAuth from './OAuth';
function LoginModal() {
  
  const {isLoginModal, setIsLoginModal, modalStyleObject, setIsSignUpModal} = useContext(AppContext);
  const loginStyleObject = {...modalStyleObject, content: {...modalStyleObject.content, height: "72vh"}}
  const {t} = useTranslation();
  const [loginData, setLoginData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  // a function that handles the change of the input fields
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value
    });
  }
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
      mutationFn: () => login({ email : loginData.email, password: loginData.password  }),
      onSuccess: async() => {
          await queryClient.invalidateQueries({ queryKey: ['user'] });
          setIsLoginModal(false);
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
                <input required type="email" id = 'email' onChange={handleChange} className='border border-gray-200 rounded outline-none p-2'/>
                <label className='font-medium'>{t("log.password")}</label>
                <input required type="password" id = 'password' onChange={handleChange} className='border border-gray-200 rounded outline-none p-2'/>
                <button disabled = {isPending} type="submit" className='border bg-[#E32359] text-white text-2xl font-semibold p-2 rounded mt-2 cursor-pointer'>{isPending ? t("log.loading") : t("log.login")}</button>
            </form>
            {/*line break*/}
            <span className="m-3 text-gray-500">{t("log.or")}</span>
            {/* Google authentication */}
            <OAuth />

            <p className='text-sm mt-6'>{t("log.dont")}<span className='hover:underline cursor-pointer' onClick={() => { setIsLoginModal(false), setIsSignUpModal(true) }}>{t("log.signup")}</span></p>

            {errorMessage && <p className='text-red-500 text-sm mt-2'>{t("log.wrong")}</p>}
            <button onClick={() => setIsLoginModal(false)} className='absolute top-4 right-2 cursor-pointer'>
                <IoCloseSharp className='text-2xl'/>
            </button>
        </div>
      </ReactModal>
    </div>
  );

}
export default LoginModal