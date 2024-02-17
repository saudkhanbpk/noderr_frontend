import React, { useEffect } from "react";
import "./App.css";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import { useTheme } from "./themeContext/themeContext";
import AOS from "aos";
import "aos/dist/aos.css";


const Home = React.lazy(() => import("./pages/home"));

function App() {
  const { theme } = useTheme();
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  document.body.setAttribute("data-theme", theme);

  return (
    <Suspense>
      <Header />
      {/* <div className="container"> */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {/* </div> */}
    </Suspense>
  );
}

export default App;
