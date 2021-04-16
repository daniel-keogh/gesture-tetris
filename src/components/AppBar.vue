<template>
  <header>
    <b-navbar centered shadow>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <h1 class="subtitle is-5">Gestures Project</h1>
        </b-navbar-item>
      </template>

      <template #start>
        <b-navbar-item active href="#">Home</b-navbar-item>
        <b-navbar-item href="#">Help</b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <b-button
              class="is-light"
              icon-left="github"
              tag="a"
              href="https://github.com/daniel-keogh/gestures-project"
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
};
</script>

<style lang="scss" scoped></style>
