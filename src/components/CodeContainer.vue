<template>
    <code v-show="!loading" id="codebox" ref="code" class="language-javascript">
        {{codeText}}
    </code>
</template>

<script>
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

const logger = console;


export default {
  name: 'CodeContainer',
  props: {
    codeText: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    // codeTextSection() {
    // TODO
    // Depending on screen width and height:
    // Choose random part of code string to fill up screen
    // },
  },
  watcher: {
    codeText() {
      logger.debug('codeText changed');
      this.highlight();
    },
  },
  methods: {
    highlight() {
      logger.debug('Prism highlight start');
      Prism.highlightElement(this.$refs.code, false, () => {
        logger.debug('Prism highlight done');
        this.loading = false;
      });
    },
  },
  mounted() {
    this.highlight();
  },
};
</script>

<style scoped>
code {
    text-align: justify;
    word-break: break-all;
    line-height: 0;
}
</style>
