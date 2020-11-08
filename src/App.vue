<template>
  <div class="wrapper">
    <Filters />
    <div class="flats-loop">
      <Card v-for="flat in allFlats" :key="flat.id" v-bind:flat="flat" />
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from "vue";
import "./sass/main.sass";
import Card from "./components/Card.vue";
import Filters from "./components/Filters.vue";
import store from "./store/index";
export default defineComponent({
  name: "App",
  computed: mapGetters(["allFlats"]),
  components: {
    Card,
    Filters
  },
  async mounted() {
    return (this as any).$store.dispatch("fetchFlats");
  }
});
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
</style>
