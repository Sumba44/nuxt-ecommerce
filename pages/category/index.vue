<template>
  <div id="category">
    <MenuTop />
    <HomeCategories />
    <div class="container mx-auto mt-5">
      <div class="row">
          <div class="col-md-3 pl-0">
              <div class="category__filters"></div>
          </div>
          <div class="col-md-9">
              <h6>Games</h6>
              <h2 class="mb-5">Most Popular Games</h2>
              <div class="row">
                <!-- doc.slug.substr(1) -->
                <nuxt-link
                  :to="'/category' + '/games/' + result.id"
                  v-for="result in games.results"
                  :key="result.id"
                  class="col-md-3"
                  :id="result.id"
                  :slug="result.slug"
                >
                  <div
                    class="text-black font-semibold text-lg overflow-hidden whitespace-no-wrap overflow-dots"
                  >
                    <div
                      class="product__miniature"
                      :style="{ backgroundImage: `url(${result.background_image})` }"
                    ></div>
                    <h4>{{ result.name }}</h4>
                    <b>Year: {{ result.released }}</b>
                    <br />
                    <client-only>
                      <StarRating
                        :rating="result.rating"
                        :star-size="22"
                        :round-start-rating="false"
                        :fixed-points="2"
                        text-class="product__star-rating"
                        read-only
                      ></StarRating>
                    </client-only>
                    <br />
                    <b>{{ result.rating }}</b>
                  </div>
                </nuxt-link>
              </div>
          </div>
      </div>
    </div>
    <!-- <pre>
        {{ games }}
    </pre>-->
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import MenuTop from "~/components/MenuTop.vue";
import HomeCategories from "~/components/HomeCategories.vue";
import Footer from "~/components/Footer.vue";
import StarRating from "vue-star-rating";

export default {
  components: {
    MenuTop,
    HomeCategories,
    Footer,
    StarRating,
  },

  methods: {},

  async asyncData({ params, error }) {
    return axios
      .get(`https://api.rawg.io/api/games`)
      .then((res) => {
        return { games: res.data };
      })
      .catch((err) => {
        error({ statusCode: 404, message: err.message });
      });
  },
};
</script>

<style lang="scss">

</style>