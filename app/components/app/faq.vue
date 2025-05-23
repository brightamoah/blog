<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";

const faqs = ref<AccordionItem[]>([
  {
    label: "How often do you publish new blog posts?",
    content:
      "We publish new blog posts every week, typically on Wednesdays. Stay tuned for fresh content by subscribing to our newsletter.",
  },
  {
    label: "Can I contribute to your blog?",
    content:
      "Yes, we welcome guest contributions! Please reach out to us via the contact form with your topic ideas, and we’ll get back to you with guidelines.",
  },
  {
    label: "How can I subscribe to your blog updates?",
    content:
      "You can subscribe to our blog updates by entering your email address in the subscription form at the bottom of the page. We’ll send you notifications whenever a new post is published.",
  },
  {
    label: "Do you cover specific topics on your blog?",
    content:
      "Our blog covers a variety of topics, including technology, programming tutorials, industry trends, and productivity tips. Let us know if there’s a specific topic you’d like us to cover!",
  },
  {
    label: "Are your blog posts free to access?",
    content:
      "Yes, all our blog posts are completely free to access. We believe in sharing knowledge and making it accessible to everyone.",
  },
  {
    label: "Can I share your blog posts on social media?",
    content:
      "Absolutely! Feel free to share our blog posts on social media or with your friends. We appreciate your support in spreading the word.",
  },
  {
    label: "Do you have a newsletter for blog updates?",
    content:
      "Yes, we have a newsletter where we share updates about new blog posts, special announcements, and exclusive content. You can subscribe at the bottom of the page.",
  },
  {
    label: "How can I provide feedback on your blog?",
    content:
      "We value your feedback! You can provide feedback by leaving a comment on the blog post or reaching out to us through the contact form.",
  },
]);
</script>

<template>
  <div class="mx-auto w-[95%] md:w-[100%]">
    <h2 class="mb-8 text-center text-2xl font-bold md:text-3xl">
      Frequently Asked Questions
    </h2>
    <UAccordion
      :items="faqs"
      :ui="{
        label: 'text-lg font-bold',
        content: 'text-lg font-medium',
        item: ' border-(--ui-border-accented)',
      }"
      class="mx-auto max-w-3xl rounded-4xl border-2 p-6"
    />
  </div>
</template>
