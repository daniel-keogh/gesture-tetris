<template>
  <header>
    <b-navbar centered shadow>
      <template #brand>
        <b-navbar-item tag="router-link" to="/">
          <h1 class="title retro-title">Gesture Tetris</h1>
        </b-navbar-item>
      </template>

      <template #start>
        <b-navbar-item
          v-for="item in items"
          :key="item.title"
          :active="item.active"
          :to="item.to"
          tag="router-link"
        >
          {{ item.title }}
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <b-button
              class="is-light"
              icon-left="github"
              tag="a"
              href="https://github.com/daniel-keogh/gesture-tetris"
              target="_blank"
            >
              GitHub
            </b-button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </header>
</template>

<script>
export default {
  name: "AppBar",

  data() {
    return {
      items: [
        {
          active: false,
          title: "Home",
          to: "/",
        },
        {
          active: false,
          title: "Help",
          to: "/help",
        },
      ],
    };
  },

  beforeMount() {
    this.items.forEach((n) => {
      n.active = n.title === this.$route.name;
    });
  },
};
</script>

<style lang="scss" scoped></style>
