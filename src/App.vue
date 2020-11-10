<template>
  <div class="wrapper">
    <h4 class="sup-title">Your dreams</h4>
    <h1 class="title">Flat picks</h1>
    <Filters />
    <div class="flats-loop">
      <Card v-for="flat in allFlats" :key="flat.id" v-bind:flat="flat" />
      <span v-if="noContent" class="no-cnotent"
        >Джекпот! Может подберём что-то попроще?</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from "vuex";
import { defineComponent } from "vue";
import "./sass/main.sass";
import Card from "./components/Card.vue";
import Filters from "./components/Filters.vue";

export default defineComponent({
  name: "App",
  computed: { ...mapGetters(["noContent", "allFlats", "calculateFilters"]) },
  methods: {
    ...mapActions(["fetchFlats"]),
    ...mapGetters(["calculateFilters"])
  },
  components: {
    Card,
    Filters
  },
  async mounted() {
    return this.fetchFlats();
  }
});
</script>

<style lang="sass">
#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
</style>
