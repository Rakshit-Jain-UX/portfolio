<script>
  import 'keen-slider/keen-slider.min.css';
  import KeenSlider from 'keen-slider';
  import { onMount, onDestroy } from 'svelte';

  let slider;
  let sliderRef;

  const testimonials = [
    {
      text: "I would recommend Arpit for all the UI/UX design related work. One of the best thing about him is he understands the work so easily that we never had our calls for more than 20 mins. Would recommend him for all the UI/UX works.",
      name: "Rajkumar Malu",
      title: "Founder at Frikly",
      color: "bg-blue-400"
    },
    {
      text: "Arpit is a great designer. He helped us with website and logo design. He understands the requirements thoroughly before sketching the UI mockups. He even picked up Web3 styling when he was associated with us. He takes inputs regularly and also seeks feedback with a positive mindset.",
      name: "Senthilkumar Bala",
      title: "Building Witness Chain",
      color: "bg-red-400"
    },
    {
      text: "Arpit is very talented and creative. I engaged his service to design my logo, product package and shopify website. I am happy with his works. Will work with you again!",
      name: "Haikal Halim",
      title: "Founder at Popfume",
      color: "bg-pink-300"
    },
    {
      text: "Arpit is very talented and creative. I engaged his service to design my logo, product package and shopify website. I am happy with his works. Will work with you again!",
      name: "Haikal Halim",
      title: "Founder at Popfume",
      color: "bg-pink-300"
    },
    {
      text: "Arpit is very talented and creative. I engaged his service to design my logo, product package and shopify website. I am happy with his works. Will work with you again!",
      name: "Haikal Halim",
      title: "Founder at Popfume",
      color: "bg-pink-300"
    },
    {
      text: "Arpit is very talented and creative. I engaged his service to design my logo, product package and shopify website. I am happy with his works. Will work with you again!",
      name: "Haikal Halim",
      title: "Founder at Popfume",
      color: "bg-pink-300"
    },
    {
      text: "I have worked with many companies. Some let me down, some did a decent job. But when I worked with the vector India, especially Arpit was very helpful and did a GREAT job. I was so satisfied with the end project. For future projects I know who to call. Once more thank you Arpit!!!",
      name: "Mahir Aydin",
      title: "Founder of Mood Living",
      color: "bg-yellow-300"
    }
  ].map((t) => ({
    ...t,
    rotation: Math.floor(Math.random() * 10 - 5)
  }));

  onMount(() => {
    const animation = { duration: 5000, easing: (t) => t };

    slider = new KeenSlider(sliderRef, {
      loop: true,
      renderMode: "performance",
      slides: {
        perView: 1,
        spacing: 20,
      },
      breakpoints: {
        "(min-width: 640px)": {
          slides: { perView: 2, spacing: 20 }
        },
        "(min-width: 1024px)": {
          slides: { perView: 3, spacing: 30 }
        }
      },
      created(s) {
        s.moveToIdx(1, true, animation);
      },
      updated(s) {
        s.moveToIdx(s.track.details.abs + 1, true, animation);
      },
      animationEnded(s) {
        s.moveToIdx(s.track.details.abs + 1, true, animation);
      }
    });

    onDestroy(() => {
      slider.destroy();
    });
  });
</script>

<section class="py-12 bg-[#fefbe9] text-center overflow-hidden">
  <h2 class="text-3xl font-serif italic mb-2">Wall of love</h2>
  <p class="text-gray-500 mb-8">Because who doesn't love a good compliment?</p>

  <div bind:this={sliderRef} class="keen-slider max-w-7xl mx-auto relative">
    {#each testimonials as testimonial, i (i)}
      <div
        class={`keen-slider__slide relative p-6 pb-20 rounded-lg shadow-lg text-left ${testimonial.color}`}
        style="transform: rotate(${testimonial.rotation}deg);"
      >
        <p class="mb-4">{testimonial.text}</p>
        <div class="absolute bottom-5 left-6">
          <p class="font-semibold italic">{testimonial.name}</p>
          <p class="text-sm">{testimonial.title}</p>
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .keen-slider:not([data-keen-slider-disabled]) {
    overflow: visible;
  }
</style>