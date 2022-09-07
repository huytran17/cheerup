<template>
  <v-app>
    <v-main>
      <v-container>
        <BaseAppBar/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import systemMixins from "@/mixins/system";
import BaseAppBar from "@/components/BaseAppBar";

export default {
  name: "DefaultLayout",
  mixins: [systemMixins],
  components: {
    BaseAppBar,
  },
};
</script>

<style scoped>
.search-results {
  top: 0%;
  left: 0%;
}
</style>
