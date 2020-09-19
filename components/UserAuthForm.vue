<template>
  <v-form v-model="valid">
    <v-text-field
      v-model="userInfo.name"
      label="Name"
      :rules="[required('name')]"
      v-if="hasName"
      outlined
    />

    <v-text-field
      v-model="userInfo.email"
      label="E-mail"
      :rules="[required('email'), emailFormat()]"
      outlined
    />

    <v-text-field
      v-model="userInfo.password"
      label="Password"
      :type="showPassword ? 'text' : 'password'"
      counter="true"
      :rules="[required('password'), minLength('password', 8)]"
      outlined
    />
    <!-- :append-icon="showPassword = !showPassword" -->

    <v-btn @click="submitForm(userInfo)" :disabled="!valid">{{ buttonText }}</v-btn>
  </v-form>
</template>

<script>
import validations from "~/utils/validations";

export default {
  data() {
    return {
      valid: false,
      showPassword: false,
      userInfo: {
        email: "robert@dedfx.com",
        password: "kokotkokot44",
      },
      ...validations,
    };
  },
  props: ["submitForm", "buttonText", "hasName"],
};
</script>