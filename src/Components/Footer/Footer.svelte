<script>
    import { onMount } from 'svelte';
    import gsap from 'gsap';
  
    let link;
  
    // Magnetic effect on mousemove
    const magneticEffect = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      gsap.to(link, {
        x: mouseX - link.offsetWidth / 2,
        y: mouseY - link.offsetHeight / 2,
        duration: 0.1,
        ease: 'power1.out',
      });
    };
  
    // Hover effects for scale
    const onMouseEnter = () => {
      gsap.to(link, {
        scale: 1.2,
        ease: 'power3.out',
        duration: 0.3,
      });
    };
  
    const onMouseLeave = () => {
      gsap.to(link, {
        scale: 1,
        ease: 'power3.in',
        duration: 0.3,
      });
    };
  
    onMount(() => {
      // Attach the mousemove event when the component mounts
      document.addEventListener('mousemove', magneticEffect);
  
      // Clean up the event listener on component destroy
      return () => {
        document.removeEventListener('mousemove', magneticEffect);
      };
    });
  </script>
  
  <main>
    <footer class="bg-[#212121] h-dvh py-[120px]">
      <div class="cus-container">
        <h2 class="text-[100px] font-b text-[#fff]">
          ALL GOOD THINGS
          <br />
          <span class="saol-italic">starts with</span>
          <span>
            <a
              href="#"
              class="cursor-target"
              bind:this={link}
              on:mouseenter={onMouseEnter}
              on:mouseleave={onMouseLeave}
            >
              HELLO
            </a>
          </span>
        </h2>
      </div>
    </footer>
  </main>
  
  <style>
    .cursor-target {
      display: inline-block;
      transition: transform 0.1s ease;
    }
  </style>
  