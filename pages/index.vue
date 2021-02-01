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
            <v-list>
              <v-list-group v-for="item in items" :key="item.title">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item v-for="subItem in item.items" :key="subItem.title">
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="subItem.title"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
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
            <h5>Select</h5>
            <v-combobox
              v-model="model"
              :items="genres"
              hide-selected
              label="Platform"
              multiple
              persistent-hint
              deletable-chips
              outlined
              dense
            ></v-combobox>

            <v-combobox
              :items="colors"
              label="Colors"
              multiple
              persistent-hint
              small-chips
              deletable-chips
            >
              <template v-slot:selection="data">
                <v-chip
                  :key="JSON.stringify(data.item)"
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  :color="getColor(data.item)"
                  @click:close="data.parent.selectItem(data.item)"
                  deletable-chips
                  >{{ data.item }}</v-chip
                >
              </template>
            </v-combobox>
          </div>
        </div>
        <div class="col-md-10">
          <h6>products</h6>
          <h2 class="mb-5">Most Popular products</h2>
          
          <div class="row">
            <nuxt-link
              :to="product.category_slug + '/' + product.slug"
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
    return axios
      .get(`http://localhost:5050/api/public/getallproductsincategory/top-products`)
      .then((res) => {
        // console.log(res.data);
        return { products: res.data };
      })
      .catch((err) => {
        error({ statusCode: 404, message: err.message });
      });
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
      genres: ["Gaming", "Programming", "Vue", "Vuetify"],
      colors: ["Red", "Blue", "Green", "Black"],
      model: ["Vuetify"],
      model2: ["Green"],
      search: null,
      sort: [
        { title: "Recommended" },
        { title: "Price (low to high)" },
        { title: "Price (high to low)" },
        { title: "Newest" },
        { title: "Alphabetically" },
      ],
      min: 0,
      max: 500,
      slider: 40,
      range: [0, 500],
      items: [
        {
          action: "local_activity",
          title: "Attractions",
          items: [{ title: "List Item" }],
        },
        {
          action: "restaurant",
          title: "Dining",
          active: true,
          items: [
            { title: "Breakfast & brunch" },
            { title: "New American" },
            { title: "Sushi" },
          ],
        },
        {
          action: "school",
          title: "Education",
          items: [{ title: "List Item" }],
        },
        {
          action: "directions_run",
          title: "Family",
          items: [{ title: "List Item" }],
        },
        {
          action: "healing",
          title: "Health",
          items: [{ title: "List Item" }],
        },
        {
          action: "content_cut",
          title: "Office",
          items: [{ title: "List Item" }],
        },
        {
          action: "local_offer",
          title: "Promotions",
          items: [{ title: "List Item" }],
        },
      ],
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
