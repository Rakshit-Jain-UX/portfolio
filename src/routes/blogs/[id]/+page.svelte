<script>
  export let data;
  const { blog } = data;

  import { onMount } from "svelte";

  let modifiedHtml = blog.html;
  let tableOfContents = [];
  let firstImageUrl = null;
  let currentUrl = "";

  onMount(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(blog.html, "text/html");

    // Extract and set alt for images, also get first image url
    const images = doc.querySelectorAll("img");
    firstImageUrl = null;
    images.forEach((img, index) => {
      if (!firstImageUrl) firstImageUrl = img.src;

      const url = img.getAttribute("src");
      let altText = "";

      if (url) {
        const parts = url.split("/");
        const potentialId = parts[parts.length - 2]; // might be a file ID
        if (potentialId && isNaN(potentialId)) {
          altText = potentialId
            .replace(/[^a-zA-Z0-9\s]/g, "")
            .trim()
            .replace(/\s+/g, "-")
            .toLowerCase();
        }
      }

      if (!altText) {
        altText = blog.title
          ? `${blog.title} image`.replace(/\s+/g, "-").toLowerCase()
          : `blog-image-${index}`;
      }

      img.setAttribute("alt", altText);
    });

    // Style tags inline
    const styleMap = {
  h1: "font-size:2.25rem;font-weight:700;margin:1.5rem 0 1rem;",
  h2: "font-size:1.875rem;font-weight:700;margin:1.5rem 0 1rem;",
  h3: "font-size:1.5rem;font-weight:700;margin:1.5rem 0 1rem;",
  h4: "font-size:1.25rem;font-weight:700;margin:1.5rem 0 1rem;",
  h5: "font-size:1.125rem;font-weight:700;margin:1.5rem 0 1rem;",
  h6: "font-size:1rem;font-weight:700;font-style:italic;margin:1.5rem 0 1rem;",

  p: "margin:1rem 0;",
  a: "color:#3b82f6;text-decoration:underline;",
  img: "max-width:100%;border-radius:2rem;width:100%;box-shadow:0 0 5px #00000040;margin:1rem 0;",

  blockquote: "border-left:4px solid #d1d5db;background:#f9fafb;padding:1rem;margin:1rem 0;font-style:italic;color:#4b5563;",

  ul: "margin:1rem 0 1rem 1.5rem;padding-left:1.5rem;list-style-type:disc;",
  ol: "margin:1rem 0 1rem 1.5rem;padding-left:1.5rem;list-style-type:decimal;",
  li: "margin-bottom:0.5rem;",

  strong: "font-weight:700;",
  em: "font-style:italic;",
  u: "text-decoration:underline;",
  s: "text-decoration:line-through;",

  code: "font-family:monospace;background:#f3f4f6;color:#111827;padding:0.2rem 0.4rem;border-radius:0.375rem;",
  pre: "font-family:monospace;background:#f3f4f6;padding:1rem;border-radius:0.5rem;overflow-x:auto;margin:1rem 0;",

  hr: "border:none;border-top:1px solid #d1d5db;margin:2rem 0;",

  button: "background:#3b82f6;color:white;border:none;padding:0.5rem 1rem;border-radius:0.375rem;font-weight:500;cursor:pointer;",

  table: "width:100%;border-collapse:collapse;margin:1rem 0;",
  thead: "background:#f3f4f6;font-weight:600;",
  th: "padding:0.75rem;border:1px solid #e5e7eb;text-align:left;",
  td: "padding:0.75rem;border:1px solid #e5e7eb;text-align:left;",
  tr: "", // leave as is unless specific style needed
};
// Handle Quill class-based styles
const quillClassMap = {
  "ql-align-center": "text-align:center;",
  "ql-align-right": "text-align:right;",
  "ql-align-justify": "text-align:justify;",
};

Object.keys(quillClassMap).forEach((className) => {
  const elements = doc.querySelectorAll(`.${className}`);
  elements.forEach((el) => {
    const existing = el.getAttribute("style") || "";
    el.setAttribute("style", `${existing}${quillClassMap[className]}`);
  });
});

// Handle indentation (e.g., ql-indent-1, ql-indent-2, ...)
for (let i = 1; i <= 8; i++) {
  const indentClass = `ql-indent-${i}`;
  const indentElements = doc.querySelectorAll(`.${indentClass}`);
  indentElements.forEach((el) => {
    const existing = el.getAttribute("style") || "";
    el.setAttribute("style", `${existing}padding-left:${i * 2}rem;`);
  });
}


    Object.keys(styleMap).forEach((tag) => {
      const elements = doc.querySelectorAll(tag);
      elements.forEach((el) => {
        el.setAttribute("style", styleMap[tag]);
      });
    });

    modifiedHtml = doc.body.innerHTML;

    // Get current URL client-side
    currentUrl = window.location.href;
  });
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

  {#if firstImageUrl}
    <meta property="og:image" content={firstImageUrl} />
    <meta name="twitter:image" content={firstImageUrl} />
    <meta property="og:image:alt" content={blog.title} />
    <meta name="twitter:image:alt" content={blog.title} />
    <meta name="twitter:card" content="summary_large_image" />
  {/if}

  <meta property="og:type" content="article" />

  {#if currentUrl}
    <meta property="og:url" content={currentUrl} />
    <link rel="canonical" href={currentUrl} />
  {/if}

  <meta name="twitter:site" content="@your_twitter_handle" />
</svelte:head>

<section>
  <div class="blog-container">
    <article>
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
    width: 100%;
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
