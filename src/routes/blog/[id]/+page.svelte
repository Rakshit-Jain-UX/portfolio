<script>
  export let data;
  const { blog } = data;

  import { onMount } from "svelte";

  let modifiedHtml = blog.html;
  console.log(1, blog.title);
  let tableOfContents = [];

  onMount(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(blog.html, "text/html");

    const headers = doc.querySelectorAll("h1, h2, h3");
    tableOfContents = [];

    headers.forEach((header, index) => {
      const id = `heading-${index}`;
      header.setAttribute("id", id);
      tableOfContents.push({
        id,
        text: header.innerText,
        level: parseInt(header.tagName[1]),
      });
    });
    const images = doc.querySelectorAll('img');

images.forEach((img, index) => {
  const url = img.getAttribute('src');
  let altText = '';

  if (url) {
    // Try to get filename from src if present
    const parts = url.split('/');
    const potentialId = parts[parts.length - 2]; // might be a file ID

    // Check if it looks like a filename
    if (potentialId && isNaN(potentialId)) {
      altText = potentialId
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .toLowerCase();
    }
  }

  // Fallback to blog title or generic
  if (!altText) {
    altText = blog.title
      ? `${blog.title} image`.replace(/\s+/g, '-').toLowerCase()
      : `blog-image-${index}`;
  }

  img.setAttribute('alt', altText);
});

    // Apply inline styles dynamically
    const styleMap = {
      h1: "font-size:2.25rem;font-weight:700;margin:1.5rem 0 1rem;",
      h2: "font-size:1.875rem;font-weight:700;margin:1.5rem 0 1rem;",
      h3: "font-size:1.5rem;font-weight:700;margin:1.5rem 0 1rem;",
      h4: "font-size:1.25rem;font-weight:700;margin:1.5rem 0 1rem;",
      h5: "font-size:1.125rem;font-weight:700;margin:1.5rem 0 1rem;",
      h6: "font-size:1rem;font-weight:700;font-style:italic;margin:1.5rem 0 1rem;",
      p: "margin:1rem 0;",
      a: "color:#3b82f6;text-decoration:underline;",
      img: "max-width:100%;border-radius:0.5rem;margin:1rem 0;",
      blockquote:
        "border-left:4px solid #d1d5db;background:#f9fafb;padding:1rem;margin:1rem 0;font-style:italic;color:#4b5563;",
      ul: "margin:1rem 0 1rem 1.5rem;padding-left:1rem;",
      ol: "margin:1rem 0 1rem 1.5rem;padding-left:1rem;",
      li: "margin-bottom:0.5rem;",
      button:
        "background:#3b82f6;color:white;border:none;padding:0.5rem 1rem;border-radius:0.375rem;font-weight:500;cursor:pointer;",
    };

    Object.keys(styleMap).forEach((tag) => {
      const elements = doc.querySelectorAll(tag);
      elements.forEach((el) => {
        el.setAttribute("style", styleMap[tag]);
      });
    });

    modifiedHtml = doc.body.innerHTML;
  });

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
</script>

<svelte:head>
  <title>{blog.title}</title>

  {#if blog.description}
    <meta name="description" content={blog.description} />
    <meta property="og:description" content={blog.description} />
    <meta name="twitter:description" content={blog.description} />
  {/if}

  <meta property="og:title" content={blog.title} />
  <meta name="twitter:title" content={blog.title} />

  {#if blog.html}
    {#await Promise.resolve().then(() => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(blog.html, "text/html");
      const firstImg = doc.querySelector('img');
      return firstImg?.src || null;
    }) then imgUrl}
      {#if imgUrl}
        <meta property="og:image" content={imgUrl} />
        <meta name="twitter:image" content={imgUrl} />
        <meta property="og:image:alt" content={blog.title} />
        <meta name="twitter:image:alt" content={blog.title} />
        <meta name="twitter:card" content="summary_large_image" />
      {/if}
    {/await}
  {/if}

  <meta property="og:type" content="article" />
  <meta property="og:url" content="{typeof window !== 'undefined' ? window.location.href : ''}" />
  <meta name="twitter:site" content="@your_twitter_handle" />
</svelte:head>


<section>
  <div class="blog-container">
    <article>
      <h1 class="text-4xl font-bold mb-4">{blog.title}</h1>
      {#if blog.description}
        <p class="text-gray-600 mb-2 italic">{blog.description}</p>
      {/if}

      <div class="toc mb-4">
        <h2 class="font-semibold">Table of Contents</h2>
        <ul>
          {#each tableOfContents as item}
            <li
              class="cursor-pointer text-blue-600 hover:underline"
              style="margin-left: {(item.level - 1) * 1}rem"
              on:click={() => scrollToSection(item.id)}
            >
              {item.text}
            </li>
          {/each}
        </ul>
      </div>

      <div>{@html modifiedHtml}</div>
    </article>
  </div>
</section>

<style>
  .toc {
    border-left: 4px solid #ddd;
    padding-left: 1rem;
    margin-bottom: 2rem;
  }
  .toc-item {
    cursor: pointer;
    color: #3b82f6;
    margin-left: 1rem;
  }
  .toc-item:hover {
    text-decoration: underline;
  }
  .blog-content {
    font-family: system-ui, sans-serif;
    line-height: 1.7;
    font-size: 1rem;
    color: #1f2937; /* Tailwind slate-800 */
  }

  .blog-content h1,
  .blog-content h2,
  .blog-content h3,
  .blog-content h4,
  .blog-content h5,
  .blog-content h6 {
    font-weight: 700 !important;
    margin: 1.5rem 0 1rem !important;
    line-height: 1.3 !important;
  }

  .blog-content h2 {
    font-size: 1.875rem; /* 30px */
  }

  .blog-content h3 {
    font-size: 1.5rem; /* 24px */
  }

  .blog-content h4 {
    font-size: 1.25rem;
  }

  .blog-content h5 {
    font-size: 1.125rem;
  }

  .blog-content h6 {
    font-size: 1rem;
    font-style: italic;
  }

  .blog-content p {
    margin: 1rem 0;
  }

  .blog-content a {
    color: #3b82f6; /* Tailwind blue-500 */
    text-decoration: underline;
  }

  .blog-content a:hover {
    text-decoration: none;
  }

  .blog-content img {
    max-width: 100%;
    border-radius: 0.5rem;
    margin: 1rem 0;
  }

  .blog-content blockquote {
    border-left: 4px solid #d1d5db; /* Tailwind gray-300 */
    background: #f9fafb;
    padding: 1rem;
    margin: 1rem 0;
    font-style: italic;
    color: #4b5563; /* Tailwind gray-600 */
  }

  .blog-content ul,
  .blog-content ol {
    margin: 1rem 0 1rem 1.5rem;
    padding-left: 1rem;
  }

  .blog-content li {
    margin-bottom: 0.5rem;
  }

  .blog-content button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .blog-content button:hover {
    background: #2563eb;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .blog-content h1 {
      font-size: 1.75rem;
    }
    .blog-content h2 {
      font-size: 1.5rem;
    }
    .blog-content h3 {
      font-size: 1.25rem;
    }
  }
</style>
