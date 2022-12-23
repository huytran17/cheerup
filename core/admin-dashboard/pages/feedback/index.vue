<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-3 text-center cyan--text">
          <span class="app-title" v-html="$t('Feedbacks Data')"></span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseFeedbackTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BaseFeedbackTable from "@/components/feedback/widget/BaseFeedbackTable";
export default {
  name: "FeedbackIndex",
  components: { BaseFeedbackTable },
};
</script>
