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
    "https://picsum.photos/400/300?random=4"
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
      const offset = ((i - current + slides.length) % slides.length);

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
          xPercent: -50,
          x: window.innerHeight < 767 ? 300 : 200,
          z: -300,
          rotationY: -45, 
          scale: 1,
          opacity: 1,
          ease: "power3.out",
        });
      } else if (offset === slides.length - 1 || offset === -1) {
        gsap.to(slide, {
          duration: duration,
          xPercent: -50,
          x: window.innerHeight < 767 ? -300 : -200,
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
    const carousel = document.querySelector('.carousel');
  });
</script>

<style>
  .wrap {
    min-height: 100vh;
    overflow: hidden;
  }
  .carousel {
    position: relative;
    width: 100%;
    height: 600px; 
    perspective: 1000px;
    display: flex;
    justify-content: center;
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
    width: 400px;
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

<div class="wrap bg-[#F6F6F1] py-60">
  <h2 class="text-center ">
    <span class="block">If you wanna gossip...</span>
    <span class="font-b text-[50px] leading-[50px] md:leading-[90px] md:text-[90px]" >WHAT I LIKE TO DO?</span>
  </h2>
   <div class="carousel h-dvh mt-20 ">
    <div class="carousel__track">
      {#each slideImages as img, index}
        <div class="carousel__slide">
          <img src={img} alt={`Slide ${index}`} />
        </div>
      {/each}
    </div>
 </div>
  
</div>