<script>
  import { onMount } from "svelte";
  import Home from "../pages/Home.svelte";
   console.log(import.meta.env.VITE_PROJECT_ID)
  console.log(import.meta.env.VITE_ENDPOINT)
  console.log(import.meta.env.VITE_BUCKET_ID)
  console.log(import.meta.env.VITE_DB_ID)
  console.log(import.meta.env.VITE_COLLECTION_ID)
  console.log(import.meta.env.VITE_ADMIN_ID)
</script>

<main>
  <Home />
</main>
