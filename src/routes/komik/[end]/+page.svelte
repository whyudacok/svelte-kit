<script>
  import { onMount } from 'svelte';

  export let params;
  let manga = null;
  let error = null;

  // Fetch data from the API
  onMount(async () => {
    try {
      const response = await fetch(`https://api.koranime.fun/manga/${params.end}`);
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error('Failed to fetch data');
      }
      manga = await response.json();
      console.log('Manga data:', manga);
    } catch (err) {
      console.error('Fetch error:', err);
      error = 'Failed to load manga data. Please try again later.';
    }
  });
</script>

<main class="p-8">
  {#if error}
    <p class="text-red-500">{error}</p>
  {:else if !manga}
    <p>Loading...</p>
  {:else}
    <h1 class="text-2xl font-bold mb-4">{manga.title}</h1>
    <img src={manga.thumbnail} alt={manga.title} class="w-full h-auto mb-4"/>
    
    <div class="mb-4">
      <h2 class="text-xl font-semibold">Info</h2>
      <p>Rating: {manga.rating}</p>
      {#each Object.entries(manga.info) as [key, value]}
        <p>{key}: {value}</p>
      {/each}
    </div>

    <div class="mb-4">
      <h2 class="text-xl font-semibold">Genres</h2>
      <ul class="list-disc pl-5">
        {#each manga.genres as genre}
          <li><a href={genre.href} class="text-blue-500">{genre.title}</a></li>
        {/each}
      </ul>
    </div>

    <div class="mb-4">
      <h2 class="text-xl font-semibold">Synopsis</h2>
      <p>{manga.synopsis}</p>
    </div>

    <div class="mb-4">
      <h2 class="text-xl font-semibold">Chapters</h2>
      <ul class="list-disc pl-5">
        {#each manga.chapters as chapter}
          <li>
            <a href={chapter.chapterLink} class="text-blue-500">{chapter.chapter}</a>
            <p class="text-sm text-gray-500">{chapter.chapterDate}</p>
          </li>
        {/each}
      </ul>
    </div>

    <div class="mb-4">
      <h2 class="text-xl font-semibold">Related Manga</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each manga.relatedManga as related}
          <div class="bg-white rounded shadow-md overflow-hidden">
            <a href={related.href}>
              <img src={related.img} alt={related.title} class="w-full h-auto"/>
            </a>
            <div class="p-4">
              <h3 class="text-lg font-semibold">{related.title}</h3>
              <p class="text-sm text-gray-500">{related.infoAdditional}</p>
              <p class="text-sm text-gray-500">{related.excerpt}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</main>
