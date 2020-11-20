<template>
    <div class="movies">
        <h2>Movies</h2>
        <div>
            <div class="movie-card" v-for="(movie) in $store.state.allMovies" :key="movie.id">
                <img :src="movie.img" alt="movie">
                <h2>{{movie.title}}</h2>
                <p>{{movie.category}}</p>
                <div><span>{{movie.likes}}</span><span>{{movie.dislikes}}</span></div>
                <div><span><a-icon type="like" theme="filled" /></span>  <span><a-icon type="dislike" theme="filled" /></span></div>
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