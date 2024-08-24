<script>
  import { onMount, afterUpdate } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  const apiUrl = import.meta.env.VITE_API_URL;

  let animeData = null;
  let error = null;
  let animeId;

  // Ambil parameter dari URL setiap kali halaman dimuat
  $: animeId = $page.params.endpo;

  // Fungsi untuk memuat data anime
  async function loadAnimeData() {
    animeData = null; // Reset data
    error = null; // Reset error
    try {
      const response = await fetch(`${apiUrl}/api/anime/anime/${animeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      if (data.status) {
        animeData = data.data;
      } else {
        error = "Anime data not found or error in fetching.";
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
      error = 'An error occurred while fetching the anime data.';
    }
  }

  // Load data on mount and whenever animeId changes
  onMount(() => {
    loadAnimeData();
  });

  // Update meta tags after the data is loaded
  afterUpdate(() => {
    if (animeData) {
      document.title = animeData.title;
      document.querySelector('meta[name="description"]').content = animeData.sinopsis;
      document.querySelector('meta[property="og:title"]').content = animeData.title;
      document.querySelector('meta[property="og:description"]').content = animeData.sinopsis;
      document.querySelector('meta[property="og:url"]').content = `https://your-site-url.com/anime/${animeId}`;
      document.querySelector('meta[property="og:image"]').content = animeData.thumbnail;
    }
  });

  function goHome() {
    goto('/'); // Navigasi ke halaman utama
  }

  function handleLinkClick(event, link) {
    event.preventDefault(); // Mencegah pemuatan ulang halaman
    goto(link); // Navigasi internal dengan SvelteKit
  }
</script>

<svelte:head>
  <title>{animeData ? animeData.title : 'Loading...'}</title>
  <meta name="description" content={animeData ? animeData.sinopsis : 'Loading...'} />
  <meta property="og:title" content={animeData ? animeData.title : 'Loading...'} />
  <meta property="og:description" content={animeData ? animeData.sinopsis : 'Loading...'} />
  <meta property="og:url" content={animeData ? `https://your-site-url.com/anime/${animeId}` : 'https://your-site-url.com/anime'} />
  <meta property="og:image" content={animeData ? animeData.thumbnail : 'https://your-site-url.com/default-thumbnail.jpg'} />
</svelte:head>

<main>
  {#if error}
    <div>
      <p>{error}</p>
      <button on:click={goHome}>Kembali ke Halaman Utama</button>
    </div>
  {:else if !animeData}
    <p>Loading...</p>
  {:else}
    <h1>{animeData.title}</h1>
    <img src={animeData.thumbnail} alt={animeData.title} />

    <h2>Info</h2>
    <p><strong>Rating:</strong> {animeData.rating}</p>
    <p><strong>Status:</strong> {animeData.info.Status}</p>
    <p><strong>Studio:</strong> <a href={animeData.info.Studio_link}>{animeData.info.Studio}</a></p>
    <p><strong>Duration:</strong> {animeData.info.Durasi}</p>
    <p><strong>Season:</strong> <a href={animeData.info.Musim_link}>{animeData.info.Musim}</a></p>

    <h2>Genres</h2>
    <ul>
      {#each animeData.genre as genre}
        <li><a href={genre.link}>{genre.name}</a></li>
      {/each}
    </ul>

    <h2>Synopsis</h2>
    <p>{animeData.sinopsis}</p>

    <h2>Episode List</h2>
    <ul>
      {#each animeData.eplister as episode}
        <li>
          <a href=/episode{episode.link}>{episode.title} - {episode.epnum}</a>
          <p>{episode.date}</p>
        </li>
      {/each}
    </ul>

    <h2>Recommendations</h2>
    <ul>
      {#each animeData.recommendations as rec}
        <li>
          <a href={rec.link} on:click={(event) => handleLinkClick(event, rec.link)}>
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
</main>
