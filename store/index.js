export const state = () => ({
  ip: '192.168.4.1',
  color: '#ffffff',
  color2: '#ffffff',
  splitStick: false,
  setSecondColor: false,
  menu: false,
  favorited: false,
  favorites: [],
})

export const mutations = {
  update(state, color) {
    state.color = color
    window.localStorage.color = state.color
    this.commit('isAlreadyFavorited', color)
  },
  update2(state, color) {
    state.color2 = color
    window.localStorage.color2 = color
    // this.commit('isAlreadyFavorited', color)
  },
  splitStick(state) {
    state.splitStick = !state.splitStick
    state.setSecondColor = state.splitStick ? state.setSecondColor : false
  },
  toggleSecondColor(state) {
    state.setSecondColor = !state.setSecondColor
  },
  setSecondColor(state, value) {
    state.setSecondColor = value
  },
  toggleMenu(state, menu) {
    state.menu = !state.menu
  },
  addToFavorites(state, color) {
    if (!state.favorites.includes(color)) {
      state.favorites.push(color)
      window.localStorage.favorites = state.favorites
    }
    this.commit('isAlreadyFavorited', color)
  },
  updateColorFromLocalStorage(state) {
    state.color = window.localStorage.color
  },
  updateFavoritesFromLocalStorage(state) {
    if (localStorage.getItem('favorites') !== null) {
      state.favorites = window.localStorage.favorites.split(',')
    }
  },
  clearFavorites(state) {
    state.favorites = []
    window.localStorage.favorites = state.favorites
  },
  isAlreadyFavorited(state, color) {
    state.favorited = state.favorites.includes(color)
  },
}
