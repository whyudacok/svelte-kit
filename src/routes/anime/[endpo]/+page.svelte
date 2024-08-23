<script context="module">
  export async function load({ params }) {
    const { endpo } = params;
    const response = await fetch(`https://cihuyy-api.vercel.app/api/anime/anime/${endpo}`);
    const data = await response.json();
    return { props: { anime: data.data } };
  }
</script>

<script>
  export let anime;
</script>

<h1>{anime.title}</h1>
<p><strong>Rating:</strong> {anime.rating}</p>
<p><strong>Status:</strong> {anime.info.Status}</p>
<p><strong>Studio:</strong> {anime.info.Studio}</p>
<p><strong>Durasi:</strong> {anime.info.Durasi}</p>
<p><strong>Musim:</strong> {anime.info.Musim}</p>

<h2>Sinopsis</h2>
<p>{anime.sinopsis}</p>

<h2>Episode List</h2>
<ul>
  {#each anime.eplister as episode}
    <li>
      <a href={episode.link}>{episode.title} - {episode.epnum}</a>
      <p>{episode.date}</p>
    </li>
  {/each}
</ul>

<h2>Recommendations</h2>
<ul>
  {#each anime.recommendations as rec}
    <li>
      <a href={rec.link}>
        <img src={rec.img} alt={rec.title} />
        {rec.title} ({rec.type}) - {rec.epx}
      </a>
    </li>
  {/each}
</ul>

<h2>Download Links</h2>
<ul>
  {#each anime.downloads as download}
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
