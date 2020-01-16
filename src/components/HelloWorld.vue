<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ strOrNum }}</h1>
    <p>{{ userName }}</p>
    <p>{{ foo }}</p>
    <h2 @click="show = !show">切换</h2>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript" target="_blank" rel="noopener">typescript</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa" target="_blank" rel="noopener">pwa</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener">router</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-mocha" target="_blank" rel="noopener">unit-mocha</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-nightwatch" target="_blank" rel="noopener">e2e-nightwatch</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
    <input
      type="text"
      v-model="inputVal"
      @keyup.enter="onKeyUp"
    >
      {{ foodList }}
      {{ foodListStr }}
    <p>{{ show }}</p>
  </div>
</template>

<script lang="ts">
/// <reference path="../shims-store.d.ts" />
import { Component, Prop, Vue, PropSync, Watch } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import { FoodAction } from '@/store/modules/food';

@Component
export default class HelloWorld extends Vue {
  @State('user') userName!: string;
  @State foo!: string;
  @State((state: StoreLib.State) => state.food.list) foodList!: string[];
  @Action('SET_LIST') setFoodList!: FoodAction['SET_LIST'];
  // @Getter('foodList') foodListStr!: string;
  @Getter foodListStr!: string;

  inputVal: string = 'orange';

  @Prop() private msg!: string;
  @Prop() private strOrNum!: string | number;
  // 等于：
  // props: {
  //   msg: {
  //     type: String
  //   },
  //   strOrNum: {
  //     type: [String, Number]
  //   }
  // }
  @PropSync('value', { type: Boolean }) private show!: boolean;
  // PropSync 等于：
  // props: {
  //   value: {
  //     type: Boolean
  //   }
  // },
  // computed: {
  //   show: {
  //     get() {
  //       return this.value
  //     },
  //     set(value) {
  //       this.$emit('update:value', value)
  //     }
  //   }
  // }

  privateMethod() {
    console.log('privateMethod');
  }

  publicMethod() {
    console.log('publicMethod');
  }

  onKeyUp() {
    this.setFoodList([...this.foodList, this.inputVal]);
    this.inputVal = '';
  }

  @Watch('inputVal', { immediate: true })
  inputHandler(val: string): void {
    this.show = !!(val.length % 2);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
