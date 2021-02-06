<template>
  <div class="container">
    <color-picker
      class="color-wheel"
      :start-color="$store.state.color"
      @color-change="handleColor"
    ></color-picker>
    <button
      class="btn"
      :style="'background-color:' + buttonBackground"
      @click="handleStick"
    >
      Update Stick
    </button>
    <AddToFavorites />
    <div class="color-values">
      <p>HEX: {{ $store.state.color }}</p>
      <p>RGB: {{ hexToRgb($store.state.color) }}</p>
      <div v-if="$store.state.splitStick">
        <p class="dflex">
          Color 1:
          <span
            class="color-square"
            :style="'background-color:' + $store.state.color"
          ></span>
        </p>
        <p class="dflex">
          Color 2:
          <span
            class="color-square"
            :style="'background-color:' + $store.state.color2"
          ></span>
        </p>
      </div>
    </div>
    <button
      :class="['menu', { opened: $store.state.menu }]"
      @click="handleMenu"
    >
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path
          class="line line1"
          d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
        />
        <path class="line line2" d="M 20,50 H 80" />
        <path
          class="line line3"
          d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
        />
      </svg>
    </button>
    <Menu />
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import { mapMutations } from 'vuex';
import ColorPicker from 'vue-color-picker-wheel';
import AddToFavorites from '../components/AddToFavorites';
import Menu from '../components/Menu';

export default {
  components: {
    ColorPicker,
    AddToFavorites,
    Menu,
  },
  data() {
    return {
      color: this.$store.state.color,
    }
  },
  methods: {
    handleColor(curretColor) {
      console.log('handleColor', curretColor)
      if (this.$store.state.setSecondColor) {
        this.$store.commit('update2', curretColor)
      } else {
        this.$store.commit('update', curretColor)
      }
    },
    handleMenu(menu) {
      this.$store.commit('toggleMenu', menu)
    },
    hexToRgb(hex) {
      return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))
    },
    handleStick() {
      const rgb = this.hexToRgb(this.$store.state.color);
      const rgb2 = this.hexToRgb(this.$store.state.color2);
      let route = `http://${this.$store.state.ip}/?r=${rgb[0]}&g=${rgb[1]}&b=${rgb[2]}`

      if (this.$store.state.splitStick) {
        route = `http://${this.$store.state.ip}/?r=${rgb[0]}&g=${rgb[1]}&b=${rgb[2]}&r2=${rgb2[0]}&g2=${rgb2[1]}&b2=${rgb2[2]}&split=1`
      }

      if (this.$store.state.color === '#ffffff') {
        route = `http://${this.$store.state.ip}/?w=1`
      }

      console.log(route)

      axios
        .get(route)
        .then(function (response) {
          // handle success
          console.log(response)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
  },
  computed: {
    buttonBackground() {
      return this.$store.state.splitStick && this.$store.state.setSecondColor ? this.$store.state.color2 : this.$store.state.color
    },
  },
  mounted() {
    this.$store.commit('updateColorFromLocalStorage')
    this.$store.commit('updateFavoritesFromLocalStorage')
    this.$store.commit('isAlreadyFavorited', this.$store.state.color)
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  /* min-height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding-bottom: 7rem;
}

.dflex {
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

.btn {
  margin-top: 1rem;
  padding: 1rem 3rem;
  text-transform: uppercase;
  font-weight: 600;
  border: 1px solid #ddd;
}

.btn:focus {
  border: 1px solid #aaa;
}

.color-wheel {
  margin-top: 2rem;
}

.color-values {
  margin-bottom: 2rem;
}

.color-square {
  display: inline-block;
  height: 2rem;
  width: 2rem;
  margin-left: 1rem;
}

.menu {
  position: fixed;
  right: -1rem;
  bottom: -1rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 0;
  transform: scale(0.5);
  z-index: 300;
}
.line {
  fill: none;
  stroke: black;
  stroke-width: 6;
  transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
}
.line1 {
  stroke-dasharray: 60 207;
  stroke-width: 6;
}
.line2 {
  stroke-dasharray: 60 60;
  stroke-width: 6;
}
.line3 {
  stroke-dasharray: 60 207;
  stroke-width: 6;
}
.opened .line1 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
  stroke-width: 6;
}
.opened .line2 {
  stroke-dasharray: 1 60;
  stroke-dashoffset: -30;
  stroke-width: 6;
}
.opened .line3 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
  stroke-width: 6;
}
</style>
