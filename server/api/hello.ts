export default defineEventHandler((event) => {
    const query = getQuery(event);
    const name = query?.name ?? "Bright";
    return {
        greeting: `Hello ${name}!`
    }
})