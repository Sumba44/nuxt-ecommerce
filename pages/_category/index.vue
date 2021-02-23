<template>
  <div id="category">
    <MenuTop />
    <Header />
    <Breadcrumbs :items="breadcrumbs" />

    {{ category }}

    <div class="container mx-auto mt-5">
      <div class="row" v-if="results">
        <div class="col-md-12" v-if="products[0].category.length > 0">
          <h6>Games</h6>
          <h2 class="mb-5">{{ products[0].category }}</h2>
          <div id="category-filter" class="my-8">
            <v-btn
              @click="
                removeActive();
                activeBtn1 = !activeBtn1;
                sortProducts(rating, desc);
              "
              color="primary"
              :outlined="!activeBtn1"
              >Most popular</v-btn
            >
            <v-btn
              @click="
                removeActive();
                activeBtn2 = !activeBtn2;
                sortProducts(price, asc);
              "
              color="primary"
              :outlined="!activeBtn2"
              >Price Low to High</v-btn
            >
            <v-btn
              @click="
                removeActive();
                activeBtn3 = !activeBtn3;
                sortProducts(price, desc);
              "
              color="primary"
              :outlined="!activeBtn3"
              >Price High to Low</v-btn
            >
            <v-btn
              @click="
                removeActive();
                activeBtn4 = !activeBtn4;
                sortProducts(rating, desc);
              "
              color="primary"
              :outlined="!activeBtn4"
              >Top Rated</v-btn
            >
          </div>
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
      <div v-else>This category has no products :(</div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="text-center"><br /><br /><br /></div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import MenuTop from "~/components/MenuTop.vue";
import Header from "~/components/Header.vue";
import Breadcrumbs from "~/components/Breadcrumbs.vue";
import CategoryProduct from "~/components/CategoryProduct.vue";
import Footer from "~/components/Footer.vue";

export default {
  components: {
    MenuTop,
    Header,
    Breadcrumbs,
    CategoryProduct,
    Footer,
  },

  async asyncData({ params, error }) {
    let productsFetchStatus = true;
    const productsFetch = await axios
      .get(
        `http://localhost:5050/api/public/filterproducts2?category=${params.category}&sortby=price&sortmethod=DESC&page=1&limit=10`
      )
      .catch((err) => {
        productsFetchStatus = false;
      });

    let categoryFetchStatus = true;
    const categoryFetch = await axios
      .get(`http://localhost:5050/api/public/getcategoryinfo`)
      .catch((err) => {
        categoryFetchStatus = false;
        // error({ statusCode: 404, message: err.message });
      });

      return {
        products: (productsFetchStatus) ? productsFetch.data.data : 'This category has no products :(',
        results: (productsFetchStatus) ? true : false,
        category: (categoryFetchStatus) ? categoryFetch.data : {category_slug: params.category, category: "Category does not exist"}
    }
  },

  methods: {
    async sortProducts(sortBy, sortMethod) {
      // console.log(sortMethod);
      this.$nuxt.$loading.start();
      await axios
        .get(
          `http://localhost:5050/api/public/filterproducts?category=${this.products[0].category_slug}&sortby=${sortBy}&sortmethod=${sortMethod}&page=1&limit=10`
        )
        .catch((error) => {
          console.log(error);
        })
        .then((res) => {
          this.products = res.data.data;
          this.$nuxt.$loading.finish();
        });
    },

    removeActive() {
      this.activeBtn1 = false;
      this.activeBtn2 = false;
      this.activeBtn3 = false;
      this.activeBtn4 = false;
    },
  },

  data() {
    var rand = Math.floor(Math.random() * 5 + 3);

    return {
      // products: [
      //   {
      //     category_slug: "213",
      //     category: "123",
      //   },
      // ],
      results: false,
      activeBtn1: true,
      activeBtn2: false,
      activeBtn3: false,
      activeBtn4: false,
      price: "price",
      rating: "rating",
      asc: "ASC",
      desc: "DESC",
    };
  },

  computed: {
    breadcrumbs() {
      const links = [
        {
          link: "/" + this.category.category_slug,
          text: this.category.category,
        },
      ];
      // this.$route.params
      return links;
    },
  },

  head() {
    return {
      title: this.products[0].category + " || vue-ecommerce.com",
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
