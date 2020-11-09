export default {
  actions: {
    async fetchFlats(context: any) {
      const res = await fetch("/data/data.json");
      const flats = await res.json();
      context.commit("updateFlats", flats);
    },
    newSet(context: any) {
      context.commit("setFilter");
    }
  },
  mutations: {
    updateFlats(state: any, flats: any) {
      state.flats = flats;
    },
    setFilter(state: any, arr: any) {
      console.log("yes");
      console.log(arr.value);
      // console.log(`${min} and ${max} name is ${name}`);
      return true;
    }
  },
  state: {
    flats: [],
    filtered: [],
    floors: [1, 35],
    floorFork: [],
    filters: [{ Rooms: [] }, { Floor: [] }, { Square: [] }, { Price: [] }]
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
    }
  }
};
