<template>
  <div id="index">
    <MenuTop />
    <Header />
    <HomeCategories />

    <div class="container mx-auto mt-5">
      <div class="row">
        <div class="col-md-2 pl-0">
          <div class="category__filters">
            <h5>Categories</h5>
            <ul>
              <li v-for="category in categories" :key="category.category_id">
                <nuxt-link
                  :to="'/' + category.category_slug"
                  class="col-md-3 category__product-wrap"
                >
                  {{ category.category_name }}
                </nuxt-link>
              </li>
            </ul>
            <h5>Filter</h5>
            <v-switch
              v-model="switch1"
              label="In Stock"
              color="success"
            ></v-switch>

            <v-switch
              v-model="switch2"
              label="Filtered"
              color="success"
            ></v-switch>

            <v-switch
              v-model="switch3"
              label="Online Distribution"
              color="success"
            ></v-switch>

            <h5>Price range</h5>
            <div class="price__slider">
              <v-range-slider
                v-model="range"
                :max="max"
                :min="min"
                hide-details
                class="align-center position-relative"
              >
                <template v-slot:prepend>
                  <v-text-field
                    :value="range[0]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                    @change="$set(range, 0, $event)"
                  ></v-text-field>
                </template>
                <template v-slot:append>
                  <v-text-field
                    :value="range[1]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 33px"
                    @change="$set(range, 1, $event)"
                  ></v-text-field>
                </template>
              </v-range-slider>
            </div>
          </div>
        </div>
        <div class="col-md-10">
          <h6>products</h6>
          <h2 class="mb-5">Most Popular products</h2>

          <div class="row">
            <nuxt-link
              :to="categories[0].category_slug + '/' + product.slug"
              v-for="product in products"
              :key="product.product_id"
              class="col-md-3 category__product-wrap"
            >
              <CategoryProduct :product="product" />
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <v-btn @click="breadcrumbsNext(2)">next</v-btn>
    <Pagination :items="pagination" />
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import MenuTop from "~/components/MenuTop.vue";
import Header from "~/components/Header.vue";
import HomeCategories from "~/components/HomeCategories.vue";
import CategoryProduct from "~/components/CategoryProduct.vue";
import Pagination from "~/components/Pagination.vue";
import Footer from "~/components/Footer.vue";

export default {
  components: {
    MenuTop,
    Header,
    HomeCategories,
    CategoryProduct,
    Pagination,
    Footer
  },

  async asyncData({ params, error }) {
    // return await axios
    //   .get(`http://localhost:5050/api/public/getallproductsincategory/top-products`)
    //   .then((res) => {
    //     // console.log(res.data);
    //     return { products: res.data };
    //   })
    //   .catch((err) => {
    //     error({ statusCode: 404, message: err.message });
    //   });

    // We can use async/await ES6 feature
    const products = await axios
      .get(
        `http://localhost:5050/api/public/getallproductsincategory/1?type=rating&sort=desc`
      )
      .catch((err) => {
        error({ statusCode: 404, message: err.message });
      });

    const categories = await axios
      .get(`http://localhost:5050/api/public/getallcategories`)
      .catch((err) => {
        error({ statusCode: 404, message: err.message });
      });

    return { products: products.data.data, categories: categories.data.data };
  },

  data() {
    var rand = Math.floor(Math.random() * 5 + 3);

    return {
      products: null,
      pagination: [
        { link: "/brands", text: "1" },
        { link: "", text: "2" },
      ],
      rating: rand,
      value1: [0, 60],
      ex1: { label: "color", val: 25, color: "gray" },
      switch1: false,
      switch2: false,
      switch3: false,
      min: 0,
      max: 500,
      slider: 40,
      range: [0, 500],
    };
  },

  methods: {
    getColor(v) {
      if (v == "Red") {
        return "red";
      } else if (v == "Green") {
        return "green";
      } else if (v == "Blue") {
        return "blue";
      } else {
        return "black";
      }
    },

    async breadcrumbsNext(site) {
      await axios
        .get(`https://api.rawg.io/api/products?page=${site}`)
        .then((res) => {
          this.products = res.data.results;
          console.log(res.data.results);
        })
        .catch((err) => {
          error({ statusCode: 404, message: err.message });
        });
    },
  },

  watch: {
    model(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop());
      }
    },
  },

  head() {
    return {
      title: "Nuxt Ecommerce || vue-ecommerce.com",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Product page meta description",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "product, page, meta, keywords",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
</style>
