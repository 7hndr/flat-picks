<template>
  <div class="filters">
    <div class="filter-btns">
      <input type="button" value="S" />
      <input type="button" value="1к" />
      <input type="button" value="2к" />
      <input type="button" value="3к" />
    </div>
    <span class="separator">|</span>
    <div class="filter-range">
      <div class="filter-range_values">
        <input type="number" v-model.number="minFloor" size="2" />
        <span class="hyphen">-</span>
        <input type="number" v-model.number="maxFloor" size="2" />
      </div>
      <div class="filter-range_slider">
        <input
          type="range"
          min="1"
          max="35"
          step="1"
          @change="setChangeSlider"
          v-model.number="minFloor"
        />
        <input
          type="range"
          min="1"
          max="35"
          step="1"
          @change="setChangeSlider"
          v-model.number="maxFloor"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Filters",
  data() {
    return {
      minFloor: 1,
      maxFloor: 35,
      setChangeSlider() {
        if (this.minFloor > this.maxFloor) {
          const tmp = this.maxFloor;
          this.maxFloor = this.minFloor;
          this.minFloor = tmp;
        }
      },
      floorFilter() {
        console.log(123);
      }
    };
  }
};
</script>

<style scoped></style>
