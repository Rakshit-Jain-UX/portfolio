import { writable } from 'svelte/store';

export const blogStore = writable({
  allBlogs: [],
  initialized: false,
  blogsPerPage: 6,
  currentPage: 1
});
