<template>
  <div>
    <app-bar />
    <main>
      <div class="mb-6">
        <h2 class="title">Instructions</h2>
        <p>
          Below is a brief summary of how to play the game using hand gestures.
        </p>
      </div>
      <b-table :data="data" hoverable striped>
        <b-table-column field="gesture" label="Gesture" v-slot="props">
          {{ props.row.gesture }}
        </b-table-column>

        <b-table-column field="description" label="Description" v-slot="props">
          {{ props.row.description }}
        </b-table-column>

        <b-table-column field="icon" label="Icon" width="40" v-slot="props">
          <span class="gesture-icon">
            {{ props.row.icon }}
          </span>
        </b-table-column>
      </b-table>
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
          gesture: "Thumbs-up.",
          description:
            "Starts a new game if there is currently not one in progress.",
          icon: "👍",
        },
        {
          id: 2,
          gesture: "Index pointing left.",
          description: "Moves a piece to the left.",
          icon: "👈",
        },
        {
          id: 3,
          gesture: "Index pointing right.",
          description: "Moves a piece to the right.",
          icon: "👉",
        },
        {
          id: 4,
          gesture: "Okay sign.",
          description: "Moves a piece downwards.",
          icon: "👌",
        },
        {
          id: 5,
          gesture: "Upwards-pointing index finger.",
          description: "Rotates a piece to the right.",
          icon: "☝️",
        },
        {
          id: 5,
          gesture: `"Victory/Peace".`,
          description: "Rotates a piece to the left.",
          icon: "✌️",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  margin-top: 2%;
  margin-left: auto;
  margin-right: auto;
  max-width: 964px;
  padding: 1rem;
}

.gesture-icon {
  font-size: 1.5rem;

  @media (max-width: 1024px) {
    font-size: 1rem;
  }
}
</style>
