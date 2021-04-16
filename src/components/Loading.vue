<template>
  <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="false">
    <div>
      <b-icon class="loading-icon"> </b-icon>
      <div class="loading-message">
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
      default: "Loading the model...",
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
.loading-message {
  margin-top: 5rem;
}
</style>
