<template>
  <div class="filters">
    <div class="filter-rooms">
      <h3 class="filter-name_rooms">Комнаты</h3>
      <div class="filter-btns">
        <input
          @click.prevent="getByRooms"
          type="button"
          name="rooms"
          value="XS"
        />
        <input
          @click.prevent="getByRooms"
          type="button"
          name="rooms"
          value="1k"
        />
        <input
          @click.prevent="getByRooms"
          type="button"
          name="rooms"
          value="2k"
        />
        <input
          @click.prevent="getByRooms"
          type="button"
          name="rooms"
          value="3k+"
        />
      </div>
    </div>
    <Sliders v-for="slide in sliders" :key="slide.id" v-bind:slide="slide" />
    <span class="separator">|</span>
    <div class="filter-manage">
      <button class="apply-btn">Применить</button>
      <span class="filter-reset">Сбросить фильтр</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { mapGetters, mapMutations } from "vuex";
import Sliders from "./Sliders.vue";

export default {
  name: "Filters",
  data() {
    return {
      sliders: [
        {
          id: 1,
          name: "Этаж",
          value: [1, 35],
          step: 1,
          filterName: "Floor"
        },
        {
          id: 2,
          name: "Площадь",
          value: [10, 150],
          step: 1,
          filterName: "Square"
        },
        {
          id: 3,
          name: "Стоимость",
          value: [1.1, 99.9],
          step: 0.1,
          filterName: "Price"
        }
      ]
    };
  },
  components: { Sliders },
  methods: {
    sortBy(val: any): any {
      console.log(val);
      console.log(this.allFlats.length);
      const frr = this.allFlats
        .filter((item: any) => {
          return item.short === val;
        })
        .map((item: any) => {
          return item.price;
        });
      console.log(frr);
    }
  },
  computed: {
    ...mapGetters(["getByRooms", "getByFloor", "allFlats", "filteredFlats"])
  }
};
</script>
