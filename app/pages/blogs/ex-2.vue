<script lang="ts" setup>
import type { Post, Comment } from "~/types/type";

const route = useRoute();
const router = useRouter();
const blogStore = useBlogStore();
const { featuredPosts, latestPosts, blogs } = storeToRefs(blogStore);

// User state for comments
const userAvatar = ref("/placeholder.svg?height=40&width=40");
const userName = ref("Guest User");

// Comments state
const comments = ref<Comment[]>([
  {
    id: 1,
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "This article was incredibly insightful! I especially loved the points about modern design principles.",
    date: "2 days ago",
    likes: 12,
  },
  {
    id: 2,
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: `Great read! I've been following this topic for a while and this adds some fresh perspective.`,
    date: "5 days ago",
    likes: 8,
  },
]);

const newComment = ref("");
const isSubmitting = ref(false);

const postId = computed(() => {
  const id = route.params.id;
  return typeof id === "string"
    ? parseInt(id)
    : Array.isArray(id) && id[0]
      ? parseInt(id[0])
      : null;
});

const post = computed<Post | null>(() => {
  if (!postId.value) return null;

  // Find post in either featured or latest posts
  const allPosts = [...featuredPosts.value, ...latestPosts.value, ...blogs.value];
  return allPosts.find((p) => p.id === postId.value) || null;
});

// Submit comment function
const submitComment = () => {
  if (!newComment.value.trim()) return;

  isSubmitting.value = true;

  // Simulate API call
  setTimeout(() => {
    const newCommentObj: Comment = {
      id: comments.value.length + 1,
      author: {
        name: userName.value,
        avatar: userAvatar.value,
      },
      content: newComment.value,
      date: "Just now",
      likes: 0,
    };

    comments.value.unshift(newCommentObj);
    newComment.value = "";
    isSubmitting.value = false;
  }, 500);
};

// Like comment function
const likeComment = (commentId: number) => {
  const comment = comments.value.find((c: Comment) => c.id === commentId);
  if (comment) {
    comment.likes++;
  }
};

// Format date function
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// definePageMeta({
//   layout: "blog",
//   title: post.value ? post.value.title : "Post Not Found",
//   meta: [
//     {
//       name: "description",
//       content: post.value ? post.value.excerpt : "Post not found.",
//     },
//   ],
// });
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div v-if="post" class="container mx-auto px-4 py-12">
      <!-- Breadcrumb Navigation -->
      <!-- <UBreadcrumb class="mb-8">
        <UBreadcrumbItem to="/">Home</UBreadcrumbItem>
        <UBreadcrumbItem to="/blogs">Blog</UBreadcrumbItem>
        <UBreadcrumbItem :to="`/blogs/${post.id}`">{{
          post.title
        }}</UBreadcrumbItem>
      </UBreadcrumb> -->

      <!-- Post Header -->
      <div class="mb-12 text-center">
        <div class="mb-6 flex flex-wrap items-center justify-center gap-4">
          <UBadge color="primary" size="lg" class="text-sm font-medium">
            {{ post.category }}
          </UBadge>
          <span class="text-muted-foreground flex items-center gap-2">
            <UIcon name="uil:calendar-alt" class="h-4 w-4" />
            {{ formatDate(post.date) }}
          </span>
        </div>

        <h1
          class="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl"
        >
          {{ post.title }}
        </h1>

        <!-- Author -->
        <div class="flex items-center justify-center gap-3">
          <UAvatar
            :src="post.author.avatar"
            :alt="post.author.name"
            size="lg"
          />
          <div class="text-left">
            <div class="font-medium">{{ post.author.name }}</div>
            <div class="text-muted-foreground text-sm">Author</div>
          </div>
        </div>
      </div>

      <!-- Featured Image -->
      <div
        class="mx-auto w-[80%] overflow-hidden rounded-2xl mb-12 "
      >
        <img
          :src="post.image"
          :alt="post.title"
          class="h-64 w-full object-cover object-center transition-transform duration-500 md:h-85"
          loading="lazy"
        />
      </div>

      <!-- Post Content -->
      <div class="prose prose-lg dark:prose-invert mx-auto max-w-3xl">
        <p class="text-xl leading-relaxed font-medium">{{ post.excerpt }}</p>

        <UDivider class="my-8" />

        <!-- Placeholder for full content -->
        <p class="mt-6">
          This is where the full blog post content would be displayed.
          Currently, our post data model only includes the excerpt, but in a
          real application, we would have the full content stored and rendered
          here.
        </p>

        <!-- Sample Paragraphs (could be replaced with actual content) -->
        <h2>Understanding the Concept</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl
          nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl
          aliquam nisl, eget aliquam nisl nisl sit amet nisl.
        </p>

        <h2>Key Takeaways</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl
          nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl
          aliquam nisl, eget aliquam nisl nisl sit amet nisl.
        </p>

        <UDivider class="my-8" />

        <!-- Share Section -->
        <div class="my-8 flex items-center justify-between">
          <div class="text-lg font-medium">Share this article</div>
          <div class="flex gap-3">
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-simple-icons-twitter"
            />
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-simple-icons-facebook"
            />
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-simple-icons-linkedin"
            />
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-simple-icons-reddit"
            />
          </div>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="mx-auto mt-16 max-w-3xl">
        <h3 class="mb-6 text-2xl font-bold">
          Comments ({{ comments.length }})
        </h3>

        <!-- Comment Form -->
        <div class="mb-8 rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
          <div class="mb-4 flex items-center gap-3">
            <UAvatar :src="userAvatar" :alt="userName" size="md" />
            <div class="font-medium">{{ userName }}</div>
          </div>

          <UTextarea
            v-model="newComment"
            placeholder="Share your thoughts..."
            class="mb-4"
          />

          <div class="flex justify-end">
            <UButton
              color="primary"
              :loading="isSubmitting"
              :disabled="!newComment.trim()"
              @click="submitComment"
            >
              Post Comment
            </UButton>
          </div>
        </div>

        <!-- Comments List -->
        <div v-if="comments.length > 0" class="space-y-6">
          <UCard
            v-for="comment in comments"
            :key="comment.id"
            class="transition-all duration-300 hover:shadow-md"
          >
            <div class="flex items-start gap-4">
              <UAvatar
                :src="comment.author.avatar"
                :alt="comment.author.name"
                size="md"
              />

              <div class="flex-1">
                <div class="mb-1 flex items-center justify-between">
                  <div class="font-medium">{{ comment.author.name }}</div>
                  <div class="text-muted-foreground text-sm">
                    {{ comment.date }}
                  </div>
                </div>

                <p class="mb-3 text-base">{{ comment.content }}</p>

                <div class="flex items-center gap-2">
                  <UButton
                    variant="ghost"
                    color="neutral"
                    size="sm"
                    icon="i-heroicons-heart"
                    @click="likeComment(comment.id)"
                  >
                    {{ comment.likes }}
                  </UButton>

                  <UButton
                    variant="ghost"
                    color="neutral"
                    size="sm"
                    icon="i-heroicons-chat-bubble-left"
                  >
                    Reply
                  </UButton>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <div v-else class="text-muted-foreground py-8 text-center">
          Be the first to comment on this post!
        </div>
      </div>

      <!-- Back to Blog Button -->
      <div class="mt-12 flex justify-center">
        <UButton
          @click="router.push('/blogs')"
          variant="outline"
          icon="i-heroicons-arrow-left"
          class="font-medium"
        >
          Back to Blog
        </UButton>
      </div>
    </div>

    <div v-else class="container mx-auto px-4 py-24 text-center">
      <UIcon
        name="i-heroicons-face-frown"
        class="mx-auto mb-6 h-16 w-16 text-gray-400"
      />
      <h2 class="mb-4 text-3xl font-bold">Post Not Found</h2>
      <p class="text-muted-foreground mb-8 text-lg">
        The post you are looking for does not exist or has been removed.
      </p>
      <UButton
        @click="router.push('/blogs')"
        color="primary"
        icon="i-heroicons-arrow-left"
      >
        Return to Blog
      </UButton>
    </div>
  </div>
</template>
