export default {
  actions: {
    async fetchFlats(context: any) {
      const res = await fetch("/data/data.json");
      const flats = await res.json();
      context.commit("updateFlats", flats);
    }
  },
  mutations: {
    updateFlats(state: any, flats: any) {
      state.flats = flats;
    }
  },
  state: {
    flats: [],
    filtered: [],
    filters: [],
    floors: [1, 35],
    floorFork: []
    // filters: [
    //   { name: "filterRooms", getter: obj => obj.short, value: "" },
    //   { name: "filterFloor", getter: obj => obj.floor, value: "" },
    //   { name: "filterSquare", getter: obj => obj.square, value: "" },
    //   { name: "filterPrice", getter: obj => obj.price_real, value: "" }
    // ],
  },
  getters: {
    allFlats(state: any) {
      if (state.filtered.length >= 1) {
        return state.filtered;
      } else if (state.floorFork.length != 0 && state.filtered.length == 0) {
        return state.floorFork;
      } else {
        return state.flats;
      }
    },
    filteredFlats(state: any) {
      return state.filters.reduce((filters, { value, getter }) => {
        return value
          ? state.flats.filter((item: any) => {
              return getter(item) == value;
            })
          : state.flats;
      }, this.state.flats);
    },
    getByFloor: (state: any) => (min: any, max: any) => {
      // state.floors = [];
      state.floors = [min, max];
      let newShow = [];
      if (state.filtered.length >= 1) {
        newShow = state.filtered.filter((item: any) => {
          state.floors = [];
          return item.floor >= min && item.floor <= max;
        });
      } else {
        newShow = state.flats.filter((item: any) => {
          state.floors = [];
          return item.floor >= min && item.floor <= max;
        });
      }
      state.floorFork = newShow;
    },
    getByRooms: (state: any) => (event: any) => {
      const roomQty = event.target.value;

      if (state.filters.length >= 1) {
        if (!state.filters.includes(roomQty)) {
          event.target.classList.toggle("activeBtn");
          state.filters.push(roomQty);
          state.flats.forEach((item: any) => {
            if (item.short == roomQty) {
              return state.filtered.push(item);
            }
          });
        } else {
          event.target.classList.toggle("activeBtn");
          const index: any = state.filters.indexOf(roomQty);
          state.filters.splice(index, 1);
          state.flats.forEach((item: any) => {
            if (item.short === roomQty) {
              const index: any = state.filtered.indexOf(item);
              state.filtered.splice(index, 1);
            }
          });
        }
      } else {
        state.filtered = [];
        state.filters.push(roomQty);
        event.target.classList.toggle("activeBtn");
        state.flats.forEach((item: any) => {
          state.filters.forEach((filter: any) => {
            if (item.short === filter) {
              return state.filtered.push(item);
            }
          });
        });
      }
      console.log(state.filters);
      console.log(state.filtered);
    }
  }
};
