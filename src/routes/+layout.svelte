<script>
  import Navbar from '../components/Navbar.svelte'; // jalur relatif dari src/routes ke src/components
  import Footer from '../components/Footer.svelte'; // jalur relatif dari src/routes ke src/components
  import '../app.css'; // jalur relatif dari src/routes ke src/app.css
  import '../assets/cihuy.css';
  import '../assets/cihuy2.css';
  import '../assets/cihuy3.css';
  import '../assets/cihuy4.css';
</script>

<Navbar />
<main>
  <slot />
</main>
<Footer />
