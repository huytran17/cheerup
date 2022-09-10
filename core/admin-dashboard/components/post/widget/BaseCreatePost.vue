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
                updatePostObject({ variable_path: 'title', data: $event })
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
              :content="post"
              attr="content"
              @on-input="
                updatePostObject({ variable_path: 'description', data: $event })
              "
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="text-body-2 mb-2">
              <span class="app-body">
                <span v-html="$t('Content')"></span>
              </span>
            </div>
            <TiptapEditor
              :content="post"
              attr="content"
              @on-input="
                updatePostObject({ variable_path: 'content', data: $event })
              "
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-autocomplete
              :items="categories"
              chips
              small-chips
              item-text="title"
              item-value="_id"
              :label="$t('Category')"
              multiple
              :rules="categoriesRules"
              @input="
                updatePostObject({ variable_path: 'categories', data: $event })
              "
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              class="source-input"
              :label="$t('Source')"
              clearable
              @input="
                updatePostObject({ variable_path: 'source', data: $event })
              "
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-combobox
              :label="$t('Tags')"
              multiple
              small-chips
              @input="updatePostObject({ variable_path: 'tags', data: $event })"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-switch
              :label="$t('Block Comment')"
              @change="
                updatePostObject({
                  variable_path: 'is_blocked_comment',
                  data: $event,
                })
              "
              :false-value="false"
              :true-value="true"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn
              depressed
              color="primary"
              :disabled="!form_valid"
              @click="createPost"
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
import postMixins from "@/mixins/post";
import categoryMixins from "@/mixins/category";

import TiptapEditor from "@/components/TiptapEditor";

export default {
  name: "BaseCreatePost",
  mixins: [postMixins, categoryMixins],
  components: {
    TiptapEditor,
  },
  data() {
    return {
      form_valid: false,
    };
  },
  methods: {
    async createPost() {
      try {
        const created_post = await this.CREATE_POST({
          data: this.post,
        });
        this.SET_POST({ data: created_post });
        this.$toast.success("Created post successfully");
        this.$router.push(this.localePath(`/post/${created_post._id}`));
      } catch (err) {
        console.error(err);
        this.$toast.error("Encountered error while updating post");
      }
    },
  },
  async fetch() {
    try {
      await this.GET_CATEGORIES();
      this.SET_POST({ data: {} });
    } catch (err) {
      console.error(err);
      this.$toast.error("Encountered error while updating post");
    }
  },
};
</script>

<style scoped>
.source-input {
  padding-top: 8.5px !important;
}
</style>
