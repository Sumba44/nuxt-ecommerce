<template>
  <div id="index">
    <MenuTop />
    <Header />
    <HomeCategories />

    <div class="row">
            <!-- doc.slug.substr(1) -->
            <nuxt-link
              :to="'/category' + '/games/' + game.id"
              v-for="game in games"
              :key="game.id"
              class="col-md-3 category__product-wrap"
              :id="game.id"
              :slug="game.slug"
            >
              <div class="category__product">
                <div
                  class="product__miniature"
                  :style="{ backgroundImage: `url(${game.background_image})` }"
                ></div>
                <div class="product__miniature-body">
                  <h4>{{ game.name.substring(0, 35) + ".." }}</h4>
                  <client-only>
                    <StarRating
                      :rating="Math.floor(Math.random() * 5 + 3)"
                      :star-size="18"
                      :round-start-rating="false"
                      :fixed-points="2"
                      :show-rating="false"
                      text-class="product__star-rating"
                      read-only
                    ></StarRating>
                  </client-only>
                  <span>{{ game.genres[0].name }}</span>
                </div>
              </div>
            </nuxt-link>
          </div>

    <Pagination :items="pagination" />
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import MenuTop from "~/components/MenuTop.vue";
import Header from "~/components/Header.vue";
import HomeCategories from "~/components/HomeCategories.vue";
import StarRating from "vue-star-rating";
import Pagination from "~/components/Pagination.vue";
import Footer from "~/components/Footer.vue";

export default {
  components: {
    MenuTop,
    Header,
    HomeCategories,
    StarRating,
    Pagination,
    Footer,
  },

  async asyncData({ params, error }) {
    return axios
      .get(`https://api.rawg.io/api/games`)
      .then((res) => {
        return { games: res.data.results };
        console.log(res.data.results);
      })
      .catch((err) => {
        error({ statusCode: 404, message: err.message });
      });
  },

  data() {
    var rand = Math.floor(Math.random() * 5 + 3);

    return {
      games: null,
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
      max: 100,
      slider: 40,
      range: [0, 100],
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
  },

  watch: {
    model(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop());
      }
    },
  },

  // ina verzia async data s premenou//////////////////////////
  // async asyncData({ params }) {
  //   let { data } = await axios.get(`https://sandboxapi.g2a.com/v1/products`, {
  //     headers: {
  //       authorization:
  //         "qdaiciDiyMaTjxMt, 74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875",
  //     },
  //   })

  //   return { games: data }
  // }

  // ina verzia s FETCH data s premenou//////////////////////////
  //   async fetch() {
  //     const data = await fetch(`https://sandboxapi.g2a.com/v1/products`, {
  //       headers: {
  //         authorization: "qdaiciDiyMaTjxMt, 74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875",
  //       },
  //     })
  //     return {
  //       games: data,
  //     };
  //   },
};
</script>

<style lang="scss">
.category__product-wrap {
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
