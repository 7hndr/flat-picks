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
  state: { flats: [] },
  getters: {
    allFlats(state: any) {
      return state.flats;
    }
  }
};
