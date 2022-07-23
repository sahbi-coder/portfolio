import "./contact.css";

import Phone from "mdi-react/PhoneIcon";
import Email from "mdi-react/EmailIcon";
import Title from "../title/Title";
import { useRef, useState, useEffect, useContext } from "react";
import emailjs from "emailjs-com";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AppContext from "../../helpers/AppContext";
import ReCAPTCHA from "react-google-recaptcha";
gsap.registerPlugin(ScrollTrigger);
const Contact = () => {
  const [verfied, setVerifed] = useState(false);
  const formRef = useRef();
  const contactRef = useRef(null);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const { isMobile } = useContext(AppContext);
  function onChange(value) {
    setVerifed(true);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        formRef.current,
        process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY
      )
      .then(
        (result) => {
          setDone(true);
          setError(false);
        },
        (error) => {
          setDone(false);
          setError(true);
        }
      );
  };

  useEffect(() => {
    gsap.to(".contact-wrap", { opacity: 0 });

    const t = gsap.timeline({
      scrollTrigger: {
        trigger: ".education",
        start: "center top",
      },
    });

    t.to(".contact-wrap", {
      opacity: 1,
      duration: 1,
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
            <button disabled={!verfied}>Submit</button>
            {done && (
              <span style={{ color: "green", padding: 2 }}>Thank you..</span>
            )}
            {error && (
              <span style={{ color: "red", padding: 2 }}>
                oops ! something went wrong...
              </span>
            )}
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_SITE_KEY}
              onChange={onChange}
              style={{ marginTop: 5 }}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
