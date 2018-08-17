<template>
  <div id="app">
    <div style="display: flex; justify-content: center; align-items: center; color: white" >
    <h3 v-show="loading">Loading ....</h3>
    <h3 v-show="!loading && codeText == null">
      An error occured while loading the page content. Check the console for details.
    </h3>
    </div>
    <CodeContainer v-if="codeText" :code-text="codeText"></CodeContainer>
  </div>
</template>

<script>
import CodeContainer from './components/CodeContainer.vue';

const logger = console;

export default {
  name: 'app',
  components: {
    CodeContainer,
  },
  data() {
    return {
      codeText: null,
      loading: false,
      codeFiles: [
        'jquery.txt',
        'vue.txt',
        'react.txt',
      ],
    };
  },
  methods: {
    getRandomInt(min, max) {
      return Math.floor(Math.random() * ((max - min) + 1)) + min;
    },
  },
  mounted() {
    // Pick a random file to load from array of file names
    const fileName = this.codeFiles[this.getRandomInt(0, this.codeFiles.length - 1)];
    this.loading = true;

    // Lazy load import (will do network fetch)
    import(`raw-loader!@/assets/code/${fileName}`)
      .then((code) => {
        console.debug('Loaded code', code);
        this.codeText = code.default;
        this.loading = false;
      })
      .catch((error) => {
        logger.error('Error while fetching code string from server', error);
        this.loading = false;
      });
  },
};
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    background-color: #2d2d2d; /* FIXME: This should happen in CodeContainer */
    overflow-y: hidden;
  }
#app {
}
</style>
