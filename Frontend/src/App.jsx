import { useEffect } from "react";
import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import { useTranslation } from "react-i18next";
import EventsSection from "./components/EventsSection";

function App() {
  // const { i18n } = useTranslation();
  // useEffect(() => {
  //   // Set direction based on language (e.g., Arabic = 'rtl', others = 'ltr')
  //   const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
  //   document.documentElement.dir = direction; // Updates <html dir="rtl">
  // }, [i18n.language]);
  return (
    <div>
      <Header/>
      <HeroSection/>
      <EventsSection/>
    </div>
  )
}

export default App
