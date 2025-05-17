<script>
  import "../app.css";
  import Banner from "../Components/Banner/Banner.svelte";
  import Loader from "../Components/Loader/Loader.svelte";
  import Pathway from "../Components/Pathway/Pathway.svelte";
  import Projects from "../Components/Projects/Projects.svelte";
  import Todo from "../Components/Todo/Todo.svelte";
</script>

<main>
  <Loader/>
  <Banner />
  <Projects />
  <Pathway/>
  <!-- <Todo/> -->
</main>
