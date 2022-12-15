import React from "react";
import { useEffect } from "react";
import { gsap } from "gsap";

function Canvas() {
  useEffect(() => {
    let stage;
    let circles;
    let animationId;
    let colors = ["#8ad633", "#FFF578", "#59b256", "#37A9CC", "#188EB2"];

    function init() {
      if (window.createjs) {
        initStages();

        initCircles();
        animate();
      }
    }
    function reset() {
      cancelAnimationFrame(animationId);
      init();
    }
    function initStages() {
      stage = new window.createjs.Stage("stage");
      stage.canvas.width = window.innerWidth;
      stage.canvas.height = window.innerHeight;
    }

    function initCircles() {
      circles = [];
      for (let i = 0; i < 100; i++) {
        let circle = new window.createjs.Shape();
        let r = 7;
        let x = window.innerWidth * Math.random();
        let y = window.innerHeight * Math.random();
        let color = colors[Math.floor(i % colors.length)];
        let alpha = 0.2 + Math.random() * 0.5;
        circle.alpha = alpha;
        circle.radius = r;
        circle.graphics.beginFill(color).drawCircle(0, 0, r);
        circle.x = x;
        circle.y = y;
        circles.push(circle);
        stage.addChild(circle);
        tweenCircle(circle);
      }
    }

    // animating circles
    function animate() {
      stage.update();
      animationId = requestAnimationFrame(animate);
    }
    function tweenCircle(c) {
      gsap.to(c, {
        x: c.x + -100 + Math.random() * 200,
        y: c.y + -100 + Math.random() * 200,
        ease: "quad.easeInOut",
        alpha: 0.2 + Math.random() * 0.5,
        onComplete: function () {
          tweenCircle(c);
        },
        duration: 5 + Math.random() * 3.5,
      });
    }

    init();
    window.addEventListener("resize", reset);
  }, []);

  return <canvas id="stage"></canvas>;
}

export default Canvas;
