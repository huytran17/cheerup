<template>
  <v-dialog :value="is_open" width="500" persistent>
    <div
      class="d-flex flex-column white soft-box-shadow rounded-lg py-4 px-3 position-relative"
    >
      <v-btn
        icon
        class="close-dialog-btn"
        @click="$emit('close-hard-delete-category')"
      >
        <v-icon color="black">mdi-close</v-icon>
      </v-btn>
      <div class="d-flex justify-center pt-5">
        <v-icon color="warning">mdi-alert</v-icon>
      </div>
      <div class="text-body-1 text-center pt-3 error--text">
        <span
          class="app-body"
          v-html="
            $t(`Do you want to delete category {category_title} forever?`, {
              category_title: category.title,
            })
          "
        ></span>
      </div>
      <div class="text-body-2 text-center error--text font-weight-bold">
        <span
          class="app-body"
          v-html="$t(`This action can not be restore.`)"
        ></span>
      </div>
      <div class="d-flex justify-center mt-4">
        <v-btn
          depressed
          color="primary"
          text
          @click="$emit('close-hard-delete-category')"
        >
          <span v-html="$t('Cancel')"></span>
        </v-btn>
        <v-btn
          depressed
          color="error"
          text
          @click="$emit('hard-delete-category')"
        >
          <span v-html="$t('Confirm')"></span>
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import categoryMixins from "@/mixins/category";

export default {
  name: "BaseHardDeleteCategoryDialog",
  mixins: [categoryMixins],
  props: {
    is_open: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
};
</script>

<style scoped>
.close-dialog-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
