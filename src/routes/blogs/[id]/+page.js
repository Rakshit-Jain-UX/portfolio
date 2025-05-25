import { databases } from "$lib/appWriteConfig";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { error } from "@sveltejs/kit";

const DATABASE_ID = import.meta.env.VITE_DB_ID;
const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID;

export async function load({ params }) {
  try {
    const doc = await databases.getDocument(DATABASE_ID, COLLECTION_ID, params.id);

    const delta = JSON.parse(doc.content);
    const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
    const html = converter.convert();
    console.log(delta, converter, html)
    return {
      blog: {
        title: doc.title,
        description: doc.description,
        html,
      }
    };
  } catch (err) {
    throw error(404, "Blog not found");
  }
}
