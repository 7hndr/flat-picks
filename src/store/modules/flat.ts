export default {
  actions: {
    async fetchFlats(context) {
      const res = await fetch("/data/data.json");
      const flats = await res.json();
      context.commit("updateFlats", flats);
    },
    setFilter(context, arr) {
      context.commit("setShows", arr);
    }
  },
  mutations: {
    updateFlats(state, flats) {
      state.filters = state.filtersTemplate;
      state.filtered = [];
      state.flats = flats;
      state.nothing = false;
      console.log(state.filters);
      return state.flats;
    },
    setShows(state, arr) {
      const [min, max, name] = arr;
      if (name == "price_real") {
        const minP = min * 1000000;
        const maxP = max * 1000000;
        state.filters.price = [minP, maxP];
      } else {
        state.filters[name] = [min, max];
      }
    }
  },
  state: {
    flats: [],
    filtered: [],
    filters: {
      rooms: [],
      floor: [1, 35],
      square: [10, 150],
      price: [1100000, 99900000]
    },
    filtersTemplate: {
      rooms: [],
      floor: [1, 35],
      square: [10, 150],
      price: [1100000, 99900000]
    },
    prices: [],
    nothing: false
  },
  getters: {
    noContent(state) {
      return state.nothing;
    },
    setReset(state) {
      console.log(123);
      state.filters = state.filtersTemplate;
      return state.flats;
    },
    allFlats(state) {
      if (state.nothing) {
        console.log("nothing");
      } else if (state.filtered.length != 0) {
        return state.filtered;
      } else {
        return state.flats;
      }
    },
    calculateFilters(state: any) {
      state.filtered = [];
      let tmpRoom = [];
      let tmpFloor = [];
      let tmpSquare = [];
      let temp = [];
      const sets = 4;
      if (state.filters.rooms.length == 0) {
        console.log("rooms has been inverted");
        state.filters.rooms = ["XS", "1k", "2k", "3k+"];
      }
      console.log("calculating...");
      if (sets == 4) {
        for (let i = 0; i < sets; i++) {
          if (i == 0) {
            state.filters.rooms.forEach(room => {
              state.flats.forEach(flat => {
                if (flat.short == room) {
                  tmpRoom.push(flat);
                }
              });
            });
          } else if (i == 1) {
            tmpRoom.forEach(flat => {
              if (
                flat.floor >= state.filters.floor[0] &&
                flat.floor <= state.filters.floor[1]
              ) {
                tmpFloor.push(flat);
              }
            });
          } else if (i == 2) {
            tmpFloor.forEach(flat => {
              if (
                flat.square >= state.filters.square[0] &&
                flat.square <= state.filters.square[1]
              ) {
                tmpSquare.push(flat);
              }
            });
          } else {
            tmpSquare.forEach(flat => {
              const prc = "price_full";
              if (
                flat[prc] >= state.filters.price[0] &&
                flat[prc] <= state.filters.price[1]
              ) {
                temp.push(flat);
              }
            });
          }
        }
      }
      state.nothing = false;
      state.filtered = temp;
      tmpRoom = tmpFloor = tmpSquare = temp = [];
      if (state.filtered.length == 0) {
        state.nothing = true;
      }
      console.log("Done!");
      return state.filtered;
    },
    setRooms: (state: any) => (event: any) => {
      const roomQty = event.target.value;
      const findR = state.filters.rooms.find((val: any) => val == roomQty);
      if (findR) {
        event.target.classList.toggle("activeBtn");
        const index: any = state.filters.rooms.indexOf(roomQty);
        state.filters.rooms.splice(index, 1);
      } else {
        event.target.classList.toggle("activeBtn");
        state.filters.rooms.push(roomQty);
      }
      return state.filters.rooms;
    }
  }
};
