<template>
    <code v-show="!loading" ref="code" class="language-javascript">
        {{codeTextSection}}
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
      height: null,
      width: null,
      fontSize: null,
    };
  },
  computed: {
    codeTextSection() {
    /* TODO
    Depending on codebox width and height:
    Choose random part of code string to fill up box
    Make sure this is called on window resize and on codeText change
    */

      logger.group('code trimming params');
      logger.debug('height', this.height);
      logger.debug('width', this.width);
      logger.debug('fontSize', this.fontSize);
      logger.groupEnd();

      // TODO: Trim string and return
      return this.codeText;
    },
  },
  watcher: {
    codeTextSelection() {
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
    calculateCodeDimensions() {
      // Store width and height of code box
      this.height = this.$refs.code.clientHeight; // FIXME: is 0
      this.width = this.$refs.code.clientWidth; // FIXME: is 0
      logger.debug('codebox dimensions changed', this.height, this.width);
    },
  },
  mounted() {
    window.addEventListener('resize', this.calculateCodeDimensions);
    this.calculateCodeDimensions();

    // Store font size of text in code box (computed by browser)
    const style = window.getComputedStyle(this.$refs.code, null).getPropertyValue('font-size');
    this.fontSize = parseFloat(style);

    // Highlight code
    this.highlight();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateCodeDimensions);
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
