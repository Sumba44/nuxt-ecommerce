<template>
  <div>
      <div class="container home__categories__wrap">
        <nuxt-link :to="'/category' + '/games/'">
          <div class="home__categories">
            <img
              src="https://damido.sk/themes/games/assets/img/steam.png"
              class="home__categories__img"
              style="opacity: 0.9;"
            />
            <p class="h3 home__categories__title">Steam</p>
            <p class="text-mute">Steam platform</p>
          </div>
        </nuxt-link>
        <a href="29-xbox">
          <div class="home__categories">
            <img
              src="https://damido.sk/themes/games/assets/img/xbox.png"
              class="home__categories__img"
              style="opacity: 0.8;"
            />
            <p class="h3 home__categories__title">XBOX</p>
            <p class="text-mute">XBOX Console</p>
          </div>
        </a>
        <a href="38-psn">
          <div class="home__categories">
            <img
              src="https://damido.sk/themes/games/assets/img/playstation.png"
              class="home__categories__img"
              style="opacity: 0.9;width: 110px;padding-bottom: 16px;"
            />
            <p class="h3 home__categories__title">PlayStation</p>
            <p class="text-mute">PlayStation Console</p>
          </div>
        </a>
        <a href="28-origin">
          <div class="home__categories">
            <img
              src="https://damido.sk/themes/games/assets/img/origin.png"
              class="home__categories__img"
              style="width: 132px;margin-top: 32px;padding-bottom: 30px;opacity: 0.8;"
            />
            <p class="h3 home__categories__title">Origin</p>
            <p class="text-mute">Origin platform</p>
          </div>
        </a>
        <a href="37-uplay">
          <div class="home__categories">
            <img
              src="https://damido.sk/themes/games/assets/img/uplay.png"
              class="home__categories__img"
              style="width: 134px;margin-top: 22px;padding-bottom: 30px;opacity: 0.7;"
            />
            <p class="h3 home__categories__title">Uplay</p>
            <p class="text-mute">Ubisoft Distribution</p>
          </div>
        </a>
      </div>
      <!-- <div class="home__categories--gradient"></div> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  async asyncData({ params, error }) {
    return axios
      .get(
        `https://sandboxapi.g2a.com/v1/products?platform=${params.platform}`,
        {
          headers: {
            authorization:
              "qdaiciDiyMaTjxMt, 74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875",
          },
        }
      )
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
.home__categories__wrap {
  display: flex;
  justify-content: space-between;
  margin-top: -75px;
  z-index: 1;
  position: relative;
}

.home__categories {
  width: 235px; //215/235
  height: 238px;
  margin-bottom: 45px;
  background: #fff;
  padding: 15px 10px;
  border-radius: 10px 10px 0 0;
  border: 1px solid #f3f3f3;
  border-bottom: none;
  box-shadow: 0 -20px 20px 0 rgba(0, 0, 0, 0.15);
  text-align: center;
  transition: 0.8s;
  cursor: pointer;
}

.home__categories__img {
  width: 91px;
  margin-top: 15px;
  padding-bottom: 10px;
  margin-bottom: 4px;
}

// .home__categories--gradient {
//     height: 30px;
//     background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
//     margin-top: -30px;
// }
</style>