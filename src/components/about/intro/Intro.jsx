import "./Intro.scss";
import Images from "../../../images";
import { useRef, useEffect, useContext, useState } from "react";
import gsap from "gsap";
import AppContext from "../../../helpers/AppContext";
import Title from "../../title/Title";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Intro() {
  const { isMobile } = useContext(AppContext);
  const introRef = useRef(null);
  const wrapRef = useRef(null);
  const catchRef = useRef(null);
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount((count) => count + 1);
  }, [isMobile]);
  useEffect(() => {
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".intro",
        start: "top center",
      },
    });
    const t3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".intro",
        start: "top center",
      },
    });
    const t4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".intro",
        start: "top center",
      },
    });
    const t5 = gsap.timeline({
      scrollTrigger: {
        trigger: ".intro",
        start: "top center",
      },
    });

    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".intro-right",
        start: "bottom center",
      },
    });
    if (count) {
      if (isMobile) {
        gsap.to(bgRef.current, { opacity: 0 });
        gsap.to(introRef.current, { opacity: 0 });
        gsap.to(wrapRef.current, { opacity: 0 });
        gsap.to(catchRef.current, { opacity: 0 });
      } else {
        gsap.to(bgRef.current, { opacity: 0 });
        gsap.to(introRef.current, { x: -500 });
        gsap.to(wrapRef.current, { x: -500 });
        gsap.to(catchRef.current, { x:-500});
      }
      if (isMobile) {
        t1.to(bgRef.current, { opacity: 1 });
        t2.to(introRef.current, { opacity: 1 });
        t2.to(wrapRef.current, { opacity: 1 });
        t2.to(catchRef.current, { opacity: 1 });
      } else {
        t1.to(bgRef.current, { opacity: 1 });
        t3.to(introRef.current, { x: 0 });
        t4.to(wrapRef.current, { x: 0 });
        t5.to(catchRef.current, { x:0 });
      }
    }
  }, [isMobile, count]);
  return (
    <>
      <Title title="ABOUT" titleRef={titleRef} section=".intro" />
      <div className="intro">
        <div className="intro-left">
          <div className="intro-left-wrapper">
            <h2 className="intro-left-wrapper-intro" ref={introRef}>
              Who's this guy?
            </h2>
            <div ref={wrapRef}>
              <p className="intro-left-wrapper-desc">
                I 'am a Web Developer & programmer living in Monastir, Tunisia.
                I make web applications, usually with MERN stack.
              </p>
              <h3 className="intro-left-wrapper-name">
                I have serious passion for Web Development.
              </h3>
            </div>
            <div className="intro-left-wrapper-catch" ref={catchRef}>
              Let's make something special.
            </div>
          </div>
        </div>
        <div className="intro-right" ref={bgRef}>
          <div className="intro-bg"></div>
          <img src={Images.me} alt="" className="intro-img" />
        </div>
      </div>
    </>
  );
}

export default Intro;
