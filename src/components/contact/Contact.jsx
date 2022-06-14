import "./contact.css";

import Phone from "mdi-react/PhoneIcon";
import Email from "mdi-react/EmailIcon";
import Title from "../title/Title";
import { useRef, useState, useEffect, useContext } from "react";
import emailjs from "emailjs-com";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AppContext from "../../helpers/AppContext";
gsap.registerPlugin(ScrollTrigger);
const Contact = () => {
  const formRef = useRef();
  const contactRef = useRef(null);
  const [done, setDone] = useState(false);
  const { isMobile } = useContext(AppContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_mjuvt7h",
        "template_rorkvgc",
        formRef.current,
        "BK8il4Gnc3bSKkeYy"
      )
      .then(
        (result) => {
          console.log(result.text);
          setDone(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  useEffect(() => {
  
      gsap.to(".contact-wrap", { opacity: 0 });

      const t = gsap.timeline({
        scrollTrigger: {
          trigger: ".projects",
          start: "center top",
        },
      });

      t.to(".contact-wrap", {
        opacity: 1,
      });
    
  }, []);

  return (
    <section id="contact" className="contact">
      <Title title="CONTACT" titleRef={contactRef} section=".contact" />

      <div className="contact-wrap">
        <div className="contact-left">
          <h1 className="contact-title">Let's discuss your project</h1>
          <div className="contact-info">
            <div className="contact-info-item">
              <Phone />
              +216 53 054 213
            </div>

            <div className="contact-info-item">
              <Email />
              sahbikardipl@gmail.com
            </div>
          </div>
        </div>
        <div className="contact-right">
          <p className="contact-desc">
            Get in touch. Always available for freelancing if the right project
            comes along.
          </p>
          <form ref={formRef} onSubmit={handleSubmit}>
            <input
              style={{ backgroundColor: "#333" }}
              type="text"
              placeholder="Name"
              name="user_name"
            />
            <input
              style={{ backgroundColor: "#333" }}
              type="text"
              placeholder="Subject"
              name="user_subject"
            />
            <input
              style={{ backgroundColor: "#333" }}
              type="text"
              placeholder="Email"
              name="user_email"
            />

            <textarea
              style={{ backgroundColor: "#333" }}
              rows="5"
              placeholder="Message"
              name="message"
            />
            <button>Submit</button>
            {done && "Thank you..."}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
