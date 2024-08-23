import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      system_configuration: "system-configuration/system_configuration",
    }),
  },
  methods: {
    ...mapActions({
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

    updateSystemConfigurationObject({ path, data }) {
      this.UPDATE_SYSTEM_CONFIGURATION_DATA({ path, data });
    },
  },
};
