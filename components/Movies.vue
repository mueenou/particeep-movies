<template>
    <div class="movies">
        <h2>Movies</h2>
        <div>
            <div>
              <template>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                    Select a catgeory <a-icon type="down" />
                  </a>
                  <a-menu slot="overlay">
                    <a-menu-item key="0">
                      <a href="#">1st menu item</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </template>
            </div>
            <div class="movie-card" v-for="(movie, index) in $store.state.allMovies" :key="movie.id">
                <img :src="movie.img" alt="movie">
                <h2>{{movie.title}}</h2>
                <p>{{movie.category}}</p>
                <div><span>{{movie.likes}}</span><span>{{movie.dislikes}}</span></div>
                <div><span @click="$store.dispatch('handleSetLike', index)"><a-icon type="like" theme="filled" /></span>  <span @click="$store.dispatch('handleSetDislike', index)"><a-icon type="dislike" theme="filled" /></span></div>
                <button @click="$store.dispatch('handleDeleteMovie', movie.id)">x</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Movies"
}
</script>

<style>
.movies {
    width: 100%;
    text-align: center
}
</style>
