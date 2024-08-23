<script>
  import Navbar from '$lib/components/Navbar.svelte'; // atau ../components/Navbar.svelte jika tidak menggunakan alias
  import Footer from '$lib/components/Footer.svelte'; // atau ../components/Footer.svelte
  import '../app.css'; // pastikan jalur ini benar
</script>


<Navbar />
<main>
  <slot />
</main>
<Footer />
