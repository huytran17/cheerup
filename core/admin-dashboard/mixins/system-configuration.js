import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      titleRules: [(v) => !!v || this.$t("Title is required.")],
      ownerNameRules: [(v) => !!v || this.$t("Owner name is required.")],
      ownerDescriptionRules: [(v) => !!v || this.$t("Owner description is required.")],
      authorRules: [(v) => !!v || this.$t("Author is required.")],
      descriptionRules: [(v) => !!v || this.$t("Description is required.")],
    };
  },
  computed: {
    ...mapGetters({
      system_configuration: "system-configuration/system_configuration",
    }),
  },
  methods: {
    ...mapActions({
      GET_SYSTEM_CONFIGURATION: "system-configuration/GET_SYSTEM_CONFIGURATION",
      GET_LATEST_SYSTEM_CONFIGURATION:
        "system-configuration/GET_LATEST_SYSTEM_CONFIGURATION",
      UPDATE_SYSTEM_CONFIGURATION:
        "system-configuration/UPDATE_SYSTEM_CONFIGURATION",
    }),
    ...mapMutations({
      SET_SYSTEM_CONFIGURATION: "system-configuration/SET_SYSTEM_CONFIGURATION",
      UPDATE_SYSTEM_CONFIGURATION_DATA:
        "system-configuration/UPDATE_SYSTEM_CONFIGURATION_DATA",
    }),

    updateSystemConfigurationObject({ variable_path, data }) {
      this.UPDATE_SYSTEM_CONFIGURATION_DATA({
        variable_path,
        data,
      });
    },
  },
};
