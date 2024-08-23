<script>
  import { onMount } from "svelte";

  let animeData = null;
  let loading = true;
  let error = null;
  let { endpo } = $page.params;

  onMount(async () => {
    try {
      const res = await fetch(`https://cihuyy-api.vercel.app/api/anime/anime/${endpo}`);

      // Cek status respons
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.status) {
        animeData = data.data;
      } else {
        error = "Anime data not found or error in fetching.";
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
      error = "An error occurred while fetching the anime data.";
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <p>Loading...</p>
{:else if error}
  <p>{error}</p>
{:else}
  <h1>{animeData.title}</h1>
  <p><strong>Rating:</strong> {animeData.rating}</p>
  <p><strong>Status:</strong> {animeData.info.Status}</p>
  <p><strong>Studio:</strong> <a href={animeData.info.Studio_link}>{animeData.info.Studio}</a></p>
  <p><strong>Durasi:</strong> {animeData.info.Durasi}</p>
  <p><strong>Musim:</strong> <a href={animeData.info.Musim_link}>{animeData.info.Musim}</a></p>

  <h2>Genre</h2>
  <ul>
    {#each animeData.genre as genre}
      <li><a href={genre.link}>{genre.name}</a></li>
    {/each}
  </ul>

  <h2>Sinopsis</h2>
  <p>{animeData.sinopsis}</p>

  <h2>Episode List</h2>
  <ul>
    {#each animeData.eplister as episode}
      <li>
        <a href={episode.link}>{episode.title} - {episode.epnum}</a>
        <p>{episode.date}</p>
      </li>
    {/each}
  </ul>

  <h2>Recommendations</h2>
  <ul>
    {#each animeData.recommendations as rec}
      <li>
        <a href={rec.link}>
          <img src={rec.img} alt={rec.title} width="100" />
          {rec.title} ({rec.type}) - {rec.epx}
        </a>
      </li>
    {/each}
  </ul>

  <h2>Download Links</h2>
  <ul>
    {#each animeData.downloads as download}
      <li>
        <h3>{download.server}</h3>
        <ul>
          {#each download.links as link}
            <li><a href={link.link}>{link.title}</a></li>
          {/each}
        </ul>
      </li>
    {/each}
  </ul>
{/if}
