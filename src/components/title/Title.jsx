import "./title.css";
import gsap from "gsap";
import { useEffect, useRef } from "react";
function Title({ title, titleRef, section }) {
  const textDecoratorRef = useRef(null);
  useEffect(() => {
    gsap.to(titleRef.current, { x: 1000 });
    gsap.to(textDecoratorRef.current, { x: -1000 });
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center",
      },
    });

    t1.to(titleRef.current, { x: 0 });
    t1.to(textDecoratorRef.current, { x: 0 });
  }, []);
  return (
    <div className="title-wrap">
      <h2 className="title" ref={titleRef}>
        {title}
      </h2>
      <div className="title-dec" ref={textDecoratorRef}></div>
    </div>
  );
}

export default Title;
