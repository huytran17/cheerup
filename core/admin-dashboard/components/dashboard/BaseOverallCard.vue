<template>
  <div
    class="w-100 h-100 card-box-shadow rounded-lg white d-flex flex-column pa-4 justify-space-between"
  >
    <div class="d-flex justify-space-between">
      <div class="blue lighten-4 w-fit-content pa-1 rounded-lg">
        <v-icon color="pink darken-1">{{ data.icon }}</v-icon>
      </div>
    </div>
    <div class="d-flex flex-column py-2">
      <div class="text-body-1 primary--text">
        <span class="app-title" v-html="$t(data.text)"></span>
      </div>
      <div class="text-h6 text-sm-h5">
        <span class="app-title">{{ data.total }}</span>
      </div>
    </div>
    <div class="d-flex flex-column">
      <div class="text-body-1 green--text">
        <span
          class="app-title"
          v-html="
            $tc(`+{count} per ${analysis.unit}`, data.average || 0, {
              count: data.average || 0,
            })
          "
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import systemMixins from "@/mixins/system";

export default {
  name: "BaseOverallCard",
  mixins: [systemMixins],
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      options: [{ text: "Refresh" }],
    };
  },
  computed: {
    ...mapGetters({
      analysis: "analysis",
    }),
  },
};
</script>
