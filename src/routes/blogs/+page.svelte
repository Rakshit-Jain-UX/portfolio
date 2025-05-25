<script>
  import { onMount } from "svelte";
  import { databases } from "$lib/appWriteConfig";
  import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
  import { blogStore } from "$lib/stores/blogData";

  const DATABASE_ID = import.meta.env.VITE_DB_ID;
  const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID;

  let allBlogs = [];
  let displayedBlogs = [];
  let blogsPerPage = 6;
  let currentPage = 1;
  let initialized = false;
  let loading = true;

  blogStore.subscribe((data) => {
    allBlogs = data.allBlogs;
    blogsPerPage = data.blogsPerPage;
    currentPage = data.currentPage;
    initialized = data.initialized;
  });

  function epochToIST(epochMs) {
    const date = new Date(epochMs);
    const istOffsetMinutes = 5.5 * 60;
    const istDate = new Date(date.getTime() + istOffsetMinutes * 60000);
    const yyyy = istDate.getFullYear();
    const mm = String(istDate.getMonth() + 1).padStart(2, "0");
    const dd = String(istDate.getDate()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd}`;
  }

  function extractImagesFromDelta(delta) {
    const images = [];
    if (delta && Array.isArray(delta.ops)) {
      delta.ops.forEach((op) => {
        if (op.insert && typeof op.insert === "object" && op.insert.image) {
          images.push(op.insert.image);
        }
      });
    }
    return images;
  }

  function updateDisplayedBlogs() {
    const end = currentPage * blogsPerPage;
    displayedBlogs = allBlogs.slice(0, end);
  }

  function loadMoreBlogs() {
    currentPage += 1;
    updateDisplayedBlogs();
    blogStore.update((data) => ({
      ...data,
      currentPage
    }));
  }

  onMount(async () => {
    if (!initialized) {
      try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        const blogs = res.documents.map((doc) => {
          const delta = JSON.parse(doc.content);
          const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
          const html = converter.convert();
          const images = extractImagesFromDelta(delta);
          const firstImage = images.length > 0 ? images[0] : null;
          return {
            id: doc.$id,
            title: doc.title,
            html,
            date: epochToIST(doc.timestamp),
            firstImage,
          };
        });

        blogStore.set({
          allBlogs: blogs,
          initialized: true,
          blogsPerPage,
          currentPage
        });
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      }
    }

    updateDisplayedBlogs();
    loading = false;
  });
</script>

{#if loading}
  <div class="bg-primary py-20 px-4">
    <h1 class="text-3xl font-bold mb-8 text-center">Blogs</h1>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
    >
      {#each Array(6) as _, i}
        <div class=" p-4 rounded-lg shadow animate-pulse" key={i}>
          <div class="h-60 bg-gray-300 rounded mb-4"></div>
          <div class="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div class="h-6 bg-gray-300 rounded w-3/4"></div>
        </div>
      {/each}
    </div>
  </div>
{:else if displayedBlogs.length === 0}
  <p class="text-lg text-gray-500 text-center py-8">No blogs available.</p>
{:else}
  <div class="bg-primary py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold mb-8 text-center">Blogs</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each displayedBlogs as blog}
          <a href={`/blogs/${blog.id}`} class="block group">
            <div
              class="bg-[#F6F6F1] rounded-lg overflow-hidden shadow hover:shadow-md transition"
            >
              <div class="overflow-hidden">
                <img
                  src={blog.firstImage || "/placeholder.jpg"}
                  alt="Blog image"
                  class="w-full h-60 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
              <div class="p-4">
                <div class="text-xs text-gray-500 mb-2">{blog.date}</div>
                <div class="text-lg font-semibold">
                  {blog.title}
                </div>
              </div>
            </div>
          </a>
        {/each}
      </div>

      {#if displayedBlogs.length < allBlogs.length}
        <div class="flex justify-center mt-8">
          <button
            on:click={loadMoreBlogs}
            class="px-6 py-2 text-[#736677] rounded transition"
          >
            Load More
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}
