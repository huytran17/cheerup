<template>
  <div>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-3 text-center cyan--text">
          <span class="app-title" v-html="$t('Update Admin')"></span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseUpdateAdmin />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BaseUpdateAdmin from "@/components/admin/widget/BaseUpdateAdmin";
export default {
  name: "CreateNewAdminIndex",
  components: {
    BaseUpdateAdmin,
  },
  head() {
    return {
      title: this.$t("Update admin infomation"),
    };
  },
};
</script>
