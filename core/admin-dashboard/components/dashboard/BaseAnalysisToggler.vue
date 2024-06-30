<template>
  <div class="d-flex flex-column">
    <div class="mr-2 d-flex flex-column justify-center mr-auto ml-3 mb-3">
      <BaseLanguageSwitcher />
    </div>
    <div class="d-flex mx-3 flex-column flex-sm-row analysis-toggler-wrapper">
      <div
        class="text-body-1 d-flex flex-column justify-center pr-4 primary--text"
      >
        <span class="app-body" v-html="$t('Statistical Cycle')"></span>
      </div>
      <v-menu
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date_range"
            v-bind="attrs"
            v-on="on"
            readonly
            hide-details
            clearable
            class="pt-0"
            :label="$t('Pick a range')"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date_range"
          :label="$t('Period')"
          flat
          range
          hide-details
        ></v-date-picker>
      </v-menu>
      <v-btn-toggle v-model="unit" color="primary" dense group mandatory>
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
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import BaseLanguageSwitcher from "@/components/BaseLanguageSwitcher";

export default {
  name: "BaseAnalysisToggler",
  components: {
    BaseLanguageSwitcher,
  },
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
  data() {
    return {
      date_range: [],
      unit: 1,
    };
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

    invalid_range() {
      return (
        !this.analysis.range ||
        !this.analysis.range.length ||
        this.analysis.range.length === 1
      );
    },
  },
  watch: {
    date_range: {
      deep: true,
      handler(data) {
        this.updateAnalysisRange(data);
      },
    },
  },
  methods: {
    ...mapMutations({
      UPDATE_ANALYSIS_DATA: "UPDATE_ANALYSIS_DATA",
    }),

    updateAnalysisUnit() {
      const chosen_unit = this.buttons.find(
        (button) => button.value === this.unit
      )?.full_text;

      this.UPDATE_ANALYSIS_DATA({ data: chosen_unit, variable_path: "unit" });
    },

    updateAnalysisRange(value) {
      this.UPDATE_ANALYSIS_DATA({ data: value, variable_path: "range" });
    },

    refreshAnalysisData() {
      if (this.invalid_range) {
        return;
      }

      this.updateAnalysisUnit();
      this.$emit("refresh");
    },
  },
  fetch() {
    this.date_range = this.analysis?.range || [];
  },
};
</script>

<style scoped lang="scss">
@include media-max-width(toRem(600)) {
  .analysis-toggler-wrapper {
    gap: toRem(12);
  }
}
</style>
