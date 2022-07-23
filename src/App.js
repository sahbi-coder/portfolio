import About from "./components/about/About";
import Header from "./components/header/Header";
import { useState, useEffect } from "react";
import AppContext from "./helpers/AppContext";
import Projects from "./components/projects/Projects";
import Contact from "./components/contact/Contact";
import Education from "./components/education/Education";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const toggleIdMobile = () => {
      const windowIsMobile = window.matchMedia(
        "only screen and (max-width: 760px)"
      ).matches;
    

      if (windowIsMobile) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    toggleIdMobile();
    window.addEventListener("resize", toggleIdMobile);
  }, []);

  return (
    <div className="App">
      <AppContext.Provider value={{ isMobile }}>
        <Header />
        <About />
        <Projects />
        <Education/>
        <Contact />
      </AppContext.Provider>
    </div>
  );
}

export default App;
