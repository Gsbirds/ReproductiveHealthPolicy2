import "./App.css";
import Nav from "./Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown2 from "./abortion-dropdown2";
import { useState, useEffect } from "react";
import Contact from "./contact";
import Footer from "./footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./Chat";

function App() {
  const [dark, setDark] = useState("darkmode");
  const [darkcont, setDarkcont] = useState("darkCont");
  const [darkButton, setDarkButton] = useState("button");
  const [darkDrop, setDarkDrop] = useState("");

  const changeStyle = () => {
    if (dark == "darkmode") {
      setDarkDrop("lightDrop");
      setDarkButton("lightButton");
      setDark("lightmode");
      setDarkcont("lightCont");
      document.body.style.backgroundColor = "white";
    } else {
      setDarkDrop("");
      setDarkButton("Darkbutton");
      setDark("darkmode");
      setDarkcont("darkCont");
      document.body.style.backgroundColor = "#192841";
    }
  };
  return (
    <>
      <BrowserRouter>
      <div className="content">
        <Nav />
        <div className={`App ${dark}`}>
        <button onClick={changeStyle} className="dark"></button>
          <Routes>
            <Route path="/" element={<Dropdown2 dark={dark} darkcont={darkcont}/>} />
            <Route path="/contact" element={<Contact dark={dark} darkcont={darkcont}/>} />
          </Routes>
        </div>
        {/* <div className="construction-container">
          <div className="construction-content">
            <h1>🚧 Under Construction 🚧</h1>
            <p>We're working hard to bring you accurate, up to date info!</p>
            <p>Please check back soon.</p>
          </div>
        </div> */}
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
