<script>
  export let data;
  const { blog } = data;
</script>

<article class="prose max-w-none">
  <h1 class="text-4xl font-bold mb-4">{blog.title}</h1>
  {#if blog.description}
    <p class="text-gray-600 mb-2 italic">{blog.description}</p>
  {/if}
  <div>{@html blog.html}</div>
</article>
