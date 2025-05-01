<!-- <script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { Draggable } from "gsap/Draggable";

  gsap.registerPlugin(Draggable);

  let wrapper;
  let proxy;
  let spin;
  let startProgress;
  const radius = 520;
  const dragDistancePerRotation = 3000;

  // Direct card references
  let card1, card2, card3, card4, card5, card6;

  onMount(() => {
    proxy = document.createElement("div");
    const progressWrap = gsap.utils.wrap(0, 1);

    // Cards' rotation around the Y-axis
    spin = gsap.fromTo(
      [card1, card2, card3, card4, card5, card6], // Direct card elements
      {
        rotationY: (i) => (i * 360) / 6, // Spread the cards evenly in a circular arrangement
      },
      {
        rotationY: "-=360", // Keep rotating
        duration: 20,
        ease: "none",
        repeat: -1,
        transformOrigin: `50% 50% ${-radius}px`, // Transform origin is at the center, on the Z-axis
      }
    );

    Draggable.create(proxy, {
      trigger: wrapper,
      type: "x",
      inertia: true,
      allowNativeTouchScrolling: true,
      onPress() {
        gsap.killTweensOf(spin);
        spin.timeScale(0);
        startProgress = spin.progress();
      },
      onDrag: updateRotation,
      onThrowUpdate: updateRotation,
      onRelease() {
        if (!this.tween || !this.tween.isActive()) {
          gsap.to(spin, { timeScale: 1, duration: 1 });
        }
      },
      onThrowComplete() {
        gsap.to(spin, { timeScale: 1, duration: 1 });
      },
    });

    function updateRotation() {
      const p =
        startProgress + (this.startX - this.x) / dragDistancePerRotation;
      spin.progress(progressWrap(p));
    }
  });
</script>

<div bind:this={wrapper} class="demoWrapper">
  <div bind:this={card1} class="card box creative-pro">
    <div class="card-body p-6">
      <strong>Conception</strong>
      <small class="card-clr d-block mb-3">
        Curabitur dictum odio id sapien placerat lacinia. In volutpat a elit et
        luctus.
      </small>
    </div>
  </div>

  <div bind:this={card2} class="card box creative-pro">
    <div class="card-body p-6">
      <strong>Sketch Up</strong>
      <small class="card-clr d-block mb-3">
        Sed nec tincidunt erat. Duis nunc mi, dictum nec ligula quis, mollis
        condimentum odio.
      </small>
    </div>
  </div>

  <div bind:this={card3} class="card box creative-pro">
    <div class="card-body p-6">
      <strong>Discuss</strong>
      <small class="card-clr d-block mb-3">
        Sed nec tincidunt erat. Duis nunc mi, dictum nec ligula quis, mollis
        condimentum odio.
      </small>
    </div>
  </div>

  <div bind:this={card4} class="card box creative-pro">
    <div class="card-body p-6">
      <strong>Revise</strong>
      <small class="card-clr d-block mb-3">
        Curabitur dictum odio id sapien placerat lacinia. In volutpat a elit et
        luctus.
      </small>
    </div>
  </div>

  <div bind:this={card5} class="card box creative-pro">
    <div class="card-body p-6">
      <strong>Approve</strong>
      <small class="card-clr d-block mb-3">
        Curabitur dictum odio id sapien placerat lacinia. In volutpat a elit et
        luctus.
      </small>
    </div>
  </div>

  <div bind:this={card6} class="card box creative-pro">
    <div class="card-body p-6">
      <strong>Launch</strong>
      <small class="card-clr d-block mb-3">
        Curabitur dictum odio id sapien placerat lacinia. In volutpat a elit et
        luctus.
      </small>
    </div>
  </div>
</div>

<style>
  .demoWrapper {
    width: 680px;
    height: 400px;
    margin: 50px auto 200px;
    perspective: 1100px; /* Apply perspective to create the 3D effect */
    transform-style: preserve-3d; /* Ensure the cards stay in 3D space */
    position: relative;
  }

  .box {
    position: absolute;
    width: 700px;
    height: 180px;
    background-color: #06f;
    display: inline-block;
    overflow: hidden;
    padding: 20px;
    text-align: center;
    border-radius: 12px;
    transform-style: preserve-3d; /* Preserve 3D transformations for each card */
  }

  .creative-pro {
    border: 1px solid #00fff3;
    color: #00fff2;
    background: transparent;
    height: auto;
  }

  .creative-pro:hover {
    cursor: pointer;
    box-shadow:
      0 4px 8px 0 #00fff3,
      0 6px 20px 0 #00fff3;
  }

  .card-body {
    font-family: sans-serif;
    font-size: 14px;
  }

  .card-body small {
    font-size: 12px;
    color: #ccc;
  }
</style> -->
