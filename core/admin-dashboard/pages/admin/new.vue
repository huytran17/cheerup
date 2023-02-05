<template>
  <div>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-3 text-center cyan--text">
          <span class="app-title" v-html="$t('Create New Admin')"></span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseCreateAdmin />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BaseCreateAdmin from "@/components/admin/widget/BaseCreateAdmin";
export default {
  name: "CreateNewAdminIndex",
  components: {
    BaseCreateAdmin,
  },
};
</script>
