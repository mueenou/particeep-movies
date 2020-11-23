<template>
  <div class="container">
    <header>
      <h1>Particeep Movies</h1>
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
  margin: 0 auto;
  min-height: 100vh;
}

.container header {
  background-color: #d0d0d0;
  height: 50px;
  width: 100%;
  text-align: center;
}

</style>
