<template>
  <div>
    <app-bar />
    <main>
      <h2 class="title mb-6">Instructions</h2>
      <b-table :data="data" :columns="columns"></b-table>
    </main>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar";

export default {
  name: "Help",

  components: {
    AppBar,
  },

  data() {
    return {
      data: [
        {
          id: 1,
          gesture: "Thumbs-up",
          description: "Starts a new game.",
        },
        {
          id: 2,
          gesture: "Move left",
          description: "Moves a piece to the left.",
        },
        {
          id: 3,
          gesture: "Move right",
          description: "Moves a piece to the right.",
        },
        {
          id: 4,
          gesture: "Move down",
          description: "Moves a piece to downwards.",
        },
        {
          id: 5,
          gesture: "Rotate",
          description: "Rotates a piece.",
        },
      ],
      columns: [
        {
          field: "id",
          label: "ID",
          width: "40",
          numeric: true,
        },
        {
          field: "gesture",
          label: "Gesture",
        },
        {
          field: "description",
          label: "Description",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  margin-top: 3%;
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  padding: 1rem;
}
</style>
