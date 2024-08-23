<script>
  import Navbar from './components/Navbar.svelte';
  import Footer from './components/Footer.svelte';
  import "../app.css";
</script>

<Navbar />
<main>
  <slot />
</main>
<Footer />
