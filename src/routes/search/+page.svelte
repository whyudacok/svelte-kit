<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let mangaList = [];
  let totalPages = 1;
  let error = null;

  // Get query parameters from the URL
  $: {
    const urlParams = new URLSearchParams($page.url.search);
    const pageParam = urlParams.get('page') || 1;
    const genres = urlParams.getAll('genre') || [];
    const status = urlParams.getAll('status') || [];
    const type = urlParams.getAll('type') || [];
    const format = urlParams.getAll('format') || [];
    const order = urlParams.get('order') || '';
    const project = urlParams.get('project') || '';
    const title = urlParams.get('title') || '';

    // Helper function to build query strings for arrays
    const buildArrayQuery = (key, values) => {
      return values.map((value, index) => `${key}%5B${index}%5D=${encodeURIComponent(value)}`).join('&');
    };

    const genreQuery = buildArrayQuery('genre', genres);
    const statusQuery = buildArrayQuery('status', status);
    const typeQuery = buildArrayQuery('type', type);
    const formatQuery = buildArrayQuery('format', format);

    const buildQuery = (key, value) => value ? `${key}=${encodeURIComponent(value)}&` : '';

    const queryString = [
      genreQuery,
      statusQuery,
      typeQuery,
      formatQuery,
      buildQuery('order', order),
      buildQuery('project', project),
      buildQuery('title', title)
    ].filter(Boolean).join('');

    const apiUrl = `https://api.koranime.fun/search/${pageParam}/?${queryString}`;

    // Fetch data from the API
    onMount(async () => {
      try {
        const response = await fetch(apiUrl, {
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        mangaList = data.mangaList;
        totalPages = data.totalPages || 1;
      } catch (err) {
        error = 'Failed to load manga data. Please try again later.';
      }
    });
  }
</script>

<main class="p-8">
  {#if error}
    <p class="text-red-500">{error}</p>
  {:else if mangaList.length === 0}
    <p>Loading...</p>
  {:else}
    {#each mangaList as manga}
      <a href={manga.href}>
        <div class="rounded-2xl border border-border-gray relative aspect-10/15 overflow-hidden flex justify-end flex-col hoverShadow hover:border-primary transition-all group">
          <span class="absolute bg-black bg-opacity-50 top-4 left-4 text-white text-xs rounded px-1.5 py-1 font-medium">{manga.type}</span>
          <span class="gradient-background-primary absolute top-4 right-4 text-black text-xs rounded px-1.5 py-1 font-medium">{manga.rating}</span>
          <img loading="lazy" src={manga.imgSrc} class="absolute w-full h-full -z-20" alt={manga.title} />
          <div class="absolute w-full h-full top-0 left-0 rounded-2xl hottestGradient"></div>
          <div class="absolute w-full h-full top-0 left-0 rounded-2xl hottestGradientHover invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all"></div>
          <div class="py-4 mx-4 relative z-10">
            <p class="line-clamp-2 mb-2 font-haffer text-lg font-semibold text-center">
              {manga.title}
            </p>
            <div class="flex items-center justify-center sm:flex-row flex-col sm:gap-4 gap-0">
              <!-- Additional info can go here -->
            </div>
          </div>
        </div>
      </a>
    {/each}
  {/if}
</main>

<style>
  .text-lightgray {
    color: #a0a0a0;
  }
  .border-border-gray {
    border-color: #e0e0e0;
  }
  .bg-background-detail {
    background-color: #f9f9f9;
  }
  .gradient-text-primary {
    background: linear-gradient(to right, #ff7e5f, #feb47b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .hottestGradient {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  }
  .hottestGradientHover {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  }
  .hoverShadow:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  .hover\:border-primary:hover {
    border-color: #ff7e5f;
  }
</style>
