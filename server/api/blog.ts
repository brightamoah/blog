// import { defineEventHandler, getQuery } from "h3";
import { $fetch } from "ofetch";
import { Post } from "~/types/type";
import { useDateFormat } from "@vueuse/core";

export default defineEventHandler(async (event) => {
   const config = useRuntimeConfig();
   const rapidApiKey = config.public.rapidApiKey;
   const rapidApiHost = config.public.rapidApiHost;
   const rapidApiUrl = config.public.rapidApiUrl;

   const query = getQuery(event);

   const data = await $fetch(`${rapidApiUrl}/get-blogs`, {
      method: "GET",
      query: {
         q: query.q || "technology",
         from: query.from || "2025-04-20",
         to: query.to || "2025-05-16",
         sortBy: query.sortBy || "desc",
      },
      headers: {
         "X-RapidAPI-Key": rapidApiKey,
         "X-RapidAPI-Host": rapidApiHost,
      },
   });

   const content = data.response.articles;

   return content;
});
