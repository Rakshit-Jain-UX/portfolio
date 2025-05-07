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

  // Start the automatic carousel
  function startAutoCarousel() {
    intervalId = setInterval(() => {
      current = (current + 1) % slides.length; // Loop through slides
      updateCarousel();
    }, 3000); // Change image every 3 seconds
  }

  // Stop the automatic carousel (optional, for example on hover)
  function stopAutoCarousel() {
    clearInterval(intervalId); // Stop the carousel
  }

  const duration = 1;

  // Update carousel images and their transformations
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
        // Right image rotates towards the center
        gsap.to(slide, {
          duration: duration,
          xPercent: -50,
          x: 300,
          z: -300,
          rotationY: -45, // Right image faces center
          scale: 1,
          opacity: 1,
          ease: "power3.out",
        });
      } else if (offset === slides.length - 1 || offset === -1) {
        // Left image rotates towards the center
        gsap.to(slide, {
          duration: duration,
          xPercent: -50,
          x: -300,
          z: -300,
          rotationY: 45, // Left image faces center
          scale: 1,
          opacity: 1,
          ease: "power3.out",
        });
      } else {
        // Other slides are hidden and moved behind the scenes
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
    carousel.addEventListener('mouseenter', stopAutoCarousel);
    carousel.addEventListener('mouseleave', startAutoCarousel);
  });
</script>

<style>
  .wrap {
    height: 100vh;
  }
  .carousel {
    position: relative;
    width: 100%;
    height: 600px; /* Adjust to the desired height */
    perspective: 1000px;
    display: flex;
    justify-content: center;
  }

  .carousel__track {
    display: flex;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 1s ease; /* Ensure smooth transition */
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

  /* Styling the images */
  .carousel__slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

<div class="wrap">
  <div class="carousel  h-dvh">
    <div class="carousel__track">
      {#each slideImages as img, index}
        <div class="carousel__slide">
          <img src={img} alt={`Slide ${index}`} />
        </div>
      {/each}
    </div>
  </div>
  
</div>