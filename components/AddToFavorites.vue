<template>
  <div
    :class="['HeartAnimation', { animate: $store.state.favorited }]"
    title="Add this color to your favorites"
    @click="handleFavorite"
  ></div>
</template>

<script>
export default {
  methods: {
    handleFavorite() {
      this.$store.commit('addToFavorites', this.$store.state.color)
    },
  },
}
</script>

<style>
.HeartAnimation {
  padding-top: 2em;
  background-repeat: no-repeat;
  background-size: 2900%;
  background-position: left;
  height: 50px;
  width: 50px;
  margin: 0 auto;
  cursor: pointer;
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/66955/web_heart_animation.png');
}

.animate {
  animation: heart-burst 0.8s steps(28) forwards;
}

@keyframes heart-burst {
  0% {
    background-position: left;
  }
  100% {
    background-position: right;
  }
}
</style>
