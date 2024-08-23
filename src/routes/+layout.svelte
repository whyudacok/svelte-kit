<script>
  import Navbar from '../components/Navbar.svelte'; // jalur relatif dari src/routes ke src/components
  import Footer from '../components/Footer.svelte'; // jalur relatif dari src/routes ke src/components
  import '../app.css'; // jalur relatif dari src/routes ke src/app.css
</script>

<Navbar />
<main>
  <slot />
</main>
<Footer />
