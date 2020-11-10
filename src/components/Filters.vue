<template>
  <div class="filters">
    <div class="filter-rooms">
      <h3 class="filter-name_rooms">Комнаты</h3>
      <div class="filter-btns">
        <input
          @click="e => setRooms(e)"
          type="button"
          name="rooms"
          value="XS"
        />
        <input
          @click="e => setRooms(e)"
          type="button"
          name="rooms"
          value="1k"
        />
        <input
          @click="e => setRooms(e)"
          type="button"
          name="rooms"
          value="2k"
        />
        <input
          @click="e => setRooms(e)"
          type="button"
          name="rooms"
          value="3k+"
        />
      </div>
    </div>
    <Sliders v-for="slide in sliders" :key="slide.id" v-bind:slide="slide" />
    <span class="separator">|</span>
    <div class="filter-manage">
      <input
        type="submit"
        @click.prevent="calculateFilters"
        class="apply-btn"
        value="Применить"
      />
      <span @click="fetchFlats" class="filter-reset">Сбросить фильтр</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import Sliders from "./Sliders.vue";
import { nextTick } from "vue";
import { defineComponent } from "vue";
export default {
  name: "Filters",
  emits: ["click", "mouseup"],
  data() {
    return {
      sliders: [
        {
          id: 1,
          name: "Этаж",
          value: [1, 35],
          step: 1,
          filterName: "floor"
        },
        {
          id: 2,
          name: "Площадь",
          value: [10, 150],
          step: 1,
          filterName: "square"
        },
        {
          id: 3,
          name: "Стоимость",
          value: [1.1, 99.9],
          step: 0.1,
          filterName: "price_real"
        }
      ]
    };
  },
  components: { Sliders },

  computed: {
    ...mapMutations(["updateFlats"]),
    ...mapGetters(["setRooms"])
  },
  methods: {
    ...mapGetters(["setRooms", "setReset", "calculateFilters"]),
    calculate() {
      this.calculateFilters();
    },
    setValues(val: any): any {
      const arr = [val, "rooms"];
      return this.setFilter(arr);
    },
    ...mapActions(["setFilter", "fetchFlats"])
  }
};
</script>
