<script>
  import { onMount } from 'svelte';
  import { error } from '@sveltejs/kit';

  export let params;
  let animeData = null;
  let loading = true;
  let notFound = false;

  onMount(async () => {
    const endpoint = `https://cihuyy-api.vercel.app/api/anime/nonton/${params.end}`;
    
    try {
      const res = await fetch(endpoint);
      if (!res.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await res.json();

      if (data.status) {
        animeData = data.data;
      } else {
        notFound = true;
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      notFound = true;
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <p>Loading...</p>
{:else if notFound}
  <p>404 Not Found</p>
{:else}
  <h1>{animeData.judul}</h1>
  <p>Episode: {animeData.episodeNumber}</p>
  <p>Rating: {animeData.rating}</p>
  <p>Description: {animeData.description}</p>

  <h2>Video</h2>
  <ul>
    {#each animeData.video as video}
      <li>{video.server}: <a href={video.src} target="_blank" rel="noopener noreferrer">{video.src}</a></li>
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
  <h2>Episodes</h2>
  <ul>
    {#each animeData.episodes as episode}
      <li><a href={episode.link}>{episode.judul}</a></li>
    {/each}
  </ul>

  <h2>Download Links</h2>
  <ul>
    {#each animeData.serverdl as server}
      <li>{server.server}
        <ul>
          {#each server.links as link}
            <li><a href={link.url} target="_blank" rel="noopener noreferrer">{link.text}</a></li>
          {/each}
        </ul>
      </li>
    {/each}
  </ul>
{/if}
