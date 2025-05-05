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
  const threshold = 100;
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
    img.getRect(); // Ensure updated position
    gsap.killTweensOf(img.DOM.el);

    gsap
      .timeline()
      .set(img.DOM.el, {
        opacity: 1,
        scale: 1,
        zIndex: zIndexVal,
        x: cacheMousePos.x - img.rect.width / 2,
        y: cacheMousePos.y - img.rect.height / 2,
      })
      .to(
        img.DOM.el,
        {
          duration: 0.9,
          ease: "expo.out",
          x: mousePos.x - img.rect.width / 2,
          y: mousePos.y - img.rect.height / 2,
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 1,
          ease: "power1.out",
          opacity: 0,
        },
        0.8
      )
      .to(
        img.DOM.el,
        {
          duration: 1,
          ease: "quint.out",
          scale: 0,
        },
        0.8
      );
  }

  function renderLoop() {
    const distance = MathUtils.distance(
      mousePos.x,
      mousePos.y,
      lastMousePos.x,
      lastMousePos.y
    );

    cacheMousePos.x = MathUtils.lerp(
      cacheMousePos.x || mousePos.x,
      mousePos.x,
      0.9
    );
    cacheMousePos.y = MathUtils.lerp(
      cacheMousePos.y || mousePos.y,
      mousePos.y,
      0.9
    );

    if (isInside && distance > threshold) {
      showNextImage();
      zIndexVal++;
      imgPosition = imgPosition < imagesTotal - 1 ? imgPosition + 1 : 0;
      lastMousePos = { ...mousePos };
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

<main class="container">
  <div class="trail-area" bind:this={trailArea}></div>

  <div class="content">
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

  <header>
    <h1 id="name">Your Name</h1>
    <p>Example paragraph here.</p>
  </header>
</main>

<style>
  .trail-area {
    width: 1000px;
    height: 1000px;
    position: relative;
    margin: 50px auto;
    z-index: 2;
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
