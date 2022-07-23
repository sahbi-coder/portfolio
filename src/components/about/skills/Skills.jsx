import "./Skills.scss";
import { useRef, useEffect, useContext, useState } from "react";
import SpeedometerIcon from "mdi-react/SpeedometerIcon";
import CellphoneLinkIcon from "mdi-react/CellphoneLinkIcon";
import LightbulbOnIcon from "mdi-react/LightbulbOnIcon";
import RocketIcon from "mdi-react/RocketIcon";
import AppContext from "../../../helpers/AppContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Skills() {
  const { isMobile } = useContext(AppContext);
  const [count, setCount] = useState(0);
  const itemsRef = useRef([]);
  itemsRef.current = [];
  const pRef = useRef(null);

  const setRefs = (e, i) => {
    const { current } = itemsRef;
    current[i] = e;
  };
  useEffect(() => {
    setCount((count) => count + 1);
  }, [isMobile]);

  useEffect(() => {
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".intro",
        start: "bottom center",
      },
    });
    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".skills-left",
        start: "bottom center",
       
      },
    });
    const t3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".intro",
        start: "bottom center",
      },
    });
    itemsRef.current.forEach((ref) => {
      gsap.to(ref, { x: -1000 });
    });
    gsap.to(pRef.current, { opacity: 0});
    if (count) {
      if (isMobile) {
        itemsRef.current.forEach((ref) => {
          t1.to(ref, { x: 0 });
        });

        t2.to(pRef.current, { opacity: 1,duration:2 });
      } else {
        itemsRef.current.forEach((ref) => {
          t1.to(ref, { x: 0});
        });

        t3.to(pRef.current, { opacity: 1,duration:2 });
      }
    }
  }, [count, isMobile]);

  return (
    <div className="skills ">
      <div className="skills-left">
        <div className="skills-left-grid">
          <div
            className=" skills-left-gird-item"
            ref={(el) => {
              setRefs(el, 0);
            }}
          >
            <div className="  skills-left-grid-item-body">
              <SpeedometerIcon />
            </div>
            <div className="skills-left-grid-item-catch">Fast</div>
            <div className="skills-left-grid-item-body-text">
              my apps have fast load times and are lag free.
            </div>
          </div>
          <div
            className=" skills-left-gird-item"
            ref={(el) => {
              setRefs(el, 1);
            }}
          >
            <div className="  skills-left-grid-item-body">
              <CellphoneLinkIcon />
            </div>
            <div className="skills-left-grid-item-catch">Responsive</div>
            <div className="skills-left-grid-item-body-text">
              My layouts will work on any device, big or small.
            </div>
          </div>

          <div
            className=" skills-left-gird-item"
            ref={(el) => {
              setRefs(el, 2);
            }}
          >
            <div className="skills-left-grid-item-body ">
              <LightbulbOnIcon />
            </div>
            <div className="skills-left-grid-item-catch">Intuitive</div>
            <div className="skills-left-grid-item-body-text">
              Strong preference for easy to use, intuitive UX/UI.
            </div>
          </div>
          <div
            className=" skills-left-gird-item"
            ref={(el) => {
              setRefs(el, 3);
            }}
          >
            <div className=" skills-left-grid-item-body">
              <RocketIcon />
            </div>
            <div className="skills-left-grid-item-catch">Dynamic</div>
            <div className="skills-left-grid-item-body-text">
              no static websites, I make pages come to life.
            </div>
          </div>
        </div>
      </div>

      <div className="skills-right" ref={pRef}>
        my work has these criterias, take a look below.
      </div>
    </div>
  );
}

export default Skills;
