import type { Post } from "~/types/type";

console.log("Util function running");

export const goToPost = async (postId: Post["id"]) => {
  console.log("goToPost function running");
  const blogStore = useBlogStore();
  const { latestPosts, fetchedPosts } = storeToRefs(blogStore);

  const posts = await fetchedPosts.value;

  const featuredPosts = computed(() => {
    const newPosts = posts.slice(1, 30);
    return newPosts;
  });

  const post = [...featuredPosts.value, ...latestPosts.value].find(
    (p) => p.id === postId,
  );
  if (post) {
    navigateTo(`/blogs/${post.id}`);
  }
};
