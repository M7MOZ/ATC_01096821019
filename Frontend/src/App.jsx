import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header"
import ReactModal from "react-modal";
import EventDetails from "./pages/EventDetails";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
function App() {
  useEffect(() => {
    ReactModal.setAppElement('#root');
  }, []);
  return (
    <div className="">
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  )
}

export default App
