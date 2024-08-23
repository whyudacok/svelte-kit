<script>
  import { onMount } from "svelte";

  let animeData = [];
  let loading = true;

  onMount(async () => {
    try {
      const res = await fetch("https://cihuyy-api.vercel.app/api/anime/latest");
      const data = await res.json();
      if (data.status) {
        animeData = data.data.results;
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="flex justify-center items-center">
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
              <div class="relative h-[160px] w-[105px] sm:w-[135px] sm:h-[190px] md:h-[230px] md:w-[155px] xl:h-[255px] xl:w-[175px] rounded-xl xl:rounded-2xl">
                <div class="w-full h-full rounded-xl xl:rounded-2xl overflow-hidden bg-[#1e1e24] aspect-[15/9] flex-shrink-0 shadow-[4px_0px_5px_0px_rgba(0,0,0,0.3)] group">
                  <img
                    alt="{anime.judul}"
                    loading="eager"
                    width="155"
                    height="230"
                    decoding="async"
                    data-nimg="1"
                    class="w-full h-full object-cover rounded-xl xl:rounded-2xl transition-transform duration-300 group-hover:scale-105"
                    style="color: transparent;"
                    src="{anime.gambar}"
                  />
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
