<script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import imagesLoaded from "imagesloaded";

  import imgo from "../../assets/images/1.png";
  import imgt from "../../assets/images/2.png";
  import imgtt from "../../assets/images/3.png";
  import imgf from "../../assets/images/4.png";
  import imgff from "../../assets/images/5.png";

  let mousePos = { x: 0, y: 0 };
  let lastMousePos = { x: 0, y: 0 };
  let cacheMousePos = { x: 0, y: 0 };
  const threshold = 80;
  let images = [];
  let imgPosition = 0;
  let zIndexVal = 1;
  let imagesTotal = 0;

  let trailArea;
  let isInside = false;

  const MathUtils = {
    lerp: (a, b, n) => (1 - n) * a + n * b,
    distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1),
  };

  const getMousePos = (ev) => {
    return {
      x: ev.clientX,
      y: ev.clientY,
    };
  };

  class Image {
    constructor(el) {
      this.DOM = { el };
      this.getRect();
    }

    getRect() {
      this.rect = this.DOM.el.getBoundingClientRect();
    }

    isActive() {
      return gsap.isTweening(this.DOM.el) || this.DOM.el.style.opacity != "0";
    }
  }

  function showNextImage() {
  const img = images[imgPosition];
  img.getRect();
  gsap.killTweensOf(img.DOM.el);

  const containerRect = document.querySelector(".content").getBoundingClientRect();

  const relativeCacheX = cacheMousePos.x - containerRect.left;
  const relativeCacheY = cacheMousePos.y - containerRect.top;

  const relativeMouseX = mousePos.x - containerRect.left;
  const relativeMouseY = mousePos.y - containerRect.top;

  gsap
    .timeline()
    .set(img.DOM.el, {
      opacity: 1,
      scale: 1,
      zIndex: zIndexVal,
      x: relativeCacheX - img.rect.width / 2,
      y: relativeCacheY - img.rect.height / 2,
      filter: "blur(8px)",
    })
    .to(
      img.DOM.el,
      {
        duration: 0.8,
        ease: "power3.out",
        x: relativeMouseX - img.rect.width / 2,
        y: relativeMouseY - img.rect.height / 2,
        filter: "blur(0px) saturate(0)",
      },
      0
    )
    .to(
      img.DOM.el,
      {
        duration: 0.6,
        ease: "power2.out",
        opacity: 0,
        filter: "blur(4px) saturate(0)",
      },
      0.8
    )
    .to(
      img.DOM.el,
      {
        duration: 1.2,
        ease: "power4.out",
        scale: 0,
      },
      0.8
    );
}


function renderLoop() {
  const dx = mousePos.x - lastMousePos.x;
  const dy = mousePos.y - lastMousePos.y;
  const distance = MathUtils.distance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y);

  cacheMousePos.x = MathUtils.lerp(cacheMousePos.x, mousePos.x, 0.8);
  cacheMousePos.y = MathUtils.lerp(cacheMousePos.y, mousePos.y, 0.8);

  if (isInside && distance > 1) {
    const steps = Math.floor(distance / threshold);
    if (steps >= 1) {
      for (let i = 0; i < steps; i++) {
        const t = i / steps;

        // Interpolated position
        const interpX = lastMousePos.x + dx * t;
        const interpY = lastMousePos.y + dy * t;

        // Set cacheMousePos manually to this interpolated position
        cacheMousePos.x = interpX;
        cacheMousePos.y = interpY;

        showNextImage();
        zIndexVal++;
        imgPosition = imgPosition < imagesTotal - 1 ? imgPosition + 1 : 0;
      }

      lastMousePos = { ...mousePos };
    }
  }

  if (!images.some((img) => img.isActive()) && zIndexVal !== 1) {
    zIndexVal = 1;
  }

  requestAnimationFrame(renderLoop);
}


  onMount(() => {
    window.addEventListener("mousemove", (e) => {
      mousePos = getMousePos(e);

      if (trailArea) {
        const rect = trailArea.getBoundingClientRect();
        isInside =
          mousePos.x >= rect.left &&
          mousePos.x <= rect.right &&
          mousePos.y >= rect.top &&
          mousePos.y <= rect.bottom;
      }
    });

    const imgs = document.querySelectorAll(".content__img");
    imagesLoaded(imgs, () => {
      images = [...imgs].map((img) => new Image(img));
      imagesTotal = images.length;
      renderLoop();
    });
  });
</script>

<main class=" bg-primary py-30">
  <div class="cus-container">
    <div class="pathway text-[90px] font-b">
      <h2 class="leading-[90px] flex items-start flex-col">
        <div class="flex items-center gap-4" >
          MY PATHWAY
          <span class="saol-italic text-[54px] leading-normal"> to </span>
        </div>
        <div class="flex items-center gap-4">
          <span class="saol-italic text-[54px] leading-normal"> memorable </span>
          <span> INTERFACE </span>
        </div>
        <div>DESIGN</div>
      </h2>
    </div>
    <div class="content-wrap flex">
      <div class="content trail-area" bind:this={trailArea}>
        <img class="content__img" src={imgo} alt="Image 1" />
        <img class="content__img" src={imgt} alt="Image 2" />
        <img class="content__img" src={imgtt} alt="Image 3" />
        <img class="content__img" src={imgf} alt="Image 4" />
        <img class="content__img" src={imgff} alt="Image 5" />
        <img class="content__img" src={imgo} alt="Image 1" />
        <img class="content__img" src={imgt} alt="Image 2" />
        <img class="content__img" src={imgtt} alt="Image 3" />
        <img class="content__img" src={imgf} alt="Image 4" />
        <img class="content__img" src={imgff} alt="Image 5" />
        <img class="content__img" src={imgo} alt="Image 1" />
        <img class="content__img" src={imgt} alt="Image 2" />
        <img class="content__img" src={imgtt} alt="Image 3" />
        <img class="content__img" src={imgf} alt="Image 4" />
        <img class="content__img" src={imgff} alt="Image 5" /><img
          class="content__img"
          src={imgo}
          alt="Image 1"
        />
        <img class="content__img" src={imgt} alt="Image 2" />
        <img class="content__img" src={imgtt} alt="Image 3" />
        <img class="content__img" src={imgf} alt="Image 4" />
        <img class="content__img" src={imgff} alt="Image 5" />
      </div>
      <div class="content-text mt-[120px]">
        <div class="content-wrap mb-[54px]">
          <h3 class="saol-italic text-[54px] mb-[12px] text-[#212121]">👀 Eyes on detail</h3>
          <p class="text-[18px] text-[#736673]">Design System enthusiast. I’m passionate about creating well-documented components, optimizing design tokens, ensuring pixel-perfect handoffs, and prototyping detailed interactions and states to deliver cohesive and efficient design systems.          </p>
        </div>  
        <div class="content-wrap mb-[54px]">
          <h3 class="saol-italic text-[54px] mb-[12px] text-[#212121]">✨Strategy deliver</h3>
          <p class="text-[18px] text-[#736673]">Aware of business goals and client needs, I often find myself juggling between the profitability of a project and pushing boundaries with the coveted WOW effect or the ultimate feature no one has done before. One of the greatest daily challenges is reaching agreements and negotiating decisions based on priorities.</p>
        </div> 
        <div class="content-wrap mb-[0]">
          <h3 class="saol-italic text-[54px] mb-[12px] text-[#212121]">🤖 Code enthusiast</h3>
          <p class="text-[18px] text-[#736673]">Marriage with programming. In the digital world, we operate through a language in the form of code, and I consider it crucial to understand this language to navigate its rules, possibilities, and opportunities.</p>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  .content {
    position: relative;
  }
  .trail-area {
    width: 65%;
    height: auto;
    position: relative;
    z-index: 0;
  }
  .content-text {
    width: 35%;
    position: relative;
    z-index: 5;
  }
  img {
    max-width: 100px;
    width: 100%;
    height: 100px;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
    z-index: 1;
    filter: saturate(0);
  }
</style>
