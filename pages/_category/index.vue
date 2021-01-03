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

          <div class="row">
            <!-- doc.slug.substr(1) -->
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

  async asyncData({ params, error }) {
    return axios
      .get(
        `http://localhost:5050/api/public/getallproductsincategory/${params.category}`
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
      games: null,
      id: null,
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

  methods: {},

  watch: {},

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
