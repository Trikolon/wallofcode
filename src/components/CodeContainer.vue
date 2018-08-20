<template>
    <prism
            :inline="true"
            language="javascript"
            :code="codeText">
    </prism>
</template>

<script>
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

import Prism from './Prism';

export default {
  name: 'CodeContainer',
  components: { Prism },
  props: {
    codeText: {
      required: true,
      type: String,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
code {
    text-align: justify;
    word-break: break-all;
    line-height: 0;
    padding: 0 !important;
}
</style>
