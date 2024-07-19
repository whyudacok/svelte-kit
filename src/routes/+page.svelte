<script>
  import { onMount } from 'svelte';

  let updates = [];
  let popularComics = [];

  // Fetch data from the API
  onMount(async () => {
    const response = await fetch('https://api.koranime.fun/update/2');
    const data = await response.json();
    updates = data.updates;
    popularComics = data.popularComics;
  });
</script>

<style>
  /* Add custom styles if needed */
</style>

<main class="p-8">
  <h1 class="text-2xl font-bold mb-4">Latest Updates</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each updates as update}
      <div class="bg-white rounded shadow-md overflow-hidden">
        <a href={update.href}>
          <img src={update.imgSrc} alt={update.title} class="w-full h-auto"/>
        </a>
        <div class="p-4">
          <h2 class="text-xl font-semibold">{update.title}</h2>
          <p class="text-sm text-gray-500">{update.type}</p>
          <div class="mt-2">
            <a href={update.chapter.href} class="text-blue-500">
              {update.chapter.title}
            </a>
            <p class="text-gray-400">{update.chapter.date}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <h1 class="text-2xl font-bold mt-8 mb-4">Popular Comics</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each popularComics as comic}
      <div class="bg-white rounded shadow-md overflow-hidden">
        <a href={comic.href}>
          <img src={comic.imgSrc} alt={comic.title} class="w-full h-auto"/>
        </a>
        <div class="p-4">
          <h2 class="text-xl font-semibold">{comic.title}</h2>
          <p class="text-sm text-gray-500">Rank: {comic.rank}</p>
          <p class="text-sm text-gray-500">Love Views: {comic.loveViews}</p>
        </div>
      </div>
    {/each}
  </div>
</main>
