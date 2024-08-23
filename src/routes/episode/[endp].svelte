<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let animeData = {};
  let loading = true;
  let error = false;
  let notFound = false;
  
  $: endpoint = $page.params.endp;

  onMount(async () => {
    try {
      const res = await fetch(`https://cihuyy-api.vercel.app/api/anime/nonton/${endpoint}`);
      const data = await res.json();

      if (res.ok) {
        if (data.status && data.data) {
          animeData = data.data;
        } else {
          notFound = true; // Status false atau data tidak ada
        }
      } else {
        notFound = true; // Respon tidak ok
      }
    } catch (err) {
      error = true;
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <p>Loading...</p>
{:else if error}
  <p>Error fetching data.</p>
{:else if notFound}
  <p>404 Not Found. Endpoint not valid or data does not exist.</p>
{:else}
  <div>
    <h1>{animeData.judul} - Episode {animeData.episodeNumber}</h1>
    <p>{animeData.description}</p>
    
    <h2>Video Utama</h2>
    <a href="{animeData.vidutama}" target="_blank">Tonton Video Utama</a>
    
    <h3>Server Video</h3>
    <ul>
      {#each animeData.video as vid}
        <li>
          <a href="{vid.src}" target="_blank">{vid.server}</a>
        </li>
      {/each}
    </ul>

    <h3>Episodes</h3>
    <ul>
      {#each animeData.episodes as episode}
        <li>
          <a href="{episode.link}">{episode.judul}</a>
        </li>
      {/each}
    </ul>

    <h3>Detail</h3>
    <ul>
      <li>Status: {animeData.detail["Status"]}</li>
      <li>Studio: <a href="{animeData.detail.Studio.link}">{animeData.detail.Studio.text}</a></li>
      <li>Telah Rilis: {animeData.detail["Telah rilis"]}</li>
      <li>Durasi: {animeData.detail["Durasi"]}</li>
      <li>Musim: <a href="{animeData.detail.Musim.link}">{animeData.detail.Musim.text}</a></li>
      <li>Jenis: {animeData.detail["Jenis"]}</li>
      <li>Pengarang: <a href="{animeData.detail.Pengarang.link}">{animeData.detail.Pengarang.text}</a></li>
    </ul>

    <h3>Genres</h3>
    <ul>
      {#each animeData.genres as genre}
        <li>
          <a href="{genre.link}">{genre.genre}</a>
        </li>
      {/each}
    </ul>

    <h3>Download Links</h3>
    {#each animeData.serverdl as server}
      <h4>{server.server}</h4>
      <ul>
        {#each server.links as link}
          <li><a href="{link.url}" target="_blank">{link.text}</a></li>
        {/each}
      </ul>
    {/each}
  </div>
{/if}
