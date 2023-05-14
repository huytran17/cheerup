<template>
  <v-row>
    <v-col cols="12">
      <v-icon color="black" @click="$router.go(-1)"
        >mdi-keyboard-backspace</v-icon
      >
    </v-col>
    <v-col cols="12">
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
                updateCategoryObject({
                  variable_path: 'description',
                  data: $event,
                })
              "
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <div class="text-body-2 mb-2">
              <span class="app-body">
                <span v-html="$t('Badge Color')"></span>
              </span>
            </div>
            <v-color-picker
              show-swatches
              @input="
                ($event) =>
                  updateCategoryObject({
                    variable_path: 'badge_color',
                    data: getBadgeColor($event),
                  })
              "
            ></v-color-picker>
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
    </v-col>
  </v-row>
</template>

<script>
import { get, isObject } from "lodash";

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
    getBadgeColor(event) {
      let hex_color = event;
      isObject(event) && (hex_color = get(event, "hex"));

      return hex_color;
    },

    async createCategory() {
      try {
        const created_category = await this.CREATE_CATEGORY({
          data: this.category,
        });
        this.SET_CATEGORY({ data: created_category });
        this.$toast.success(this.$t("Created category successfully"));
        this.$router.push(this.localePath(`/category/${created_category._id}`));
      } catch (error) {
        console.error(error);
        this.$toast.error(this.$t("Encountered error while creating category"));
      }
    },
  },

  fetch() {
    this.SET_CATEGORY({ data: {} });
  },
};
</script>
