<template>
  <aside :class="[{ active: $store.state.menu }]">
    <h1 class="title">pau<span class="led">LED</span>o</h1>
    <h2>Settings</h2>
    <label for="ip">IP: </label>
    <input id="ip" name="ip" type="text" :value="$store.state.ip" />
    <h2>Favorites</h2>
    <div v-for="(item, i) in $store.state.favorites" :key="i">
      <button
        class="btn-color"
        :style="'background-color:' + item"
        @click="handleColor(item)"
      >
        {{ item }}
      </button>
    </div>
    <button
      v-if="$store.state.favorites.length"
      class="btn-clear"
      style="margin-top: 1rem"
      @click="handleClearFavorites"
    >
      Clear Favorites
    </button>
  </aside>
</template>

<script>
export default {
  methods: {
    handleColor(curretColor) {
      this.$store.commit('update', curretColor)
    },
    handleClearFavorites() {
      this.$store.commit('clearFavorites')
    },
  },
}
</script>

<style scoped>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 400;
  font-size: 2rem;
  color: #40f4cb;
  letter-spacing: 1px;
  margin-top: 2rem;
}

aside {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  padding-bottom: 6rem;
  max-width: 300px;
  background-color: #e9f9f5;
  transform: translateX(120%);
  transition: all 300ms ease-in-out;
}

aside.active {
  transform: translateX(0);
  transition: all 300ms ease-in-out;
}

h2 {
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

input {
  padding: 0.25rem 0.5rem;
}

.btn-color {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  margin-bottom: 0.5rem;
  width: 90px;
}

.btn-clear {
  border: none;
  background-color: transparent;
}
</style>
