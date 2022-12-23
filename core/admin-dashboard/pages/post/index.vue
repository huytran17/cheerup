<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-3 text-center cyan--text">
          <span class="app-title" v-html="$t('Posts Data')"></span>
        </div>

        <div class="d-flex justify-center">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="primary"
                icon
                @click="$router.push(localePath('/post/new'))"
              >
                <v-icon>mdi-note-plus-outline</v-icon>
              </v-btn>
            </template>
            <span v-html="$t('Create a new post')"></span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BasePostTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BasePostTable from "@/components/post/widget/BasePostTable";
export default {
  name: "PostIndex",
  components: { BasePostTable },
};
</script>
