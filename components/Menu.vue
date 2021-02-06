<template>
  <aside :class="[{ active: $store.state.menu }]">
    <h1 class="title">pau<span class="led">LED</span>o</h1>
    <h2>Settings</h2>
    <!-- <label for="ip">IP: </label>
    <input id="ip" name="ip" type="text" :value="$store.state.ip" /> -->
    <p>Split Stick</p>
    <label class="switch">
      <input
        type="checkbox"
        :checked="$store.state.splitStick"
        @click="$store.commit('splitStick')"
      />
      <span class="slider round"></span>
    </label>
    <div v-if="$store.state.splitStick">
      <p>Set Second Color</p>
      <label class="switch">
        <input
          type="checkbox"
          :checked="$store.state.setSecondColor"
          @click="$store.commit('setSecondColor')"
        />
        <span class="slider round"></span>
      </label>
    </div>
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
      if (this.$store.state.setSecondColor) {
        this.$store.commit('update2', curretColor)
      } else {
        this.$store.commit('update', curretColor)
      }
    },
    handleSetSecondColor() {
      this.$store.commit('setSecondColor')
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

.led {
  background-color: black;
  background-image: linear-gradient(90deg, #1de0fb, #f27dc9);
  background-size: 100%;
  background-repeat: repeat;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
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

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin: 0.5rem auto 1rem;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #40f4cb;
}

input:focus + .slider {
  box-shadow: 0 0 1px #40f4cb;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
