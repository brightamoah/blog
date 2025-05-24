import { table } from "#build/ui";
import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
   collections: {
      blogs: defineCollection({
         type: "page",
         source: "**/*.md",
         schema: z.object({
            date: z.string(),
            thumbnail: z.string().optional(),
            readTime: z.number().optional(),
            author: z
               .strictObject({
                  name: z.string(),
                  avatar: z.string(),
                  role: z.string().optional(),
               })
               .optional(),
            tags: z.array(z.string()).optional(),
         }),
      }),
   },
});
