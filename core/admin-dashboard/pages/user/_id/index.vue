<template>
  <div>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-3 text-center cyan--text">
          <span class="app-title" v-html="$t('Update User')"></span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseUpdateUser />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BaseUpdateUser from "@/components/user/widget/BaseUpdateUser";
export default {
  name: "CreateNewUserIndex",
  components: {
    BaseUpdateUser,
  },
};
</script>
