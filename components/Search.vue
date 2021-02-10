<template>
  <div id="comp__search" class="container mx-auto my-5 py-16">
    <div class="search__wrapper">
      <input
        @keydown="searchFetch()"
        type="text"
        v-model="search"
        placeholder="Search title.."
      />

      <div class="search__results" v-if="search.length > 2">
        <nuxt-link
          v-for="searchResult in searchResults"
          :key="searchResult.product_name"
          :to="'/' + searchResult.category_slug + '/' + searchResult.slug"
        >
          <span>{{ searchResult.product_name }}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      search: "",
      searchResults: [{ product_name: "", slug: "" }],
    };
  },

  methods: {
    async searchFetch() {
      console.log(this.search.length);
      if (this.search.length > 1) {
        await axios
          .get(`http://localhost:5050/api/public/search?search=${this.search}`)
          .catch((err) => {
            error({ statusCode: 404, message: err.message });
          })
          .then((res) => {
            this.searchResults = res.data;
            console.log(this.searchResults);
          });
      }
    },
  },

  //   computed: {
  //     searchResultsF: function () {
  //       return this.searchResults.filter((search) => {
  //         return search.product_name.toLowerCase().match(this.search.toLowerCase());
  //       });
  //     },
  //   },
};
</script>

<style lang="scss">
#comp__search {
  display: flex;
  justify-content: center;

  input {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    position: relative;
    width: 100%;
  }

  .search__wrapper {
    width: 100%;
    max-width: 400px;
    position: relative;
  }

  .search__results {
    position: absolute;
    background: #eee;
    width: 100%;
    border: 1px solid #ccc;
    box-shadow: 0px 5px 15px #00000026;
    padding: 7px;

    span {
      font-size: 17px;
      font-weight: 500;
      text-shadow: none;
      color: #333;
      padding: 5px;
      transition: 0.3s;
    }

    a {
      &:hover {
        background: #0000001a;
        transition: 0.3s;
      }
    }
  }
}
</style>