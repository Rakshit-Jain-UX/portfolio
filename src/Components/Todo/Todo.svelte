<script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let slides = [];
  let current = 0;
  let intervalId;

  const slideImages = [
    "https://picsum.photos/400/300?random=1",
    "https://picsum.photos/400/300?random=2",
    "https://picsum.photos/400/300?random=3",
    "https://picsum.photos/400/300?random=4",
    "https://picsum.photos/400/300?random=5",
    "https://picsum.photos/400/300?random=6",
  ];

  function startAutoCarousel() {
    intervalId = setInterval(() => {
      current = (current + 1) % slides.length;
      updateCarousel();
    }, 2000);
  }

  function stopAutoCarousel() {
    clearInterval(intervalId);
  }

  const duration = 1;

  function updateCarousel() {
    slides.forEach((slide, i) => {
      gsap.killTweensOf(slide);
      const offset = (i - current + slides.length) % slides.length;

      if (offset === 0) {
        // Center image stays in place
        gsap.to(slide, {
          duration: duration,
          xPercent: -50,
          x: 0,
          z: 0,
          rotationY: 0,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
        });
      } else if (offset === 1 || offset === -3) {
        gsap.to(slide, {
          duration: duration,
          xPercent: -80,
          x: window.innerWidth < 767 ? 200 : 300,
          z: -300,
          rotationY: -45,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
        });
      } else if (offset === slides.length - 1 || offset === -1) {
        gsap.to(slide, {
          duration: duration,
          xPercent: -20,
          x: window.innerWidth < 767 ? -200 : -300,
          z: -300,
          rotationY: 45,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
        });
      } else {
        gsap.to(slide, {
          duration: duration,
          opacity: 0,
          z: -600,
          x: 0,
          scale: 0.5,
        });
      }
    });
  }

  // Initialize on mount
  onMount(() => {
    slides = document.querySelectorAll(".carousel__slide");
    startAutoCarousel();

    // Optional: Pause carousel on hover
    const carousel = document.querySelector(".carousel");
  });
</script>

<div class="wrap bg-[#F6F6F1] py-30 md:py-60 " id="about">
  <h2 class="text-center">
    <span class="block">If you wanna gossip...</span>
    <span
      class="font-b text-[50px] leading-[50px] md:leading-[90px] md:text-[90px]"
      >WHAT I LIKE TO DO?</span
    >
  </h2>
  <div class="topz flex-center sticky top-0 overflow-hidden">
    <div class="carousel h-dvh mt-20">
      <div class="carousel__track">
        {#each slideImages as img, index}
          <div class="carousel__slide">
            <img src={img} alt={`Slide ${index}`} />
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="background-text flex flex-col items-center justify-center md:text-[178px] text-[70px] saol-italic">
    <h3>Curious</h3>
    <h3>Innovative</h3>
    <h3>Visionary</h3>
  </div>
</div>

<style>
  .topz {
    position: sticky;
    top: 0%;
    min-height: 100vh;
  }
 
  .wrap {
    min-height: 300vh;
  } @media only screen and (max-width: 767px) {
    .topz {
    min-height: 60vh;
    }
    .wrap {
      min-height: 200vh;
    }
  }
  .carousel {
    position: relative;
    width: 100%;
    height: 460px;
    perspective: 1000px;
    display: flex;
    justify-content: center;
  transform: translateZ(0);
  }

  .carousel__track {
    display: flex;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 1s ease;
  }

  .carousel__slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 100%;
    object-fit: cover;
    transform-origin: center center;
    
  }
  @media screen and (max-width: 767px) {
    .carousel {
      width: 100vw;
      height: 400px;
      perspective: 1000px;
    }
    .carousel__slide {
      width: 250px;
    }
  }
  /* Styling the images */
  .carousel__slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
