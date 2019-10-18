<template>
  <div id="app">
    <LayOut>
      <template>
        <router-view></router-view>
      </template>
    </LayOut>
  </div>
</template>
<script>
import LayOut from "@components/layout";
export default {
  name:"App",
  components:{
    LayOut
  },
  
}
</script>

