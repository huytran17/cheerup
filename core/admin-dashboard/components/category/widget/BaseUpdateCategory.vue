<template>
  <v-form v-model="form_valid">
    <v-row>
      <v-col cols="12" sm="12">
        <v-text-field
          :rules="titleRules"
          :value="category.title"
          :label="$t('Title')"
          @input="
            updateCategoryObject({ variable_path: 'title', data: $event })
          "
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea
          :label="$t('Description')"
          :value="category.description"
          @change="
            updateCategoryObject({
              variable_path: 'description',
              data: $event,
            })
          "
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex justify-end">
        <v-btn
          depressed
          color="primary"
          :disabled="!form_valid"
          @click="updateCategory"
        >
          <span v-html="$t('Update')"></span>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import categoryMixins from "@/mixins/category";

export default {
  name: "BaseUpdateCategory",
  mixins: [categoryMixins],
  data() {
    return {
      form_valid: false,
    };
  },
  methods: {
    async updateCategory() {
      const created_category = await this.CREATE_CATEGORY({
        data: this.category,
      });
      this.$router.push(this.localePath(`/category/${created_category._id}`));
    },
  },
};
</script>

<style></style>
