<script>
  import { onMount } from "svelte";
  import "../app.css";
  import Header from "../Components/Header/Header.svelte";
  import Lenis from "lenis";
  import Cursor from "../Components/Cursor/Cursor.svelte";
  import Footer from "../Components/Footer/Footer.svelte";
  let { children } = $props();

  onMount(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      autoRaf: true,
    });

    // Listen for the scroll event and log the event data
    lenis.on("scroll", (e) => {
      console.log(e);
    });
  });
</script>

<div class="app">
  <Header />
  <Cursor />
  <main>
    {@render children()}
  </main>
  <Footer/>
</div>
