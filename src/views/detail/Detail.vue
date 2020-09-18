<template>
  <div id="detail">
    <detail-nav-bar/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  export default {
    name: "Detail",
    components: {
      DetailNavBar
    },
    data() {
      return {
        id: null
      }
    },
    created() {
      this.id = this.$route.params.id
    }
  }
</script>

<style scoped>

</style>
