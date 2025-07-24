<script>
  import "../../app.css";
  import { onMount } from "svelte";
  import gsap from "gsap";
  import ScrollTrigger from "gsap/ScrollTrigger";

  //import imgo from "../../assets/images/1-1.jpg";
  import wingz from "../../assets/images/shot 47.jpg";
  import wingzz from "../../assets/images/shot 23.jpg";
  import imgq from "../../assets/images/shot 74.jpg";
  import imgt from "../../assets/images/shot 61.png";
  import imgtt from "../../assets/images/1-3.jpg";
  import imgf from "../../assets/images/portfolio-mockup-laptop 22.jpg";
  import imgff from "../../assets/images/portfolio-mockup-laptop 32.jpg";
  import imgs from "../../assets/images/portfolio-mockup-laptop 22.jpg";
  import imgss from "../../assets/images/web-portfolio-mockup_11.png";
  import imgsf from "../../assets/images/web-portfolio-mockup_10.png";
  import socio1 from "../../assets/images/Socio-shot1.png";
  import socio2 from "../../assets/images/Socio-shot2.png";
  //import oneMp from "../../assets/videos/one.mp4";
  

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax inside image box (same as before)
    gsap.utils.toArray(".project-section").forEach((section, index) => {
      const leftEl = section.querySelector(".left");
      const rightEl = section.querySelector(".right");

      const moveMore = -90;
      const moveLess = -45;
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
      if (title === "Projects") {
        // Reset to default view — only show the <p> tag
        span.textContent = "Scroll to explore my";
        gsap.set(link, { opacity: 0, display: "none" });
        gsap.set(descriptionEl, { opacity: 0 });
        return;
      }

      gsap.to(h2, {
        opacity: 0,
        y: -20,
        duration: 0,
        onComplete: () => {
          span.textContent = "";
          link.innerText = title;
          link.setAttribute("href", href);

          // Show the link and description
          gsap.set(link, { display: "inline-block" });
          descriptionEl.textContent = description;

          gsap.to([link, descriptionEl], {
            opacity: 1,
            duration: 0.3,
          });
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
        markers: false,
        onEnter: () => updateTitle(title, desc, href),
        onEnterBack: () => updateTitle(title, desc, href),
        onUpdate: (self) => {
          if (self.progress > 0 && self.progress < 1) {
            // Hide <p> when the section is in view
            gsap.to(pElement, {
              opacity: 0,
              duration: 0,
              display: "none",
            });
          } else {
            // Show <p> again when the section is out of view
            gsap.to(pElement, {
              opacity: 1,
              duration: 0,
              display: "block",
            });
          }
        },
      });
    });

    // Create ScrollTrigger to reset title and link when scrolling to the top or when no section is active
    ScrollTrigger.create({
      start: "top top", // When the top of the page hits the top of the viewport
      end: "bottom top",
      markers: false,
      onUpdate: (self) => {
        const isActive = triggers.some((t) => t.isActive);
        if (!isActive) {
          // Reset title when no project section is active
          updateTitle("Projects");
          gsap.to(pElement, {
            opacity: 1,
            duration: 0,
            display: "block",
          }); // Ensure <p> is visible when at the top
          gsap.to([descriptionEl, link], {
            opacity: 0,
            duration: 0.3,
          }); // Hide description and link at the top
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

  const projects = [
    {
      id: "project-demma",
      title: "Socio",
      description: "{ Socio – A vibrant social media app to connect, share, and express yourself like never before. }",
      link: "https://embed.figma.com/design/yvJS8806iv2jw6YPgQT4wz/Socio--Social-Media-App?node-id=0-1&embed-host=share",
      left: {
        type: "image",
        src: socio2, 
        style:
          "max-h-[400px] md:max-w-[318px] md:max-h-[418px] 2xl:max-w-[418px] 2xl:max-h-[618px] w-full h-auto",
      },
      right: {
        type: "image",
        src: socio1,
        //loop: true,
        style:
          "md:max-w-[484px] md:pl-24 md:max-h-[404px] 2xl:max-w-[684px] 2xl:max-h-[604px] w-full h-auto hidden md:block",
      },
    },
    {
      id: "project-beta",
      title: "TaleTide",
      description: "{ A social audiobook app where you read, listen, and grow together with friends and loved ones. }",
      //description1: "UI / UX Design",
      link: "https://embed.figma.com/design/glPrnUoM4slg2KfSmnvBPo/Untitled?node-id=46-330&embed-host=share ",
      left: {
        type: "image",
        src: imgq,
        style:
          "max-h-[400px] md:max-w-[318px] md:max-h-[418px] 2xl:max-w-[418px] 2xl:max-h-[618px] w-full h-auto",
      },
      right: {
        type: "image",
        src: imgt,
        style:
          "md:max-w-[484px] md:pl-24 md:max-h-[404px] 2xl:max-w-[684px] 2xl:max-h-[604px] w-full h-auto hidden md:block",
      },
    },
    {
      id: "project-gamma",
      title: "Wingz",
      description: "{ A mobile app that lets parents easily book and track their kids’ trips in real-time for safe and worry-free travel. }",
      link: "https://embed.figma.com/design/iBiisRJ6MZ101G4KamCC71/Child-Trip-Tracking-App?node-id=0-1&embed-host=share",
      left: {
        type: "image",
        src: wingzz,
        style:
          "max-h-[400px] md:max-w-[318px] md:max-h-[418px] 2xl:max-w-[418px] 2xl:max-h-[618px] w-full h-auto",
      },
      right: {
        type: "image",
        src: wingz,
        //loop: true,
        style:
          "md:max-w-[484px] md:pl-24 md:max-h-[404px] 2xl:max-w-[684px] 2xl:max-h-[604px] w-full h-auto hidden md:block",
      },
    },
    {
      id: "project-delta",
      title: "BeSpoke Tours",
      description: "{ Discover and book your next perfect vacation with ease through our all-in-one tour planning and booking platform. }",
      link: "https://embed.figma.com/design/nCZ6BagjLp338pte12AtbU/BESPOKE---Travel-Landing-Page?node-id=0-1&embed-host=share",
      left: {
        type: "image",
        src: imgff,
        style:
          "max-h-[400px] md:max-w-[318px] md:max-h-[418px] 2xl:max-w-[418px] 2xl:max-h-[618px] w-full h-auto",
      },
      right: {
        type: "image",
        src: imgs,
        style:
          "md:max-w-[484px] md:pl-24 md:max-h-[404px] 2xl:max-w-[684px] 2xl:max-h-[604px] w-full h-auto hidden md:block",
      },
    },
    {
      id: "project-echo",
      title: "That Time",
      description: "{ A seamless platform to explore and book appointments with barbers, salons, and nail artists near you. }",
      link: "https://embed.figma.com/design/b03otWdynGmklN6h1D3nPf/Rakshit-Jain-Task?node-id=0-1&embed-host=share",
      left: {
        type: "image",
        src: imgss,
        style:
          "max-h-[400px] md:max-w-[318px] md:max-h-[418px] 2xl:max-w-[418px] 2xl:max-h-[618px] w-full h-auto",
      },
      right: {
        type: "image",
        src: imgsf,
        //loop: true,
        style:
          "md:max-w-[484px] md:pl-24 md:max-h-[404px] 2xl:max-w-[684px] 2xl:max-h-[604px] w-full h-auto hidden md:block",
      },
    },
  ];
</script>

<main class="bg-[#F6F6F1] h-min main" id="work">
  <div
    class="scroll-head min-h-dvh flex-center sticky top-0 z-10 w-max mx-auto mix-blend-difference text-center flex-col"
  >
    <h2 class="text-[54px] lg:text-[80px] text-[#fff] leading-tight">
      <span class="block text-[16px] lg:text-[18px] mb-1"
        >Scroll to explore my</span
      >
      <p class="cursor-target font-medium uppercase font-b">Projects</p>
      <a
        href="javascript:;"
        class="hidden cursor-target transition-all saol-italic capitalize font-medium"
      >
        Projects
      </a>
    </h2>
    <div
      class="project-description text-[18px] mt-4 text-[#bbb] max-w-[600px]"
    ></div>
  </div>

  <div class="cus-container">
    {#each projects as project}
      <div
        class="project-section min-h-dvh flex justify-between"
        id={project.id}
        data-title={project.title}
        data-description={project.description}
        data.decription1= {project.description1}
        data-link={project.link}
      >
        <div class={`left ${project.left.style}`}>
          <a href={project.link} class="cursor-target">
            {#if project.left.type === "video"}
              <video
                src={project.left.src}
                muted
                autoplay
                playsinline
                loop={!!project.left.loop}
                class="w-full h-full object-cover"
              ></video>
            {:else}
              <img
                loading="lazy"
                src={project.left.src}
                alt={project.title}
                class="w-full h-full object-cover"
              />
            {/if}
          </a>
        </div>

        <a href={project.link} class="cursor-target">
          <div class={`right ${project.right.style}`}>
            {#if project.right.type === "video"}
              <video
                src={project.right.src}
                muted
                autoplay
                playsinline
                loop={!!project.right.loop}
                class="w-full h-full object-cover"
              ></video>
            {:else}
              <img
                loading="lazy"
                src={project.right.src}
                alt={project.title}
                class="w-full h-full object-cover"
              />
            {/if}
          </div>
        </a>
      </div>
    {/each}
  </div>
</main>

<style>
  .scroll-head {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .project-description {
    max-width: 300px;
    line-height: 1.5;
  }
</style>
