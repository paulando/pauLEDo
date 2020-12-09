<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">pauLEDo</h1>
      <p>Choose color:</p>
      <div>
        <button @click="handleColor('red')">Red</button>
        <button @click="handleColor('green')">Green</button>
        <button @click="handleColor('blue')">Blue</button>
        <button @click="handleColor('')">White</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
  methods: {
    handleColor(color) {
        axios
      .get("192.168.4.1/"+color)
      .then(function (response) {
        // handle success
        console.log(response)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
    }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
