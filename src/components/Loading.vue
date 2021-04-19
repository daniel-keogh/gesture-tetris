<template>
  <b-loading
    :is-full-page="isFullPage"
    v-model="isLoading"
    :can-cancel="false"
    class="loading"
  >
    <div>
      <b-icon class="loading__icon"> </b-icon>
      <div class="loading__message">
        <p>{{ message }}</p>
      </div>
    </div>
  </b-loading>
</template>

<script>
export default {
  name: "Loading",

  props: {
    message: {
      type: String,
      default: "Loading...",
    },
  },

  data() {
    return {
      isFullPage: true,
      isLoading: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.loading {
  text-align: center;

  &__message {
    margin-top: 5rem;
  }
}
</style>
