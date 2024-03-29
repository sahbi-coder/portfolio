import "./projects.scss";
import { useRef, useEffect, useState } from "react";
import Title from "../title/Title";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Images from "../../images";
gsap.registerPlugin(Flip);
gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const projectsData = [
    {
      id: "66dccd6b45fab529c10583c7eabd974c",
      category: "React",
      name: "Watermark app",
      img: Images.watermark,
      link: "https://github.com/sahbi-coder/watermark-app",
      demoLink: "https://watermark-app.vercel.app/",
    },
    {
      id: "19f15869ca42ec22e3af68748c358f2e",
      category: "React",
      name: "Google drive colone",
      img: Images.drive,
      link: "https://github.com/sahbi-coder/google-drive-clone",
      demoLink: "https://sahbi-coder.github.io/google-drive-clone",
    },
    {
      id: "7abb9ed363c90128d0ddd6d9b687e771",
      category: "React/Node.js",
      name: "freelance work",
      img: Images.freelance,
      link: "https://github.com/sahbi-coder/freelance-portfolio",
      demoLink: "https://oussamajedda.com",
    },
    {
      id: "7abb9ed363c90128d0dfd6d9b687e772",
      category: "React",
      name: "Little Home Page",
      img: Images.homePage,
      link: "https://github.com/sahbi-coder/test-integration",
      demoLink: "https://demo-project-flame.vercel.app/",
    },

    {
      id: "7abb9ed363c90128d0dfd6d9b687e773",
      category: "React/Node.js",
      name: "Demo Ecommerce Website",
      img: Images.eCommerce,
      link: "https://github.com/sahbi-coder/e-commerce-react",
      demoLink: "https://react-ecommerce-steel-gamma.vercel.app/",
    },
  ];
  const projects = useRef([]);
  const titles = useRef([]);
  const titleRef = useRef(null);
  const [ismounted, setIsMounted] = useState(false);
  const [filteredData, setFilteredData] = useState(projectsData);

  gsap.registerPlugin(Flip);

  const filterData = (e) => {
    switch (e.target.innerHTML) {
      case "All":
        setFilteredData(projectsData);
        break;
      case "React/Node":
        setFilteredData(
          projectsData.reduce((acc, project) => {
            if (project.category === "React/Node.js") {
              acc.push(project);
              return acc;
            }
            return acc;
          }, [])
        );
        break;
      case "React":
        setFilteredData(
          projectsData.reduce((acc, project) => {
            if (project.category === "React") {
              acc.push(project);
              return acc;
            }
            return acc;
          }, [])
        );
        break;
      // case "Node":
      //   setFilteredData(
      //     projectsData.reduce((acc, project) => {
      //       if (project.category === "Node.js") {
      //         acc.push(project);
      //         return acc;
      //       }
      //       return acc;
      //     }, [])
      //   );
      //   break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (ismounted) {
      const state = Flip.getState(projects.current);

      const matches = filteredData.map(function (project, index) {
        return project.id;
      });
      projects.current.forEach(function (project, index) {
        project.style.display = ~matches.indexOf(project.id) ? "flex" : "none";
      });

      // Create the animation
      Flip.from(state, {
        duration: 1,
        scale: true,
        absolute: true,
        ease: "power1.inOut",
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.5 }
          ),
        onLeave: (elements) =>
          gsap.to(elements, { opacity: 0, scale: 0, duration: 0.5 }),
      });
    }
  }, [filteredData]);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    const titlesTimelines = [];
    const projectsTimelines = [];

    titles.current.forEach(() => {
      titlesTimelines.push(
        gsap.timeline({
          scrollTrigger: {
            trigger: ".skills",
            start: "bottom center",
          },
        })
      );
    });

    projects.current.forEach(() => {
      projectsTimelines.push(
        gsap.timeline({
          scrollTrigger: {
            trigger: ".skills",
            start: "bottom center",
          },
        })
      );
    });

    titles.current.forEach(function (title, index) {
      gsap.to(title, {
        x: Math.floor(Math.random() * 900) * Math.pow(-1, index),
      });
      projects.current.forEach(function (project, index) {
        gsap.to(project, {
          x: Math.floor(Math.random() * 900) * Math.pow(-1, index),
        });
      });
    });
    titles.current.forEach(function (title, index) {
      titlesTimelines[index].to(title, { x: 0, duration: 1 });
    });
    projects.current.forEach(function (project, index) {
      projectsTimelines[index].to(project, { x: 0, duration: 1 });
    });
  }, []);

  const setRefs = (el, i) => {
    const { current } = projects;
    current[i] = el;
  };
  const setTitlesRef = (el, i) => {
    const { current } = titles;
    current[i] = el;
  };
  const renderProjects = () => {
    return projectsData.map((project, i) => (
      <div
        className={`projects-body-grid-item   ${project.category}`}
        key={project.id}
        ref={(el) => setRefs(el, i)}
        style={{ background: `url(${project.img})  center center/cover` }}
        id={project.id}
      >
        <div className="projects-body-grid-item-tranaparent"></div>

        <div className="projects-body-grid-item-name">{project.name}</div>
        <div className="projects-body-grid-item-links">
          <div
            className="projects-body-grid-item-link"
            // style={{
            //   cursor: `${
            //     project.name === "Ecommerce" ? "not-allowed" : "pointer"
            //   }`,
            // }}
            title={`${
              project.name === "freelance work" ? "available soon" : ""
            }`}
          >
            <a href={project.demoLink} target="_blank">
              demo
            </a>
          </div>
          <div className="projects-body-grid-item-link">
            <a href={project.link} target="_blank">
              code
            </a>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section id="projects" className="projects">
      <Title title="PROJECTS" titleRef={titleRef} section=".projects" />
      <div className="projects-body">
        <div className="projects-body-filter" onClick={filterData}>
          <div
            className="projects-body-filter-category"
            ref={(el) => setTitlesRef(el, 0)}
          >
            All
          </div>
          <div
            className="projects-body-filter-category"
            ref={(el) => setTitlesRef(el, 1)}
          >
            React
          </div>
          <div
            className="projects-body-filter-category"
            ref={(el) => setTitlesRef(el, 2)}
          >
            React/Node
          </div>
       
        </div>
        <div className="projects-body-grid">{renderProjects()}</div>
      </div>
    </section>
  );
}

export default Projects;
