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
        
        <div class="category-dropdown">
          <a-dropdown :trigger="['click']" id="category-dropdown">
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item :key="index" :value="category" v-for="(category, index) in categories"><a-icon type="default" />{{category}}</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px"> Select categories <a-icon type="down" /> </a-button>
          </a-dropdown>
        </div>
        <div v-if="selectedCategories.length === 0" class="movies-container">
          <a-card size="small" style="width: 200px; margin: 15px;" hoverable v-for="(movie, index) in $store.state.allMovies" :key="movie.id">
            <img
              slot="cover"
              alt="example"
              :src="movie.img"
              style="height: 200px"
            />
            <template slot="actions" class="ant-card-actions">
              <div @click="$store.dispatch('handleSetLike', index)">
                <a-icon type="like" theme="filled" />
                <div>{{movie.likes}}</div>
              </div>
              <div @click="$store.dispatch('handleDeleteMovie', movie.id)">
                <a-icon key="delete" type="delete" />
                <div>Delete</div>
              </div>
              <div @click="$store.dispatch('handleSetDislike', index)">
                <a-icon type="dislike" theme="filled" />
                <div>{{movie.dislikes}}</div>
              </div>
            </template>
            <a-card-meta :title="movie.title" :description="movie.category">
            </a-card-meta>
          </a-card>
        </div>
          <div v-else class="movies-container">
            <a-card size="small" style="width: 200px; margin: 15px;" hoverable v-for="(movie, index) in filteredMovies" :key="movie.id">
            <img
              slot="cover"
              alt="example"
              :src="movie.img"
              style="height: 200px"
            />
            <template slot="actions" class="ant-card-actions">
              <div @click="$store.dispatch('handleSetLike', index)">
                <a-icon type="like" theme="filled" />
                <div>{{movie.likes}}</div>
              </div>
              <div @click="$store.dispatch('handleDeleteMovie', movie.id)">
                <a-icon key="delete" type="delete" />
                <div>Delete</div>
              </div>
              <div @click="$store.dispatch('handleSetDislike', index)">
                <a-icon type="dislike" theme="filled" />
                <div>{{movie.dislikes}}</div>
              </div>
            </template>
            <a-card-meta :title="movie.title" :description="movie.category">
            </a-card-meta>
          </a-card>
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
      categories: []
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
        return movie.category
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
  justify-content: space-evenly;
  width: 60%;
  margin: 30px auto;
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

.category-dropdown {
  text-align: center;
  width: 100%;
}
</style>
