import type { BlogStore, Post, PostForm } from "~/types/type";

export const useBlogStore = defineStore("BlogStore", () => {
  // Changed to control modal visibility through the navbar
  const isSearchOpen = ref(false);
  const searchQuery = ref("");
  const searchResults = ref<Post[]>([]);
  const selectedCategory = ref<string | null>(null);
  const isSearching = ref(false);
  const blogs = ref<Post[]>([]);

  const categories = ref<string[]>([
    "Technology",
    "Design",
    "Business",
    "Lifestyle",
    "Travel",
  ]);

  const featuredPosts = ref<Post[]>([
    {
      id: 1,
      title: "The Future of Web Development with Nuxt 3",
      excerpt:
        "Explore the latest features and improvements in Nuxt 3 and how they can enhance your development workflow.",
      image: "https://placehold.co/800x400/3b82f6/ffffff?text=Nuxt+3",
      category: "Technology",
      date: "May 10, 2025",
      author: {
        name: "Jane Smith",
        avatar: "https://placehold.co/100/3b82f6/ffffff?text=JS",
      },
    },
    {
      id: 2,
      title: "Designing for Accessibility",
      excerpt:
        "Learn how to create inclusive web experiences that work for everyone.",
      image: "https://placehold.co/400x200/10b981/ffffff?text=Accessibility",
      category: "Design",
      date: "May 8, 2025",
      author: {
        name: "Alex Johnson",
        avatar: "https://placehold.co/100/10b981/ffffff?text=AJ",
      },
    },
    {
      id: 3,
      title: "Firebase vs Supabase: Which is Right for Your Project?",
      excerpt:
        "A comprehensive comparison of two popular backend-as-a-service platforms.",
      image:
        "https://placehold.co/400x200/f59e0b/ffffff?text=Firebase+vs+Supabase",
      category: "Technology",
      date: "May 5, 2025",
      author: {
        name: "Michael Brown",
        avatar: "https://placehold.co/100/f59e0b/ffffff?text=MB",
      },
    },
  ]);

  const latestPosts = ref<Post[]>([
    {
      id: 4,
      title: "Getting Started with Tailwind CSS v4",
      excerpt:
        "Learn how to set up and use the latest version of Tailwind CSS in your projects.",
      image: "https://placehold.co/600x400/6366f1/ffffff?text=Tailwind+CSS+v4",
      category: "Technology",
      date: "May 3, 2025",
      author: {
        name: "Sarah Lee",
        avatar: "https://placehold.co/100/6366f1/ffffff?text=SL",
      },
    },
    {
      id: 5,
      title: "Building a Personal Brand as a Developer",
      excerpt:
        "Tips and strategies for establishing yourself in the tech industry.",
      image:
        "https://placehold.co/600x400/ec4899/ffffff?text=Personal+Branding",
      category: "Business",
      date: "May 1, 2025",
      author: {
        name: "David Wilson",
        avatar: "https://placehold.co/100/ec4899/ffffff?text=DW",
      },
    },
    {
      id: 6,
      title: "The Art of Minimalist Web Design",
      excerpt:
        "How to create impactful websites with less elements and more intention.",
      image:
        "https://placehold.co/600x400/8b5cf6/ffffff?text=Minimalist+Design",
      category: "Design",
      date: "April 28, 2025",
      author: {
        name: "Emma Garcia",
        avatar: "https://placehold.co/100/8b5cf6/ffffff?text=EG",
      },
    },
    {
      id: 7,
      title: "Remote Work Tools for Developers",
      excerpt:
        "The best software and hardware to optimize your remote work setup.",
      image: "https://placehold.co/600x400/14b8a6/ffffff?text=Remote+Work",
      category: "Lifestyle",
      date: "April 25, 2025",
      author: {
        name: "Ryan Taylor",
        avatar: "https://placehold.co/100/14b8a6/ffffff?text=RT",
      },
    },
    {
      id: 8,
      title: "Exploring Japan as a Digital Nomad",
      excerpt:
        "A guide to working remotely while experiencing Japanese culture.",
      image: "https://placehold.co/600x400/f43f5e/ffffff?text=Japan",
      category: "Travel",
      date: "April 22, 2025",
      author: {
        name: "Olivia Chen",
        avatar: "https://placehold.co/100/f43f5e/ffffff?text=OC",
      },
    },
    {
      id: 9,
      title: "State Management in Vue 3 with Pinia",
      excerpt:
        "How to effectively manage application state using the Pinia library.",
      image: "https://placehold.co/600x400/22c55e/ffffff?text=Pinia",
      category: "Technology",
      date: "April 20, 2025",
      author: {
        name: "James Kim",
        avatar: "https://placehold.co/100/22c55e/ffffff?text=JK",
      },
    },
  ]);

  async function getBlog() {
    const { data: blog, pending, error, refresh } = await useFetch("/api/blog");
    if (error.value) {
      console.error("Error fetching blog data:", error.value);
    }
    if (pending.value) {
      console.log("Loading blog data...");
    }

    return blog;
  }

  const fetchedPosts = computed(async () => {
    const blogRef = await getBlog();
    const blogPosts = blogRef?.value || [];
    const post = [...featuredPosts.value, ...blogPosts];
    blogs.value = post;
    return post as Post[];
  });

  // Computed properties
  const filteredLatestPosts = computed(() => {
    if (!selectedCategory) return latestPosts.value;
    return latestPosts.value.filter(
      (post) => post.category === selectedCategory.value,
    );
  });

  // Methods
  const searchPosts = () => {
    // If search query is empty, clear the results
    if (!searchQuery.value.trim()) {
      searchResults.value = [];
      return;
    }

    const query = searchQuery.value.toLowerCase();
    const allPosts = [
      ...featuredPosts.value,
      ...latestPosts.value,
      ...blogs.value,
    ];

    searchResults.value = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query),
    );
  };

  const clearSearch = () => {
    searchQuery.value = "";
    searchResults.value = [];
  };

  // New methods for controlling search modal globally
  const openSearchModal = () => {
    isSearchOpen.value = true;
  };

  const closeSearchModal = () => {
    isSearchOpen.value = false;
    clearSearch();
  };

  const postForm = ref<PostForm>({
    id: 0,
    title: "",
    category: "",
    image: "",
    excerpt: "",
    content: "",
  });

  return {
    categories,
    postForm,
    isSearchOpen,
    isSearching,
    searchQuery,
    searchResults,
    selectedCategory,
    featuredPosts,
    latestPosts,
    filteredLatestPosts,
    blogs,
    searchPosts,
    clearSearch,
    openSearchModal,
    closeSearchModal,
    getBlog,
    fetchedPosts,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBlogStore, import.meta.hot));
}
