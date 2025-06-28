<script>
  import { onMount, tick } from "svelte";
  import gsap from "gsap";
  import "../../app.css";

  let isMenuOpen = false;
  let mobileMenuEl;

  const mobileLinks = ['Work', 'About', 'Contact', 'Blogs'];

  const toggleMenu = async () => {
    isMenuOpen = !isMenuOpen;
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";

    if (isMenuOpen) {
      await tick(); // Wait for DOM update

      // Step 1: Animate height of container
      gsap.fromTo(
        mobileMenuEl,
        { height: 0, opacity: 0 },
        {
          height: "calc(100vh - 156px)",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            // Step 2: Animate links after height expands
            gsap.fromTo(
              ".mobile-link",
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
                stagger: 0.1,
              }
            );
          }
        }
      );
    }
  };

  onMount(() => {
    let lastScroll = 0;
    const header = document.querySelector("header");
    header.classList.remove("hide-header");

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (window.scrollY > 300) {
        if (currentScroll <= 0) {
          header.classList.remove("hide-header");
          return;
        }

        if (currentScroll > lastScroll) {
          header.classList.add("hide-header");
        } else {
          header.classList.remove("hide-header");
        }

        lastScroll = currentScroll;
      } else {
        header.classList.remove("hide-header");
      }
    });
  });
  function closeMenu() {
    isMenuOpen = false;
    document.body.style.overflowY = 'scroll';

  }
</script>

<main>
  <header class="fixed top-0 w-full z-[999] text-text hide-header">
    <div class="cus-container">
      <div class="header-wrap flex justify-between items-center py-4">
        <p class="font-bold">
          <a href="/">Rakshit Jain</a>
        </p>

        <!-- Desktop Nav -->
        <div class="nav-links hidden md:flex gap-6 bg-fuchsia-200 py-5 px-10 rounded-2xl">
          {#each ['Work', 'About', 'Contact', 'Blogs'] as link}
            <a href={link === 'Blogs' ? '/blogs' : `/#${link.toLowerCase()}`} class="relative overflow-hidden group">
              <span class="relative block transition-transform duration-300 group-hover:-translate-y-5">{link}</span>
              <span class="absolute bottom-0 left-0 translate-y-5 transition-transform duration-300 group-hover:translate-y-0">{link}</span>
            </a>
          {/each}
        </div>

        <!-- Hamburger Button -->
        <button class="md:hidden" on:click={toggleMenu}>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      {#if isMenuOpen}
        <div
          bind:this={mobileMenuEl}
          class="mob-head md:hidden overflow-hidden opacity-0 bg-text p-10 rounded-2xl w-full text-center items-center justify-center text-white saol-italic text-[56px] font-medium flex"
        >
          <div class="flex flex-col gap-4">
            {#each mobileLinks as link}
              <a
                href={link === 'Blogs' ? '/blogs' : `/#${link.toLowerCase()}`}
                class="mobile-link"
                on:click={closeMenu}
              >
                {link}
              </a>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </header>
</main>

<style>
  header {
    transition: transform 0.3s ease-in-out;
  }

  .hide-header {
    transform: translateY(-100%);
  }

  .mob-head {
    height: calc(100vh - 156px);
  }

  .mobile-link {
    opacity: 0;
    transform: translateY(40px);
  }
</style>
