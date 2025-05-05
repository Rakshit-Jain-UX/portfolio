<script>
  import "../../app.css";
  import { onMount } from "svelte";
  import gsap from "gsap";
  import ScrollTrigger from "gsap/ScrollTrigger";

  import imgo from "../../assets/images/1.png";
  import imgt from "../../assets/images/2.png";
  import imgtt from "../../assets/images/3.png";
  import imgf from "../../assets/images/4.png";
  import imgff from "../../assets/images/5.png";
  import imgs from "../../assets/images/6.png";
  import imgss from "../../assets/images/7.png";
  import oneMp from "../../assets/videos/one.mp4";

  onMount(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Parallax inside image box (same as before)
  gsap.utils.toArray(".project-section").forEach((section, index) => {
    const leftEl = section.querySelector(".left img, .left video");
    const rightEl = section.querySelector(".right img");

    const moveMore = -30;
    const moveLess = 0;
    const isEven = index % 2 === 0;

    gsap.to(leftEl, {
      yPercent: isEven ? moveMore : moveLess,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(rightEl, {
      yPercent: isEven ? moveLess : moveMore,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  const h2 = document.querySelector(".scroll-head h2");
  const span = h2.querySelector("span");
  const link = h2.querySelector("a");
  const descriptionEl = document.querySelector(".project-description");
  const pElement = h2.querySelector("p"); // Target the <p> element
  let currentTitle = "";

  // Initially hide the project description and link
  gsap.set([descriptionEl, link], { opacity: 0 });

  function animateTo(title, description, href) {
    gsap.to(h2, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => {
        span.textContent = title === "Projects" ? "Scroll to explore my" : "";
        if (title !== "Projects") {
          link.innerText = title;
          link.setAttribute("href", href); // Set dynamic href to the corresponding section
          descriptionEl.textContent = description;
          gsap.to([link, descriptionEl], { opacity: 1, duration: 0.3 }); // Show link and description
        }
        gsap.to(h2, { opacity: 1, y: 0, duration: 0.3 });
      },
    });
  }

  function updateTitle(name, description = "", href = "") {
    if (name === currentTitle) return;

    if (name === "Projects" || currentTitle === "Projects") {
      animateTo(name, description, "javascript:;");
    } else {
      span.textContent = "";
      animateTo(name, description, href);
    }

    currentTitle = name;
  }

  const triggers = gsap.utils.toArray(".project-section").map((section) => {
    const title = section.getAttribute("data-title");
    const desc = section.getAttribute("data-description") || "";
    const href = section.getAttribute("data-link");

    return ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => updateTitle(title, desc, href),
      onEnterBack: () => updateTitle(title, desc, href),
      onUpdate: (self) => {
        if (self.progress > 0 && self.progress < 1) {
          // Hide <p> when the section is in view
          gsap.to(pElement, { opacity: 0, duration: 0.3 });
        } else {
          // Show <p> again when the section is out of view
          gsap.to(pElement, { opacity: 1, duration: 0.3 });
        }
      },
    });
  });

  // Create ScrollTrigger to reset title and link when scrolling to the top or when no section is active
  ScrollTrigger.create({
    start: "top top", // When the top of the page hits the top of the viewport
    end: "bottom top",
    onUpdate: (self) => {
      const isActive = triggers.some((t) => t.isActive);
      if (!isActive) {
        // Reset title when no project section is active
        updateTitle("Projects");
        gsap.to(pElement, { opacity: 1, duration: 0.3 }); // Ensure <p> is visible when at the top
        gsap.to([descriptionEl, link], { opacity: 0, duration: 0.3 }); // Hide description and link at the top
      }
    },
  });

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: () => {
      const isActive = triggers.some((t) => t.isActive);
      if (!isActive) updateTitle("Projects");
    },
  });
});




</script>

<main class="bg-primary h-min main">
  <div
    class="scroll-head h-dvh flex-center sticky top-0 z-10 w-max mx-auto mix-blend-difference text-center flex-col"
  >
    <h2 class="text-[80px] uppercase font-b text-[#fff] leading-tight">
      <span class="block text-[18px] mb-1">Scroll to explore my</span>
      <p  class="cursor-target transition-all   font-medium" > Projects </p>
      <a href="#" class="cursor-target transition-all saol-italic capitalize font-medium" > Projects </a>
    </h2>
    <div
      class="project-description text-[18px] mt-4 text-[#bbb] max-w-[600px]"
    ></div>
  </div>

  <div
    class="project-section h-dvh grid sm:grid-cols-2 items-center place-items-center gap-20px"
    id="project-beta"
    data-title="Project Beta"
    data-description="A sleek project focused on enhancing user interaction using modern web animations."
    data-link="https://link.com/project-beta"
  >
    <div class="left">
      <img src={imgo} alt="Project Beta" />
    </div>
    <div class="right">
      <img src={imgt} alt="" />
    </div>
  </div>

  <div
    class="project-section h-dvh grid sm:grid-cols-2 items-center place-items-center gap-20px"
    id="project-gamma"
    data-title="Project Gamma"
    data-description="This project showcases deep visual storytelling through creative imagery and layout."
    data-link="https://link.com/project-gamma"
  >
    <div class="left">
      <img src={imgtt} alt="Project Gamma" />
    </div>
    <div class="right">
      <img src={imgf} alt="" />
    </div>
  </div>

  <div
    class="project-section h-dvh grid sm:grid-cols-2 items-center place-items-center gap-20px"
    id="project-delta"
    data-title="Project Delta"
    data-description="An experimental layout exploring color theory and responsive visual balance."
    data-link="https://link.com/project-delta"
  >
    <div class="left">
      <img src={imgff} alt="Project Delta" />
    </div>
    <div class="right">
      <img src={imgs} alt="" />
    </div>
  </div>

  <div
    class="project-section h-dvh grid sm:grid-cols-2 items-center place-items-center gap-20px"
    id="project-echo"
    data-title="Project Echo"
    data-description="A fullscreen video experience that reacts to user scroll using parallax dynamics."
    data-link="https://link.com/project-echo"
  >
    <div class="left">
      <video autoplay loop playsinline muted>
        <source src={oneMp} />
      </video>
    </div>
    <div class="right">
      <img src={imgss} alt="" />
    </div>
  </div>
</main>

<style>
  .project-section .left {
    margin-right: 100px;
  }
  .project-section .right {
    margin-left: 100px;
  }
  .project-section .left,
  .project-section .right {
    position: relative;
  }

  .project-section .left img,
  .project-section .right img {
    width: 500px;
    height: 500px;
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
  }

  .project-section .left video,
  .project-section .right video {
    width: 500px;
    height: 800px;
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
  }

  .scroll-head {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .project-description {
    max-width: 600px;
    line-height: 1.5;
  }
</style>
