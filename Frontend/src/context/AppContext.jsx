/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/auth";
import axios from "axios";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isSignUpModal, setIsSignUpModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);
  const [isEventModal, setIsEventModal] = useState(false);
  const [isAddEventModal, setIsAddEventModal] = useState(false);
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

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
  useEffect(() => {
    if (userData) {
      setUser(userData);
      console.log('userData:', userData);
    }
  }, [userData]);
    // useEffect(() => {
    //   const fetchUser = async () => {
    //     try {
    //       const { data } = await axios.get("/api/auth/me", { withCredentials: true });
    //       setUser(data);
          
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
      
    //   fetchUser();
    // }, []);
  
  return (
    <AppContext.Provider value={{ isSignUpModal, setIsSignUpModal, isLoginModal, setIsLoginModal, modalStyleObject, user, setUser, events, setEvents, isEventModal, setIsEventModal, isAddEventModal, setIsAddEventModal }}>
      {children}
    </AppContext.Provider>
  );
};
export {AppProvider, AppContext};