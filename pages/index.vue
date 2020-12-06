<template>
  <div class="container">
    <header>
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="Particeep Movies"
        sub-title="The best movie library"
      />
    </header>
    <Movies/>
  </div>
</template>

<script>
import Movies from '../components/Movies.vue'
export default {
  components: { Movies },
  mounted() {
    this.$store.dispatch('handleFetchMovies');
  }

}
</script>

<style scoped>

.container {
  min-height: 100vh;
}

.container header {
  margin-bottom: 30px;
}

</style>
