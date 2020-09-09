<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar{
    display: flex;
    background-color: #f6f6f6;

    position: fixed;  /*置于下方*/
    bottom: 0;
    left: 0;
    right: 0;

    box-shadow: 0 -2px 1px rgba(100,100,100,0.12);  /*过渡阴影*/
  }
</style>