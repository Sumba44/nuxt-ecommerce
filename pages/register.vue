<template>
  <div>
    <MenuTop />
    <div class="container">
      <h1>Register Page</h1>

      <UserAuthForm buttonText="Register" :submitForm="registerUser" hasName="true" />
    </div>
    <Footer />
  </div>
</template>

<script>
import UserAuthForm from "~/components/UserAuthForm";
import MenuTop from "~/components/MenuTop.vue";
import Footer from "~/components/Footer.vue";

export default {
  components: {
    UserAuthForm,
    MenuTop,
    Footer,
  },
  methods: {
      registerUser(registerinfo) {
          debugger
          alert('register')
      }
  }
};
</script>

<style lang="scss">
</style>