<template>
  <v-dialog
    :value="is_open"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          <span v-html="$t('Preview')"></span>
        </v-toolbar-title>
      </v-toolbar>

      <v-container>
        <v-col cols="12" md="8" class="mx-auto">
          <div class="d-flex flex-column">
            <div v-if="has_categories" class="d-flex justify-center">
              <v-chip
                v-for="(category, index) in post.categories"
                :key="`category-${index}`"
                class="ma-1 clickable app-body"
                color="#42A5F5"
                label
                text-color="white"
                small
              >
                <span v-if="category.title" v-html="$t(category.title)"></span>
                <span
                  v-else
                  v-html="
                    $t('Category {count}', index + 1, { count: index + 1 })
                  "
                ></span>
              </v-chip>
            </div>

            <div
              class="text-h6 text-sm-h4 text-uppercase text-center pt-2 pb-4"
            >
              <span
                class="app-body position-relative"
                v-html="$t(post.title)"
              ></span>
            </div>

            <div class="text-uppercase grey--text text-center text__content">
              <span class="app-body">{{
                formatDate(post.created_at, "LL")
              }}</span>
              <span>/</span>
              <span class="app-body">{{ author_name }}</span>
              <span>/</span>
              <span class="app-body">{{ reading_time }}</span>
            </div>
          </div>

          <div class="d-flex justify-center pt-6 pb-3">
            <v-img
              :src="post.thumbnail_url"
              :lazy-src="post.thumbnail_url"
              :alt="post.title"
              cover
              max-height="400"
            ></v-img>
          </div>

          <div class="text__content matte__black--text font-italic">
            <span class="app-body" v-html="$t(post.description)"></span>
          </div>

          <div class="text__content matte__black--text">
            <span class="app-body" v-html="$t(post.content)"></span>
          </div>

          <div v-if="has_tags" class="text--small">
            <v-icon small color="black">mdi-tag</v-icon>
            <span class="app-body">
              <span class="text-uppercase" v-html="$t('Tags: ')"></span>
              <span v-for="(tag, index) in post.tags" :key="`tag-${index}`"
                ><v-chip
                  class="px-1 clickable white--text mr-1"
                  color="brick"
                  x-small
                >
                  {{ tag }}
                </v-chip></span
              >
            </span>
          </div>

          <div v-if="post.source" class="text-body-2 mt-2">
            <span class="app-body">
              <span v-html="$t('Source: ')"></span>
              <span class="post__source" v-html="post.source"></span>
            </span>
          </div>
        </v-col>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { get } from "lodash";
import systemMixins from "@/mixins/system";
import postMixins from "@/mixins/post";
import authMixins from "@/mixins/auth";
export default {
  name: "BasePreviewPostDialog",
  mixins: [authMixins, systemMixins, postMixins],
  props: {
    is_open: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  computed: {
    reading_time() {
      return "1 Min Read";
    },

    author_name() {
      return get(this.me, "full_name");
    },

    has_categories() {
      return this.post?.categories && this.post?.categories?.length;
    },

    has_tags() {
      return this.post?.tags?.length;
    },
  },
  methods: {
    close() {
      this.$emit("close-dialog");
    },
  },
};
</script>

<style scoped>
:deep(.v-chip--label) {
  border-radius: 0 !important;
}
:deep(.v-chip__content) {
  line-height: 0;
}
:deep(.post__source *) {
  display: inline;
  text-decoration: none;
}
</style>
