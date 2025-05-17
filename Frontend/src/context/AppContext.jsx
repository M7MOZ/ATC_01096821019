/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isSignUpModal, setIsSignUpModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const modalStyleObject = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      height: "84vh",
      top: '55%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-55%, -50%)',
      width: '400px',
      padding: '20px',
      backgroundColor: '#F8F8F5'
    },
  }
  
  return (
    <AppContext.Provider value={{ isSignUpModal, setIsSignUpModal, isLoginModal, setIsLoginModal, modalStyleObject }}>
      {children}
    </AppContext.Provider>
  );
};
export {AppProvider, AppContext};