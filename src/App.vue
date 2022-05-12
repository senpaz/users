  <template>
    <div :class="$style.wrapper">
      <header>
        <Header/>
      </header>
      <main>
        <router-view/>
      </main>
      <footer>
        <Footer/>
      </footer>
      <notifications position="top right" class="notifications" style="top: 100px; right: 100px" />
    </div>
  </template>

  <script>

  import Header from "@/components/header";
  import Footer from "@/components/footer";
  export default {
    name: 'App',
    components: {Footer, Header},
  }
  </script>

  <style module>
  .wrapper{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  main{
    flex: 1 1 auto;
  }
  </style>
