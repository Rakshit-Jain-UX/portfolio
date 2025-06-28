<script>
  import { afterUpdate, onMount, tick } from "svelte";
  import gsap from "gsap";
  import GraphemeSplitter from "grapheme-splitter";
  let currentPath = "/";
  afterUpdate(() => {
    currentPath = window.location.pathname;
  });

  function handleNavClick(event, targetId) {
    if (window.location.pathname === "/blogs") {
        event.preventDefault();
        const el = document.querySelector(targetId);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    }
}

  const splitter = new GraphemeSplitter();

  let words = ["HELLO", "नमस्ते", "કેમ  છો", ];
  let currentIndex = 0;
  let currentText = splitter.splitGraphemes(words[currentIndex]); // <-- split by grapheme clusters
  let textEls = [];

  let letters = [];

  async function nextWord() {
    gsap.to(letters, {
      y: -50,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: "circ.in",
      onComplete: async () => {
        currentIndex = (currentIndex + 1) % words.length;
        currentText = splitter.splitGraphemes(words[currentIndex]); // update using grapheme splitter

        await tick();
        textEls = [...letters];

        gsap.fromTo(
          textEls,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.06,
            duration: 0.7,
            ease: "expo.out",
          }
        );
      },
    });
  }

  onMount(async () => {
    await tick();
    textEls = [...letters];
    gsap.from(textEls, {
      y: 50,
      opacity: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "circ.out",
    });

    const interval = setInterval(nextWord, 3000);
    return () => clearInterval(interval);
  });

  function handleToTop() {
    window.scrollTo(0, 0);
  }
</script>

<main>
  <footer class="bg-[#212121] pt-[30px] md:pt-[120px] pb-[40px]" id="contact">
    <div class="cus-container">
      <div class="flex flex-col justify-between flex-height">
        <h2
          class="text-[60px] max-md:text-center md:text-[100px] font-b text-[#fff] leading-[1.1]"
        >
          ALL GOOD THINGS<br />
          <div class="flex mt-5 max-md:justify-center relative">
            <span class="max-md:text-[40px] saol-italic shrink-0"
              >starts with</span
            ><br />
            <a
              href="https://www.linkedin.com/in/rakshit-jain-376261151/"
              target="_blank"
              rel="noopener norefferer"
              class=" max-md:text-[35px] leading-[35px] ml-3 font-b cursor-hover-blue block md:hidden"
              >HELLO</a
            >
            <span class="ml-5 block relative w-full hidden md:block">
              <a
                href="https://www.linkedin.com/in/rakshit-jain-376261151/"
                target="_blank"
                rel="noopener norefferer"
                class="cursor-target-blue"
              >
                <span
                  class="flex w-full absolute {words[currentIndex] === 'કેમ  છો'
                    ? 'gujarati-spacing'
                    : ''}"
                >
                  {#each currentText as letter, i}
                    <span
                      class="letter text-white inline-block"
                      bind:this={letters[i]}>{letter}</span
                    >
                  {/each}
                </span>
              </a>
            </span>
          </div>
        </h2>
        <div class="nav flex flex-col text-[#968d96]">
          <div class="flex justify-between ">
            <div class="link max-md:w-full flex justify-between">
              <a href="" class="cursor-target">Notion</a>
              <div class="md:hidden">
              <a
                href="https://www.instagram.com/_design.astra_/"
                target="_blank"
                class="cursor-target mr-5">Instagram</a
              >
              <a
                href="mailto:rakshit.jain058@gmail.com"
                target="_blank"
                class="cursor-target">Mail</a
              >
            </div>
            </div>
            <div class="nav hidden md:block max-w-max">
              <a href="/" class="cursor-target mr-5">Home</a>
              <a href="/#work" class="cursor-target mr-5">Work</a>
              <a href="/#about" class="cursor-target mr-5">About</a>
              <a href="/blogs" class="cursor-target">Blogs</a>
            </div>
          </div>

          <div class="details flex justify-between mt-5">
            <div class="max-md:hidden">
              <a
                href="https://www.instagram.com/_design.astra_/"
                target="_blank"
                class="cursor-target mr-5">Instagram</a
              >
              <a
                href="mailto:rakshit.jain058@gmail.com"
                target="_blank"
                class="cursor-target">Mail</a
              >
            </div>
            <span>C 2025 Rakshit Jain</span>

            <span on:click={handleToTop} class="cursor-pointer">Back To Top</span
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</main>

<style>
  .letter {
    display: inline-block;
    font-family: "Excon Bold", "Noto Sans Devanagari", "Noto Sans Gujarati",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 90px;
  }

  .gujarati-spacing .letter {
    margin-right: 0.1em; /* Adjust as needed */
  }

  .flex-height {
    height: calc(100vh - 160px);
  }
  @media only screen and (max-width: 767px) {
    .letter {
      font-size: 40px;
      line-height: 40px;
    }
    .flex-height {
      height: calc(100vh - 160px);
    }
  }
</style>
