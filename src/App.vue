<template>
  <div id="app">
    <h3 v-show="loading">Loading ....</h3>
    <h3 v-show="!loading && codeText == null">Error while fetching data</h3>
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
    };
  },
  methods: {
    fetchCode(url) {
      this.loading = true;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            logger.warn('Response code != 2xx from server', response);
            return Promise.reject(response);
          }
          return response.text();
        })
        .then((codeText) => {
          this.codeText = codeText;
          this.loading = false;
          logger.debug('Fetched code string from server');
        })
        .catch((error) => {
          this.loading = false;
          logger.error('Error while fetching code string from server', error);
        });
    },
  },
  mounted() {
    this.fetchCode('/code/jquery.js');
  },
};
</script>

<style>
  body {
    /*background-color: black;*/
  }
#app {
}
</style>
