import { useEffect } from "react";
import Header from "./components/Header"
import ReactModal from "react-modal";
import Categories from "./components/Categories";
function App() {
  useEffect(() => {
    ReactModal.setAppElement('#root');
  }, []);
  return (
    <div>
      <Header/>
      {/* <Categories/> */}
    </div>
  )
}

export default App
