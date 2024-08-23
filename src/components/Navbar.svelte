<script>
 const logoUrl = import.meta.env.VITE_WEBSITE_LOGO_URL
 import { onMount } from 'svelte';

  onMount(() => {
    let lastScrollTop = 0;
    const navbar = document.getElementById("navbar");

    const handleScroll = () => {
      let scrollTop = window.scrollY;

      if (scrollTop > lastScrollTop && scrollTop > 50) {
        // Saat di-scroll ke bawah
        navbar.classList.add("bg-black", "bg-opacity-80", "backdrop-blur-md", "h-[62px]");
      } else if (scrollTop < lastScrollTop && scrollTop <= 50) {
        // Saat di-scroll ke atas
        navbar.classList.remove("bg-black", "bg-opacity-80", "backdrop-blur-md", "h-[62px]");
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component destroy
    return () => window.removeEventListener("scroll", handleScroll);
  });

</script>

<nav id="navbar" class="flex justify-between items-center text-white m-auto fixed top-0 left-0 right-0 z-30 transition-all duration-300 h-[75px] px-[3%] lg:pl-[7%] xl:pl-[6.5%] bg-transparent translate-y-0">
  <div class="flex items-center gap-8">
    <a href="/">
      <img alt="logo" fetchpriority="high" width="50" height="50" decoding="async" data-nimg="1" class="w-32 !h-[36px] mt-1" style="color: transparent;" src="{logoUrl}" />
    </a>
  </div>
  <div class="flex items-center gap-2">
    <button type="button" title="Search" class="w-[26px] h-[26px] outline-none lg:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l6 6m-11-4a7 7 0 110-14 7 7 0 010 14z"></path>
      </svg>
    </button>
    <div></div>
    <button
      class="flex relative justify-center items-center box-border overflow-hidden align-middle outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny bg-secondary text-secondary-foreground rounded-full ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark ring-secondary z-10 aria-expanded:scale-[0.97] aria-expanded:opacity-70 subpixel-antialiased transition-transform w-[32px] h-[32px] backdrop-blur-sm"
      data-slot="trigger"
      aria-haspopup="true"
      aria-expanded="false"
      id="react-aria-:Rt5u5ra:"
      type="button"
    >
      <img src="https://ik.imagekit.io/aniplay123/profile/m1" class="flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100" alt="kizoy" data-loaded="true" />
    </button>
  </div>
</nav>
