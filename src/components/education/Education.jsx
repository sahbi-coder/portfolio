import React from "react";
import Title from "../title/Title";
import { useRef, useEffect } from "react";
import "./education.css";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const pdf = require("../../pdf/sahbi kardi cv.pdf");

function Education() {
  const educationRef = useRef();
  const downLoadRef = useRef();
  const linksRef = useRef([]);
  const itemsRef = useRef([]);
  const setItemsRef= (el, i) => {
    const { current } = itemsRef;
    current[i] = el;
  };
  const setLinksRef= (el, i) => {
    const { current } = linksRef;
    current[i] = el;
  };


  useEffect(() => {
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".projects",
        start: "bottom center",
      },
    });
    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".projects",
        start: "bottom center",
      },
    });

    itemsRef.current.forEach(function (item, index) {
      gsap.to(item, {
        x: -1000
      
      });
    });
    gsap.to(downLoadRef.current,{x:-1000})
    linksRef.current.forEach(function (project, index) {
      gsap.to(project, {
        x: 1000
       
      });
    });

    itemsRef.current.forEach(function (item, index) {
      t1.to(item, { x: 0,duration:0.5});
    });
    t1.to(downLoadRef.current,{ x: 0,duration:0.5})
    linksRef.current.forEach(function (link, index) {
      t2.to(link, { x: 0,duration:1});
    });
  }, []);

  function downloadFile(fileURL, fileName) {
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = fileName;
    link.click();
  }

  const fileURL = pdf;
  const fileName = "sahbiKardiCv.pdf";

  return (
    <section id="education" className="education">
      <Title title="EDUCATION" titleRef={educationRef} section=".education" />
      <div className="education-wrap">
        <div className="education-left">
          <div className="education-left-wrapper">
            <div className="education-left-wrapper-item" ref={(el) => setItemsRef(el, 0)}>
              <h3 className="education-left-wrapper-duration">2017 to 2021:</h3>
              <div className="education-left-wrapper-degree">
                <b>degree: </b>tunisian engineering degree in EE.
              </div>
              <div className="education-left-wrapper-institute">
                <b>institute:</b> ENSIT
              </div>
            </div>
            <div className="education-left-wrapper-item" ref={(el) => setItemsRef(el, 1)}>
              <h3 className="education-left-wrapper-duration">2015 to 2017:</h3>
              <div className="education-left-wrapper-degree">
                pre engineeting studies{" "}
              </div>
              <div className="education-left-wrapper-institute">
                <b>institute: </b>IPEIM
              </div>
            </div>
            <button
              className="cv-button"
              onClick={() => downloadFile(fileURL, fileName)}
              ref={downLoadRef}
            >
              DOWNLOAD CV <FontAwesomeIcon icon={faDownload} />
            </button>
          </div>
        </div>
        <div className="education-right">
          <div
            className="education-right-ipeim"
            onClick={() => {
              window.open("https://ipeim.rnu.tn", "_blank");
            }}
            style={{ cursor: "pointer" }}
            ref={(el) => setLinksRef(el, 0)}
          >
            IPEIM
          </div>

          <div
            className="education-right-ensit"
            onClick={() => {
              window.open("http://www.ensit.tn/", "_blank");
            }}
            style={{ cursor: "pointer" }}
            ref={(el) => setLinksRef(el, 1)}
          >
            ENSIT
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
