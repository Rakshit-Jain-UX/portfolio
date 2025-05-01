<script>
  import { onMount } from "svelte";
  let cursor;

  onMount(() => {
    // Use requestAnimationFrame to ensure the DOM is ready
    requestAnimationFrame(() => {
      if (cursor) {
        const body = document.body;

        // Update cursor position
        body.addEventListener("mousemove", (e) => {
          if (cursor) {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
          }
        });

        // Hover effect for links with the class 'cursor-target'
        body.addEventListener("mouseover", (e) => {
          if (e.target.closest("a.cursor-target")) {
            cursor.classList.add("cursor-hover");
          }
        });

        body.addEventListener("mouseout", (e) => {
          if (e.target.closest("a.cursor-target")) {
            cursor.classList.remove("cursor-hover");
          }
        });
      }
    });
  });
</script>

<!-- The custom cursor element -->
<div class="cursor" bind:this={cursor}></div>

<style>
  .cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #fff;
    pointer-events: none;
    transition:
      background-color 0.2s ease,
      transform 0.3s ease,
      width 0.1s ease,
      height 0.1s ease;
    mix-blend-mode: difference;
    transform: translate(-50%, -50%);
    z-index: 9999;
  }

  .cursor-hover {
    width: 60px;
    height: 60px;
  }
</style>
