<template>
  <span class="separator">|</span>
  <div class="filter-range">
    <h3 class="filter-name">{{ slide.name }}</h3>
    <div class="filter-range_values">
      <input
        type="number"
        v-model="valueProp[0]"
        @change.prevent="changeSlider([valueProp[0] + 1, valueProp[1]])"
        size="2"
        min="slide.value[0]"
      />
      <span class="hyphen">-</span>
      <input
        type="number"
        v-model="valueProp[1]"
        @change.prevent="changeSlider([valueProp[0], valueProp[1] - 1])"
        size="2"
        max="slide.value[1]"
      />
    </div>

    <vue-slider
      ref="slider"
      :min="min"
      :max="max"
      @change="changeSlider"
      v-model="valueProp"
      v-bind="options"
    />
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { mapGetters } from "vuex";
import VueSlider from "vue-slider-component";
import "../sass/slider.css";

export default {
  name: "Sliders",
  props: {
    slide: Object
  },
  data() {
    return {
      valueProp: this.slide.value,
      minFloor: this.slide.value[0],
      maxFloor: this.slide.value[1],
      options: {
        width: "100%",
        height: 4,
        tooltip: "none",
        min: this.slide.value[0],
        max: this.slide.value[1],
        minRange: this.slide.value[0],
        maxRange: this.slide.value[1],
        interval: this.slide.step
      }
    };
  },
  components: { VueSlider },
  methods: {
    changeSlider(arr: any): any {
      const [min, max] = arr;
      // const min: any = this.value[0];
      // const max: any = this.value[1];
      // console.log(min);
      // console.log(max);
      return this.getByFloor(min, max);
    },
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

<style lang="sass">
.vue-slider
  width: 90%
  padding: 1rem
  margin: 1rem 1rem
  right: 5px
  left: 0
</style>
