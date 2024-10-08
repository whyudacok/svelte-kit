<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let manga = null;
  let error = null;
  let mangaId;

  $: {
    mangaId = $page.params.id;
  }

  // Fetch data from the API
  onMount(async () => {
    try {
      const response = await fetch(`https://api.koranime.fun/manga/${mangaId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      manga = await response.json();
    } catch (err) {
      error = 'Failed to load manga data. Please try again later.';
    }
  });
</script>

<svelte:head>
  <title>{manga ? manga.title.replace('Komik', '') : 'Loading...'}</title>
  <meta name="description" content={manga ? manga.synopsis : 'Loading...'} />
  <meta property="og:title" content={manga ? manga.title.replace('Komik', '') : 'Loading...'} />
  <meta property="og:description" content={manga ? manga.synopsis : 'Loading...'} />
  <meta property="og:url" content={manga ? `https://your-site-url.com/komik/${mangaId}` : 'https://your-site-url.com/komik'} />
  <meta property="og:image" content={manga ? manga.thumbnail : 'https://your-site-url.com/default-thumbnail.jpg'} />
</svelte:head>

<main class="p-8">
  {#if error}
    <p class="text-red-500">{error}</p>
  {:else if !manga}
    <p>Loading...</p>
  {:else}
    <h1 class="text-2xl font-bold mb-4">{manga.title.replace('Komik', '')}</h1>
    <img src={manga.thumbnail} alt={manga.title} class="w-full h-auto mb-4"/>
    
    <div class="mb-4">
      <h2 class="text-xl font-semibold">Info</h2>
      <p>Judul Alternatif: {manga.info['Judul Alternatif']}</p>
      <p>Status: {manga.info['Status']}</p>
      <p>Jenis Komik: {manga.info['Jenis Komik']}</p>
      <p>Author: {manga.info['Author']}</p>
      <p>Artis: {manga.info['Artis']}</p>
      <p>Rilis: {manga.info['Rilis']}</p>
      <p>Serialisasi: {manga.info['Serialisasi']}</p>
      <p>Jumlah Pembaca: {manga.info['Jumlah Pembaca']}</p>
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
      <input type="text" class="w-full p-4 text-sm font-medium bg-transparent border-0 outline-none" placeholder="Search chapter" />
      <div class="grid grid-cols-2 gap-4 mt-4 overflow-y-auto max-h-96 xl:grid-cols-4 xs:grid-cols-3" id="episodeList">
        {#each manga.chapters as chapter}
          <a title={chapter.chapter} href={`/chapter${chapter.chapterLink}`}>
            <div class="p-4 border border-border-gray bg-background-detail rounded-2xl">
              <p class="text-sm font-medium leading-4">{chapter.chapter}</p>
              <p class="text-xs font-medium leading-4 text-lightgray">{chapter.chapterDate}</p>
            </div>
          </a>
        {/each}
      </div>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4 gradient-text-primary">Rekomendasi</h2>
      <div class="flex space-x-4 overflow-x-auto">
        {#each manga.relatedManga as related}
          <a href={related.href} class="flex-shrink-0 w-36">
            <div class="rounded-2xl border border-border-gray relative aspect-10/15 overflow-hidden flex justify-end flex-col hover:shadow-lg hover:border-primary transition-all group">
              <img loading="lazy" src={related.img} class="absolute w-full h-full -z-20" alt={related.title} />
              <div class="absolute w-full h-full top-0 left-0 rounded-2xl hottestGradient"></div>
              <div class="absolute w-full h-full top-0 left-0 rounded-2xl hottestGradientHover invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all"></div>
              <div class="py-4 mx-4 relative z-10">
                <div class="flex items-center justify-center sm:flex-row flex-col sm:gap-4 gap-0">
                  <div class="flex items-center gap-2">
                    <i class="fa fa-palette"></i>
                    <p class="text-sm gradient-text-gray font-medium">{related.infoAdditional}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-1 my-2">
              <h3 class="group-hover:text-blue-500 font-medium text-center duration-200 truncate">{related.title}</h3>
            </div>
          </a>
        {/each}
      </div>
    </div>
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
  .hover\:shadow-lg:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  .hover\:border-primary:hover {
    border-color: #ff7e5f;
  }
</style>
