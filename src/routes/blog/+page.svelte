<script>
  import { onMount } from "svelte";
  import { databases } from "$lib/appWriteConfig";
  import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

  const DATABASE_ID = import.meta.env.VITE_DB_ID;
  const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID;

  let blogs = [];
  let loading = true;

  onMount(async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      blogs = res.documents.map((doc) => {
        const delta = JSON.parse(doc.content);
        const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
        const html = converter.convert();
        return {
          id: doc.$id,
          title: doc.title,
          html,
        };
      });
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
    } finally {
      loading = false;
    }
  });
</script>

<h1 class="text-3xl font-bold mb-6">Blogs</h1>

{#if loading}
  <p class="text-lg text-gray-500">Loading blogs...</p>
{:else if blogs.length === 0}
  <p class="text-lg text-gray-500">No blogs available.</p>
{:else}
  <ul>
    {#each blogs as blog}
      <li class="mb-4">
        <a href={`/blog/${blog.id}`} class="text-blue-600 hover:underline">
          {blog.title}
        </a>
      </li>
    {/each}
  </ul>
{/if}
