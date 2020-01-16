<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="show = !show">
    <HelloWorld
      ref="HelloWorld"
      msg="Welcome to Your Vue.js App"
      :str-or-num="123"
      :value.sync="show"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  show: boolean = true;

  $refs!: {
    HelloWorld: any;
  };

  mounted() {
    this.$refs.HelloWorld.privateMethod();
    this.$refs.HelloWorld.publicMethod();
    this.$log('123');
  }
}
</script>
