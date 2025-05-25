<script>
    import { onMount } from "svelte";
    // import "../app.css";
    import Header from "../Components/Header/Header.svelte";
    import Lenis from "lenis";
    import Cursor from "../Components/Cursor/Cursor.svelte";
    import Footer from "../Components/Footer/Footer.svelte";
  import { navigating } from "$app/stores";
  import Loader from "../Components/Loader/Loader.svelte";
    let { children } = $props();

    onMount(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            autoRaf: true,
        });
    });
</script>

{#if $navigating}
  <div class="fixed inset-0 bg-white bg-opacity-75 z-50 flex items-center justify-center">
    <div class="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-blue-600"></div>
  </div>
{/if}
<div class="app">
  <Loader/>

    <Header />
    <Cursor />
    <main>
        {@render children()}
    </main>
    <Footer />
</div>
