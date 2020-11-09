<template>
  <div class="flat-item card">
    <div class="flat-item__extra">
      <span class="flat-item__extra_floor">{{ flat.floor }} этаж</span>
      <div class="flat-item__extra_main">
        <span v-if="flat.short == 'XS'" class="flat-item__extra_rooms">
          студия
        </span>
        <span v-else class="flat-item__extra_rooms">
          {{
            `${flat.rooms} комнат${
              flat.rooms > 4 ? "" : flat.rooms > 1 ? "ы" : "а"
            }`
          }}
        </span>
        <span class="hyphen">-</span>
        <span class="flat-item__extra_square">{{ flat.square }}м</span>
      </div>
    </div>
    <div class="flat-item__overview">
      <span class="flat-item__overview_number">№{{ flat.building_id }}</span>
      <img class="flat-item__overview_plan" :src="flat.plan" :alt="flat.name" />
    </div>
    <div class="flat-item__price">
      <strong class="flat-item__price_full"
        >{{ priceFormatter(flat.price_real) }}р.</strong
      >
      <small class="flat-item__price_per-m"
        >{{ priceFormatter(flat.price_real / flat.square) }} р. за м</small
      >
    </div>
    <button class="flat-item__btn">Подробнее</button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    flat: Object
  },
  methods: {
    priceFormatter: function(price: string) {
      const result = Number(parseFloat(price));
      const rr = Number(Math.round(result * 1) / 1)
        .toFixed(0)
        .toString()
        .split(".");
      const b: string = rr[0].replace(
        /(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,
        "$1" + " "
      );
      return rr[1] ? b + rr[1] : b;
    }
  }
};
</script>

<style></style>
