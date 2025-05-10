/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isSignUpModal, setIsSignUpModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  return (
    <AppContext.Provider value={{ isSignUpModal, setIsSignUpModal, isLoginModal, setIsLoginModal }}>
      {children}
    </AppContext.Provider>
  );
};
export {AppProvider, AppContext};