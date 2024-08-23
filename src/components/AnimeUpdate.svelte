<script>
  import { onMount } from 'svelte';

  let animeData = [];
  let loading = true;

  onMount(async () => {
    try {
      // Cek apakah data cache masih valid
      const cacheKey = 'animeData';
      const cacheExpiryKey = 'animeDataExpiry';
      const cacheExpiry = 2 * 60 * 60 * 1000; // 2 jam dalam milidetik
      const cachedData = localStorage.getItem(cacheKey);
      const cachedExpiry = localStorage.getItem(cacheExpiryKey);

      if (cachedData && cachedExpiry && (Date.now() < parseInt(cachedExpiry))) {
        // Menggunakan data dari cache jika masih valid
        animeData = JSON.parse(cachedData);
      } else {
        // Fetch data dari API dan simpan ke cache
        const res = await fetch('https://cihuyy-api.vercel.app/api/anime/latest');
        const data = await res.json();
        if (data.status) {
          animeData = data.data.results;
          localStorage.setItem(cacheKey, JSON.stringify(animeData));
          localStorage.setItem(cacheExpiryKey, (Date.now() + cacheExpiry).toString());
        }
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="flex justify-center items-center h-3 w-3">
    <img src="https://c.tenor.com/ABkcBqwf1ZgAAAAC/tenor.gif" alt="Loading" />
  </div>
{:else}
  <div class="scroll-smooth flex flex-col mx-auto my-1 md:my-0">
    <div class="flex items-center gap-2 px-3 xl:px-0">
      <span class="w-[0.35rem] h-6 md:w-[0.3rem] rounded-md bg-white"></span>
      <h1 class="text-[19px] sm:text-[22px] my-4 font-medium md:font-semibold">Anime update</h1>
    </div>
    <div class="relative">
      <span class="flex items-center mb-5 cursor-pointer absolute left-0 bg-gradient-to-r from-black z-10 transition-all duration-300 invisible opacity-0 h-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-4">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
      </span>
      <span class="flex items-center mb-5 cursor-pointer absolute right-0 bg-gradient-to-l from-black z-10 transition-all duration-300 lg:px-3 visible h-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-4">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </span>
      <div class="relative flex flex-nowrap overflow-scroll overflow-y-hidden gap-3 scrollbar-hide pl-[0.75rem] xl:pl-0" id="Popular This Season" style="cursor: auto;">
        {#each animeData as anime}
        <a href="{anime.link}" style="cursor: pointer;">
          <div class="relative flex flex-col h-full hover:cursor-pointer group w-[105px] sm:w-[135px] md:w-[155px] xl:w-[175px]">
            <div class="flex-shrink-0 absolute top-0 right-0 flex font-medium items-center justify-center gap-[.4rem] bg-black/60 backdrop-blur text-white !text-xs line-clamp-1 z-[7] px-2 py-1 rounded-bl-lg tracking-wider">
              <span class="hidden md:flex">Episode</span><span class="md:hidden">Ep</span> <span class="font-medium text-purple-400">{anime.episode}</span>
            </div>
            <div class="relative h-[160px] w-[105px] sm:w-[135px] sm:h-[190px] md:h-[230px] md:w-[155px] xl:h-[255px] xl:w-[175px] rounded-xl xl:rounded-2xl">
              <div class="w-full h-full rounded-xl xl:rounded-2xl overflow-hidden bg-[#1e1e24] aspect-[15/9] flex-shrink-0 shadow-[4px_0px_5px_0px_rgba(0,0,0,0.3)] group">
                <img
                  alt="{anime.judul}"
                  loading="lazy"
                  width="155"
                  height="230"
                  decoding="async"
                  class="w-full h-full object-cover rounded-xl xl:rounded-2xl transition-transform duration-300 group-hover:scale-105"
                  src="{anime.gambar}"
                />
              </div>
              <div class="w-full h-full rounded absolute group-hover:bg-gradient-to-t from-black/85 to-transparent opacity-0 group-hover:opacity-100 top-0 z-[5] transition-all duration-300 ease justify-center">
                <div class="bottom-4 left-0 right-0 absolute text-xs font-medium flex flex-wrap items-center justify-center gap-[.3rem] z-[7]">
                  <span class="uppercase">Ep {anime.episode}</span> <span class="text-[10px]">•</span><span class="font-semibold text-green-400">{anime.jenis}</span><span class="text-[10px]">
                </div>
              </div>
            </div>
            <span class="overflow-hidden text-center text-[#d1d7e0] pt-1.5 px-1.5 sm:px-2 text-xs sm:text-sm font-medium line-clamp-2">
              <span class="aspect-square w-2 h-2 inline-block mr-1 rounded-full bg-green-500 xl:hidden"></span> {anime.judul}
            </span>
          </div>
        </a>
        {/each}
      </div>
    </div>
  </div>
{/if}
