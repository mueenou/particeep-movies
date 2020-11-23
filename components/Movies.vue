<template>
    <div class="movies">
        <h2>Movies</h2>
        <!-- <a-tree-select
          v-model="value"
          style="width: 100%"
          :tree-data="treeData"
          tree-checkable
          :show-checked-strategy="SHOW_PARENT"
          search-placeholder="Please select"
        /> -->
        <div class="category-container" v-show="selectedCategories.length > 0">
          <span class="category" v-for="(category, index) in selectedCategories" :key="index+category">
            <span @click="deleteCategory(category)"><a-icon class="icon" type="close" /></span>{{category}}
          </span>
        </div>
        <div>
          <a-dropdown :trigger="['click']" >
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="1" value="Animation"><a-icon type="default" />Animation</a-menu-item>
              <a-menu-item key="2" value="Thriller"><a-icon type="default" />Thriller</a-menu-item>
              <a-menu-item key="3" value="Drame"><a-icon type="default" />Drame</a-menu-item>
              <a-menu-item key="4" value="Comedy"><a-icon type="default" />Comedy</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px"> Select categories <a-icon type="down" /> </a-button>
          </a-dropdown>
        </div>
        <div v-if="selectedCategories.length === 0" class="movies-container">
          <div class="movie-card" v-for="(movie, index) in $store.state.allMovies" :key="movie.id">
              <img :src="movie.img" alt="movie">
              <h2>{{movie.title}}</h2>
              <p>{{movie.category}}</p>
              <div><span>{{movie.likes}}</span><span>{{movie.dislikes}}</span></div>
              <div><span @click="$store.dispatch('handleSetLike', index)"><a-icon type="like" theme="filled" /></span>  <span @click="$store.dispatch('handleSetDislike', index)"><a-icon type="dislike" theme="filled" /></span></div>
              <button @click="$store.dispatch('handleDeleteMovie', movie.id)">x</button>
          </div>
        </div>
          <div v-else class="movies-container">
            <div class="movie-card" v-for="(movie, index) in filteredMovies" :key="movie.id">
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
import { TreeSelect } from 'ant-design-vue';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
export default {
  name: "Movies",
  data() {
    return {
      selectedCategories: [],
      staticMovies: this.allStaticMovies,
      filteredMovies: [],
      categories: [],
    }
  },
  mounted() {
    this.getStaticMovies();
  },
  methods: {
    async getStaticMovies() {
      const response = await import("../data/movies.js");
      const data = await response.movies$;
      console.log(data);
      this.staticMovies = data;
      this.exportCategories()
    },
    exportCategories() {
      this.categories = this.staticMovies.map((movie) => {
        return { 
          title: movie.category,
          value: movie.category
        }
      });
      this.categories = [...new Set(this.categories)];
      console.log('exported categories: ', this.categories);
    },
    handleMenuClick(e) {
      this.selectedCategories.push(e.item.value)
      this.selectedCategories = [...new Set(this.selectedCategories)];
      console.log(this.selectedCategories);
      this.filterMovies();
    },
    deleteCategory(category) {
      this.selectedCategories = this.selectedCategories.filter(thisCat => thisCat !== category);
      console.log('categories', this.selectedCategories)
      this.filterMovies();

      if(this.selectedCategories.length === 0) {
        this.filteredMovies = [];
      }
    },
    filterMovies() {
      this.filteredMovies = [];
      this.selectedCategories.forEach((category) => {
        this.filteredMovies.push(this.staticMovies.filter(movie => movie.category === category))
      })
      this.filteredMovies = this.filteredMovies.flat();
      this.filteredMovies = [...new Set(this.filteredMovies)];
    }
  }
}
</script>

<style scoped>
.movies {
  width: 100%;
}

.movies-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.category-container {
  height: 40px;
}

.category-container .category {
  border: 1px solid grey;
  margin: 0 10px;
}

.category-container .category span {
  border-right: 1px solid grey;
  margin-right: 3px;
}
</style>
