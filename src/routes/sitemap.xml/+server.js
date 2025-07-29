import { databases } from "$lib/appWriteConfig";

const DATABASE_ID = import.meta.env.VITE_DB_ID;
const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID;

/** @type {import('./$types').RequestHandler} */
export const GET = async () => {
  try {
    // Fetch all blog documents from Appwrite
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

    const baseUrl = "https://rakshit-jain.vercel.app";

    const urls = response.documents.map((doc) => {
      return `
  <url>
    <loc>${baseUrl}/blogs/${doc.$id}</loc>
  </url>`;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
  </url>
  <url>
    <loc>${baseUrl}/blogs</loc>
  </url>
  ${urls.join("")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (err) {
    console.error("Error generating sitemap:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};
