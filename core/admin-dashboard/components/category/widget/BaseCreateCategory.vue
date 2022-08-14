<template>
  <v-form v-model="form_valid">
    <v-row>
      <v-col cols="12" sm="12">
        <v-text-field
          :rules="titleRules"
          :label="$t('Title')"
          @input="
            updateCategoryObject({ variable_path: 'title', data: $event })
          "
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="text-body-2 mb-2">
          <span class="app-body">
            <span v-html="$t('Description')"></span>
          </span>
        </div>
        <TiptapEditor
          :content="category"
          attr="description"
          @on-input="
            updateCategoryObject({ variable_path: 'description', data: $event })
          "
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex justify-end">
        <v-btn
          depressed
          color="primary"
          :disabled="!form_valid"
          @click="createCategory"
        >
          <span v-html="$t('Create')"></span>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import categoryMixins from "@/mixins/category";

export default {
  name: "BaseCreateCategory",
  mixins: [categoryMixins],
  data() {
    return {
      form_valid: false,
    };
  },
  methods: {
    async createCategory() {
      try {
        const created_category = await this.CREATE_CATEGORY({
          data: this.category,
        });
        this.SET_CATEGORY({ data: created_category });
        this.$toast.success("Created category successfully");
        this.$router.push(this.localePath(`/category/${created_category._id}`));
      } catch (err) {
        console.error(err);
        this.$toast.error("Encountered error while creating category");
      }
    },
  },
};
</script>

<style></style>
