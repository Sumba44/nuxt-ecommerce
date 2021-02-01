<template>
  <div id="category">
    <MenuTop />
    <Header />
    <Breadcrumbs :items="breadcrumbs" />

    <div class="container mx-auto mt-5">
      <div class="row">
        <div class="col-md-12">
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
  // `http://localhost:5050/api/public/getallproductsincategory/${params.category}`
  async asyncData({ params, error }) {
    return axios
      .get(
        `http://localhost:5050/api/public/filterproducts?category=${params.category}&sortby=price&sortmethod=ASC`
      )
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
      activeBtn1: true,
      activeBtn2: false,
      activeBtn3: false,
      activeBtn4: false,
      price: 'price',
      rating: 'rating',
      asc: 'ASC',
      desc: 'DESC'
    };
  },

  computed: {
    breadcrumbs() {
      const links = [
        {
          link: "/" + this.products[0].category_slug,
          text: this.products[0].category,
        },
      ];
      // links.push({ link: "", text: this.products[0].product_name });
      return links;
    },
  },

  methods: {
    async sortProducts(sortBy, sortMethod) {
      console.log(sortMethod);
      this.$nuxt.$loading.start();
      await axios
        .get(
          `http://localhost:5050/api/public/filterproducts?category=` +
            this.products[0].category_slug +
            `&sortby=` + sortBy + `&sortmethod=` +
            sortMethod
        )
        .catch((error) => {
          console.log(error);
        })
        .then((res) => {
          this.products = res.data;
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
