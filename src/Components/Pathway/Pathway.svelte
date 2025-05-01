<script>
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
  
    const imageCount = 5;
    let images = Array(imageCount).fill(null);
    let imageRefs = Array(imageCount);
  
    onMount(() => {
      let mouseX = 0;
      let mouseY = 0;
  
      const moveHandler = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
  
        imageRefs.forEach((el, i) => {
          if (!el) return;
  
          const delay = i * 0.05;
  
          gsap.to(el, {
            x: mouseX,
            y: mouseY,
            opacity: 1,
            duration: 0.3,
            delay,
            onComplete: () => {
              gsap.to(el, {
                opacity: 0,
                duration: 0.5,
                delay: 0.5
              });
            }
          });
        });
      };
  
      window.addEventListener('mousemove', moveHandler);
  
      return () => {
        window.removeEventListener('mousemove', moveHandler);
      };
    });
  </script>
  
  <style>
    .trail-container {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 9999;
    }
  
    .trail-image {
      position: absolute;
      width: 50px;
      height: 50px;
      opacity: 0;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s;
    }
  </style>
  
  <div class="trail-container">
    {#each images as _, i}
      <img
        bind:this={imageRefs[i]}
        class="trail-image"
        src="https://picsum.photos/50/50"
        alt="trail"
      />
    {/each}
  </div>
  