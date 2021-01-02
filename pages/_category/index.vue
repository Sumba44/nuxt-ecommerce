<template>
  <div id="index">
    <MenuTop />
    <Header />

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
              <div class="category__product">
                <div
                  class="product__miniature"
                  :style="{ backgroundImage: `url(${product.product_image})` }"
                ></div>
                <div class="product__miniature-body">
                  <h4>{{ product.product_name.substring(0, 35) + ".." }}</h4>
                  <!-- <h4>{{ product.product_name }}</h4> -->
                  <client-only>
                    <StarRating
                      :rating="parseInt(product.rating.toFixed(0))"
                      :star-size="18"
                      text-class="product__star-rating d-none"
                      read-only
                    ></StarRating>
                  </client-only>
                  <span>{{ product.category }}</span>
                </div>
              </div>
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
import StarRating from "vue-star-rating";
import Footer from "~/components/Footer.vue";

export default {
  components: {
    MenuTop,
    Header,
    StarRating,
    Footer,
  },

  async asyncData({ params, error }) {
    return axios
      .get(`http://localhost:5050/api/public/getallproductsincategory/${params.category}`)
      .then((res) => {
        console.log(res.data);
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
      id: null
    };
  },

//   created() {
//     this.id = this.$route.query.id;
//   },

  methods: {},

  watch: {},

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
.category__product-wrap {
  text-decoration: none;

  &:hover {
    color: $blue;
    text-shadow: none;
  }
}
.category__product {
  box-shadow: 0 0 8px rgb(0 0 0 / 6%);

  h4 {
    font-size: 18px;
    font-weight: 500;
    text-shadow: none;
    display: block;
    margin-top: 7px;
    height: 38px;
  }

  span {
    color: #000;
    font-weight: 300;
    font-size: 15px;
  }
}
.product__miniature {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border: 1px solid #f3f3f3;
  height: 265px;
}

.product__miniature-body {
  margin: 0;
  padding: 15px;
}

.category__filters {
  box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.05882);
  padding: 30px 25px 10px 5px;
  min-height: 540px;

  h5 {
    margin: 30px 0 30px 0;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 15px;
  }
}

.price__slider {
  margin-bottom: 60px;
}
</style>
