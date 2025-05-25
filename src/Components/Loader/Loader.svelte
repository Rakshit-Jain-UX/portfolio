<script>
  import { onMount } from "svelte";
  import gsap from "gsap";

  onMount(() => {
    const loaders = document.querySelectorAll(".loader-top");
    gsap.to(".hide", {
      display: "none",
      delay: 1.2,
    });
    // Animate first loader to move up
    gsap.to(loaders[0], {
      y: "-125%",
      duration: 1.2,
      ease: "power2.inOut",
    });

    // Animate second loader to move down
    gsap.to(loaders[1], {
      y: "125%",
      duration: 1.2,
      ease: "power2.inOut",
      delay: 0.1,
    });
  });
</script>

<main>
  <div class="hide fixed top-0 left-0 w-full h-full z-50 flex flex-col">
    <div class="loader-top w-full h-full bg-black"></div>
    <div class="loader-top w-full h-full bg-black relative">
      <div class="circle-load absolute">
        <p class="text-[24px] font-b">RAKSHIT JAIN</p>
      </div>
    </div>
  </div>
</main>

<style>
  .circle-load {
    position: absolute;
    left: 50%;
    top: -125px;
    transform: translateX(-50%);
    background-color: white;
    width: 250px;
    height: 250px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .circle-load::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    left: -100vw;
    background-color: #fff;
    animation: rollOut 0.8s linear forwards;
  }
  .circle-load::before {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    right: -100vw;
    background-color: #fff;
    animation: rollOut 0.8s linear forwards;
  }
  @keyframes rollOut {
    0% {
      width: 0;
    }
    100% {
      width: 100vw;
    }
  }
</style>
