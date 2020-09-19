<template>
  <v-toolbar dense color="transparent">
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

    <v-toolbar-title>
      <nuxt-link to="/">
        <Logo />
      </nuxt-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <nuxt-link to="/login">
      <font-awesome-icon :icon="['fas', 'user']" class="menu__icon mr-2" />
      <span>Sign In / Sign Up</span>
    </nuxt-link>

    <nuxt-link to="/cart" class="d-flex">
      <font-awesome-icon :icon="['fas', 'shopping-cart']" class="menu__icon" />
      <div>Cart</div>
      <span v-if="cartOrders">{{ cartOrders.length }}</span>
    </nuxt-link>
  </v-toolbar>
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

  // methods: {

  //   recalculateTotals() {
  //     this.cartOrders = this.$store.state.orders
  //   },
  // },

  // watch: {
  //   cartOrders: function () {
  //     this.cart = this.cartOrders.length()
  //   },
  // },
};
</script>

<style lang="scss">
nav.navbar {
  background: #1e1e24;
}
#index header {
  margin-bottom: -48px;
  position: relative;
  z-index: 9;
  box-shadow: none;
  padding: 10px;
  color: #fff;

  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>