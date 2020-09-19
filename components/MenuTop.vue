<template>
  <div class="menu-top">
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand href="#">
        <Logo />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto nav__right">

          <div class="nav__right--item mr-3"> 
            <nuxt-link to="/login">
            <font-awesome-icon :icon="['fas', 'user']" class="menu__icon mr-2" />
            <div>Sign In / Sign Up</div>
            </nuxt-link>
          </div>

          <div class="nav__right--item mr-3">
            <nuxt-link to="/cart">
              <font-awesome-icon :icon="['fas', 'shopping-cart']" class="menu__icon" />

              <div v-if="cartOrders.length >= 1">
                <v-badge color="primary" :content="cartOrders.length">Cart</v-badge>
              </div>
              <div v-else>
                <span>Cart</span>
              </div>
            </nuxt-link>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
export default {
  components: {
    Logo,
  },

  data() {
    return {
      cartOrders: this.$store.state.orders,
    };
  },
};
</script>

<style lang="scss">
nav.navbar {
  background: #1e1e24;
}
#index .menu-top {
  nav.navbar {
    background: linear-gradient(
      0deg,
      rgba(24, 24, 28, 0) 0%,
      rgba(14, 15, 15, 1) 100%
    ) !important;
    background-color: transparent;
    margin-bottom: -69px;
    z-index: 99;
  }
}

.nav__right {
  color: #fff;
  font-size: 20px;
  margin-right: 10px;

  a {
    font-size: 16px;
    font-weight: 300;
    margin-left: 7px;
    color: #fffffff8;
    display: flex;

    &:hover {
      color: #fff;
    }
  }
}

.nav__right--item {
  display: flex;
  align-items: center;

  span {
    font-size: 16px;
    font-weight: 300;
    margin-left: 7px;
  }
}

.menu__icon {
  color: #fff;
  font-size: 23px;
}

.v-application--is-ltr .v-badge__badge {
  margin-left: -5px;
  font-size: 13px;
  padding-top: 3px;
}

.search-box {
  border: solid 2px #fff;
  display: inline-block;
  position: relative;
  border-radius: 50px;
  input[type="text"] {
    font-size: 20px;
    background: transparent;
    font-weight: bold;
    width: 50px;
    height: 50px;
    padding: 5px 40px 5px 10px;
    border: none;
    box-sizing: border-box;
    border-radius: 50px;
    transition: width 800ms cubic-bezier(0.5, -0.5, 0.5, 0.5) 600ms;
    &:focus {
      outline: none;
    }
    &:focus,
    &:not(:placeholder-shown) {
      width: 300px;
      transition: width 800ms cubic-bezier(0.5, -0.5, 0.5, 1.5);
      + span {
        bottom: 13px;
        right: 10px;
        transition: bottom 300ms ease-out 800ms, right 300ms ease-out 800ms;
      }
      + span:after {
        top: 0;
        right: 10px;
        opacity: 1;
        transition: top 300ms ease-out 1100ms, right 300ms ease-out 1100ms,
          opacity 300ms ease 1100ms;
      }
    }
  }
  span {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: -13px;
    right: -15px;
    transition: bottom 300ms ease-out 300ms, right 300ms ease-out 300ms;
    &:before,
    &:after {
      content: "";
      height: 25px;
      border-left: solid 2px #fff;
      position: absolute;
      transform: rotate(-45deg);
    }
    &:after {
      transform: rotate(45deg);
      opacity: 0;
      top: -20px;
      right: -10px;
      transition: top 300ms ease-out, right 300ms ease-out,
        opacity 300ms ease-out;
    }
  }
}
</style>