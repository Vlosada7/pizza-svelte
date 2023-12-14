<script>
  import Footer from "$lib/Footer.svelte";
import Header from "$lib/Header.svelte";
import "../app.css"
</script>

<body class="bg-f4efe1">
  <header>
    <Header />
  </header>
  <main>
    <slot/>
  </main>
  <footer>
    <Footer />
  </footer>
</body>