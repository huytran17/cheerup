<template>
  <BaseStatisticCard>
    <v-row>
      <v-col cols="12">
        <div class="text-body-1 text-sm-h6">
          <span class="app-title">{{ $t("Author Statistics") }}</span>
        </div>
      </v-col>
      <v-col cols="12">
        <v-btn-toggle
          v-model="admin_type"
          mandatory
          dense
          borderless
          color="primary"
        >
          <v-btn
            @click="
              refreshAdminAnalysticData({ author_type: ADMIN_TYPES.OWNER })
            "
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" color="brick"
                  >mdi-account-star</v-icon
                >
              </template>
              {{ $t(ADMIN_TYPES.OWNER) }}
            </v-tooltip>
          </v-btn>
          <v-btn
            @click="
              refreshAdminAnalysticData({
                author_type: ADMIN_TYPES.COLLABORATOR,
              })
            "
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" color="brick"
                  >mdi-account-check</v-icon
                >
              </template>
              {{ $t(ADMIN_TYPES.COLLABORATOR) }}
            </v-tooltip>
          </v-btn>
          <v-btn
            @click="
              refreshAdminAnalysticData({
                author_type: ADMIN_TYPES.EDITOR,
              })
            "
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" color="brick"
                  >mdi-account-details-outline</v-icon
                >
              </template>
              {{ $t(ADMIN_TYPES.EDITOR) }}
            </v-tooltip>
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="12">
        <BaseAdminAnalysisChart
          :options="admin_chart.options"
          :series="admin_chart.series"
        />
      </v-col>
    </v-row>
  </BaseStatisticCard>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import chartMixins from "~/mixins/apex-chart";
import { ADMIN_TYPES } from "@/constants";
import BaseStatisticCard from "@/components/dashboard/BaseStatisticCard";
import BaseAdminAnalysisChart from "@/components/dashboard/BaseAdminAnalysisChart";
export default {
  name: "BaseStatisticAdmin",
  mixins: [chartMixins],
  components: {
    BaseStatisticCard,
    BaseAdminAnalysisChart,
  },
  data() {
    return {
      admin_type: ADMIN_TYPES.OWNER,
      ADMIN_TYPES,
    };
  },
  computed: {
    ...mapGetters({
      analysis: "analysis",
    }),
  },
  methods: {
    ...mapActions({
      GET_ADMIN_ANALYTICS: "admin/GET_ADMIN_ANALYTICS",
    }),

    ...mapMutations({
      UPDATE_ANALYSIS_DATA: "UPDATE_ANALYSIS_DATA",
    }),

    async refreshAdminAnalysticData({ author_type }) {
      try {
        this.UPDATE_ANALYSIS_DATA({ path: "author_type", data: author_type });

        await this.GET_ADMIN_ANALYTICS({ ...this.analysis });
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
