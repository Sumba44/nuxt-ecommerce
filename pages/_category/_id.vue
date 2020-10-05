<template>
  <div id="product">
    <MenuTop />
    <Header />
    <Breadcrumbs :items="breadcrumbs" />
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
          class="product__image"
          :style="{ backgroundImage: `url(${games.background_image})` }"
        ></v-col>
        <v-col cols="12" md="6" class="product__box">
          <h1 class="product__heading">{{ games.name }}</h1>
          <div class="product__code mb-2">
            Platform: {{ games.genres[0].name }} | Code: {{ games.id }}
          </div>
          <client-only>
            <StarRating
              :rating="parseInt(games.rating.toFixed(0))"
              :star-size="22"
              text-class="product__star-rating"
            ></StarRating>
          </client-only>
          <div class="product__prices">
            <div class="product__price text-success">
              <span class="current-price-display">{{ price }}.00€</span>
            </div>
            <div class="product__tax">Tax included</div>
          </div>

          <div class="product__short-description"></div>
          <div class="product-features">
            <dl class="data-sheet">
              <dt class="name">Release date</dt>
              <dd class="value">{{ games.released }}</dd>
              <dt class="name">Developer</dt>
              <dd class="value">{{ games.developers[0].name }}</dd>
            </dl>
          </div>

          <div class="product__availability">
            <h5 class="text-success">
              In Stock
              <span>({{ Math.floor(Math.random() * 50 + 9) }}pcs)</span>
            </h5>
            <p>
              Next day delivery
              <font-awesome-icon
                :icon="['fas', 'info-circle']"
                class="info__icon"
              />
            </p>
            <p class="product__digital-sub"></p>
          </div>

          <div class="product-add-to-cart">
            <div
              class="product-quantity flex-column flex-md-row row align-center no-gutters"
            >
              <div class="qty col-auto vnis__wrapper">
                <client-only>
                  <NumberInputSpinner
                    :min="0"
                    :max="10"
                    :step="1"
                    v-model="quantity"
                    :integerOnly="true"
                  />
                </client-only>
              </div>

              <div class="col">
                <nuxt-link to="/cart">
                  <v-btn
                    color="success"
                    @click="addToCart()"
                    x-large
                    block
                  >
                    <font-awesome-icon
                      :icon="['fas', 'shopping-cart']"
                      class="menu__icon"
                    />
                    <span
                      class="btn-add-to-cart__spinner"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Add to cart
                  </v-btn>
                </nuxt-link>
              </div>
            </div>
            <p class="product-minimal-quantity"></p>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Media box -->
    <div class="container">
      <div class="row media-row product__media">
        <div class="col-12 col-md-4 media-benefit">
          <div class="media-left">
            <font-awesome-icon :icon="['fas', 'smile']" class="media__icon" />
          </div>
          <div class="media-body">
            <h5 class="h5 font-blue">Diseños previos</h5>
            <p>Gratis y no personalizaremos nada hasta tener tu aprobado</p>
          </div>
        </div>
        <div class="col-12 col-md-4 media-benefit">
          <div class="media-left">
            <font-awesome-icon
              :icon="['fas', 'business-time']"
              class="media__icon"
            />
          </div>
          <div class="media-body">
            <h5 class="h5 font-blue">Entrega en fecha siempre</h5>
            <p>
              Compromiso firme pues
              <strong>te pondremos la fecha por escrito</strong>
            </p>
          </div>
        </div>
        <div class="col-12 col-md-4 media-benefit">
          <div class="media-left">
            <font-awesome-icon :icon="['fas', 'truck']" class="media__icon" />
          </div>
          <div class="media-body">
            <h5 class="h5 font-blue">Portes Gratis</h5>
            <p>
              El envío de tus regalos
              <strong>será gratis</strong> si supera los 99€ de compra
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Product details -->
    <div class="container">
      <v-row>
        <v-col>
          <iframe
            width="560"
            height="315"
            :src="'https://www.youtube.com/embed/' + games.clip.video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </v-col>
      </v-row>
      <div class="row">
        <div v-for="platform in games.platforms" :key="platform.id">
          {{ platform.platform.name }}
          <span>,&nbsp;</span>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h2>Product Information</h2>
          <div v-html="games.description"></div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import NumberInputSpinner from "vue-number-input-spinner";
import MenuTop from "~/components/MenuTop.vue";
import Header from "~/components/Header.vue";
import Breadcrumbs from "~/components/Breadcrumbs.vue";
import Footer from "~/components/Footer.vue";
import StarRating from "vue-star-rating";

// import moment from "moment";

export default {
  scrollToTop: true,

  components: {
    NumberInputSpinner,
    MenuTop,
    Header,
    Breadcrumbs,
    Footer,
    StarRating,
  },

  props: {
    id: String,
  },

  data: () => {
    return {
      game: null,
      price: Math.floor(Math.random() * 50 + 9),
      quantity: 1,
    };
  },

  async asyncData({ params, error }) {
    return axios
      .get(`https://api.rawg.io/api/games/${params.id}`)
      .then((res) => {
        return { games: res.data };
        console.log(res.data);
      })
      .catch((err) => {
        error({ statusCode: 404, message: err.message });
        window.location.replace("/");
      });
  },

  computed: {
    breadcrumbs() {
      const links = [
        {
          link: this.games.parent_platforms[0].platform.name + "/",
          text: this.games.parent_platforms[0].platform.name,
        },
      ];
      links.push({ link: "", text: this.games.name });
      return links;
    },
  },

  methods: {
    addToCart() {
      var currentDate = moment(currentDate);
      this.$store.commit("SET_CART", {
        date: currentDate,
        cover: this.games.background_image,
        name: this.games.name,
        id: this.games.id,
        price: this.price,
        quantity: this.quantity,
      });
    },
  },

  head() {
    return {
      title: this.games.name + " || vue-ecommerce.com",
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
.vnis__wrapper {
  @media (max-width: 959px) {
    width: 100%;
    margin: 0 0 28px 0 !important;
  }
}

.vnis__wrapper .vnis__button {
  color: #505050 !important;

  &:last-child {
    font-size: 16px;
  }
}
.product__price {
  margin-top: 45px;
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 35px;
  line-height: 0;
  letter-spacing: -2px;
}

.product__heading {
  margin-bottom: 0;
}

.product__image {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border: 1px solid #f3f3f3;
  border-right: none;
  min-height: 300px;
}

.product__tax {
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 20px;
  margin-top: 15px;
}

.product__code {
  font-weight: 300;
  font-size: 14px;
}

.product__availability {
  background-color: #f8f8f8;
  padding: 15px;
  margin-top: 58px;
  margin-bottom: 20px;
  box-shadow: -5px 5px 7px rgba(0, 0, 0, 0.05882);

  h5 {
    font-weight: 500;
  }

  p {
    margin: 0;
    padding: 0;
    font-size: 15px;
  }
}

.product__box {
  box-shadow: -5px 5px 7px #0000000f;
  padding: 30px 10px 10px 30px;
  min-height: 540px;
}

.product__media {
  padding: 20px 30px;
  background: #fff;
  margin-top: 45px;
  margin-bottom: 45px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  border: 1px solid #efefef;

  .media-benefit {
    margin-bottom: 0;
    margin: 15px 0;
    display: flex;
    align-items: center;
  }
}

.media-body {
  h5 {
    color: $blue;
    margin-bottom: 0;
  }
  p {
    font-weight: 300;
    font-size: 16px;
    margin-bottom: 0;
  }
}

.media-left {
  margin-right: 15px;

  .media__icon {
    font-size: 45px;
    color: $blue;
  }
}

.vnis__wrapper {
    height: 42px;
}
</style>