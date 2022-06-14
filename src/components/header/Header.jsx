import React from "react";
import Canvas from "./Canvas";
import "./Header.css";
import { useState, useEffect, useRef, useContext } from "react";
import { faArrowDown, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import AppContext from "../../helpers/AppContext";
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Header() {
  const [navIsFixedTop, setNavIsFixedTop] = useState(false);
  const [navIsHidden, setNavIsHidden] = useState(true);
  const [arrowIsHidden, setArrowIsHidden] = useState(true);
  const [navIsNotShown, setNavIsNotShown] = useState(false);
  const navWrapRef = useRef(null);
  const barWrapRef = useRef(null);
  const introRef = useRef(null);
  const { isMobile } = useContext(AppContext);
  const toggleArrow = () => {
    setArrowIsHidden(!arrowIsHidden);
  };
  const toggleNav = () => {
    if (isMobile) {
      if (navIsNotShown) {
        gsap.to(navWrapRef.current, { x: 0 });
     
        setNavIsNotShown(!navIsNotShown);
        return;
      }
      gsap.to(navWrapRef.current, { x: 1000 });
  
      setNavIsNotShown(!navIsNotShown);
      return;
    }
  };

  useEffect(() => {
    if (isMobile) {
      gsap.to(navWrapRef.current, { x: -1000 });
    }
    window.addEventListener("scroll", function () {
      if (window.pageYOffset === 0) {
        setNavIsHidden(true);
        return;
      }
      if (window.pageYOffset >= window.innerHeight) {
        setNavIsFixedTop(true);
        setNavIsHidden(false);
        return;
      }
      setNavIsFixedTop(false);
      setNavIsHidden(false);
    });
  }, []);
  useEffect(()=>{
     gsap.fromTo(introRef.current,{opacity:0},{opacity:1,duration:3},)
  },[])
  return (
    <section id="home" className="header">
      <Canvas className="header-canvas" />
      <div className="header-content">
        <div className="header-content-intro" ref={introRef}>
          Hello, I'm{" "}
          <span className="header-content-intro-name">Sahbi Kardi</span>.
          <br />
          And I'am a Full-Stack Web Developer.
        </div>

        <div
          className="header-content-intro-button"
          onMouseEnter={toggleArrow}
          onMouseLeave={toggleArrow}
        >
          <Link
            activeClass="active"
            to="projects"
            spy={true}
            smooth={true}
            offset={0}
            duration={1000}
          >
            View my work{" "}
            {!arrowIsHidden ? <FontAwesomeIcon icon={faArrowDown} /> : null}
          </Link>
        </div>

        <nav
          className={`header-content-nav ${
            navIsFixedTop ? "sticky" : "bottom"
          } ${navIsHidden ? "hidden" : ""}`}
        >
          <div className="header-content-nav-container">
            <ul className="header-content-nav-wrap" ref={navWrapRef}>
              <li className=" header-content-nav-link">
                <Link
                  activeClass="active"
                  to="home"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                >
                  home{" "}
                </Link>
              </li>
              <li className="header-content-nav-link">
                <Link
                  activeClass="active"
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                >
                  about
                </Link>
              </li>
              <li className="header-content-nav-link">
                <Link
                  activeClass="active"
                  to="projects"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                >
                  portfolio
                </Link>
              </li>
              <li className="header-content-nav-link">
                <Link
                  activeClass="active"
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                >
                  contact
                </Link>
              </li>
            </ul>
            <div className="header-content-nav-bars--wrap" ref={barWrapRef}>
              {" "}
              <FontAwesomeIcon icon={faBars} onClick={toggleNav} />
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}

export default Header;
