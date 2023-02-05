<template>
  <div class="d-flex mx-3">
    <v-text-field
      single-line
      outlined
      dense
      type="number"
      hide-details
      :min="1"
      :value="analysis.distance"
      @input="updateAnalysisDistance"
    ></v-text-field>
    <v-btn-toggle
      :value="mapped_analysis_unit"
      color="primary"
      dense
      group
      @change="updateAnalysisUnit"
    >
      <v-btn v-for="(button, index) in buttons" :key="index">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on" class="text-body-2">
              <span class="app-title" v-html="$t(button.text)"></span>
            </div>
          </template>
          <div class="text-body-2">
            <span class="app-body" v-html="$t(button.full_text)"></span>
          </div>
        </v-tooltip>
      </v-btn>
    </v-btn-toggle>
    <div class="d-flex flex-column justify-center">
      <v-btn color="primary" tile depressed @click="refreshAnalysisData">
        <v-icon>mdi-google-analytics</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "BaseAnalysisToggler",
  props: {
    buttons: {
      type: Array,
      default: () => [
        {
          text: "D",
          full_text: "day",
          value: 0,
        },
        {
          text: "M",
          full_text: "month",
          value: 1,
        },
        {
          text: "Y",
          full_text: "year",
          value: 2,
        },
      ],
    },
  },
  computed: {
    ...mapGetters({
      analysis: "analysis",
    }),

    mapped_analysis_unit() {
      return (
        this.buttons.find((button) => button.full_text === this.analysis.unit)
          ?.value || 0
      );
    },
  },
  methods: {
    ...mapMutations({
      UPDATE_ANALYSIS_DATA: "UPDATE_ANALYSIS_DATA",
    }),

    updateAnalysisUnit(selected) {
      const chosen_unit = this.buttons.find(
        (button) => button.value === selected
      )?.full_text;

      this.UPDATE_ANALYSIS_DATA({ data: chosen_unit, variable_path: "unit" });
    },

    updateAnalysisDistance(value) {
      if (value <= 0) {
        return;
      }

      this.UPDATE_ANALYSIS_DATA({ data: value, variable_path: "distance" });
    },

    refreshAnalysisData() {
      this.$emit("refresh");
    },
  },
};
</script>

<style scoped>
:deep(.v-text-field) {
  max-width: 70px !important;
}
</style>
