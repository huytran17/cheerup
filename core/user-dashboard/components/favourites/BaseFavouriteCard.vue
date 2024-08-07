<template>
  <div v-if="has_bookmark_data" class="d-flex flex-column flex-sm-row gap-10">
    <div v-if="post_thumbnail_url" class="d-flex">
      <v-img
        :src="post_thumbnail_url"
        :lazy-src="post_thumbnail_url"
        :alt="post_title"
        cover
        :max-width="is_mobile ? '100%' : '250px'"
        :max-height="is_mobile ? '300px' : '143.77px'"
      ></v-img>
    </div>
    <div class="d-flex flex-column px-0 w-100">
      <div v-if="has_categories" class="d-flex justify-space-between">
        <div>
          <v-chip
            v-for="(category, index) in post_categories"
            :key="index"
            class="mr-1 mt-0 clickable"
            :color="category.badge_color"
            label
            text-color="white"
            small
            @click="$router.push(localePath(`/category/${category.slug}`))"
          >
            {{ category.title }}
          </v-chip>
        </div>
      </div>

      <div class="text-body-2 text-sm-body-1 text-uppercase pt-2 pb-1">
        <span
          class="position-relative clickable"
          @click="$router.push(localePath(`/post/${post_slug}`))"
          >{{ post_title }}</span
        >
      </div>
      <div class="text-uppercase brick--text text-body-3 text-sm-body-2">
        <span>{{ formatDate(post_created_at, "LL") }}</span>
        <span>/</span>
        <span>{{ post_author_name }}</span>
        <span>/</span>
        <span>{{ reading_time }}</span>
      </div>
      <div class="text-left">
        <div class="text-caption brick--text text-uppercase">
          {{
            $tc(`{count} Comment`, post_comments_count, {
              count: post_comments_count,
            })
          }}
        </div>
      </div>
      <div
        class="post__description text__content matte__black--text"
        v-line-clamp="2"
      >
        <span class="text--ellipsis" v-html="$t(post_description)"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { get, isEmpty, isNil } from "lodash";
import systemMixins from "@/mixins/system";
import postBookmarkMixins from "@/mixins/post-bookmark";

export default {
  name: "BaseFavouriteCard",
  mixins: [systemMixins, postBookmarkMixins],
  props: {
    bookmark_data: {
      type: Object,
      default: () => null,
    },
  },

  computed: {
    reading_time() {
      return get(this.bookmark_data, "reading_time.text");
    },

    has_bookmark_data() {
      return !isEmpty(this.bookmark_data) && !isNil(this.bookmark_data);
    },

    post_thumbnail_url() {
      return get(this.bookmark_data, "post.thumbnail_url");
    },

    post_title() {
      return get(this.bookmark_data, "post.title");
    },

    post_comments_count() {
      return get(this.bookmark_data, "comments_count");
    },

    post_description() {
      return get(this.bookmark_data, "post.description");
    },

    post_created_at() {
      return get(this.bookmark_data, "post.created_at");
    },

    post_author_name() {
      return get(this.bookmark_data, "post.author.full_name");
    },

    post_id() {
      return get(this.bookmark_data, "post._id");
    },

    post_slug() {
      return get(this.bookmark_data, "post.slug");
    },

    post_categories() {
      return get(this.bookmark_data, "post.categories", []) || [];
    },

    has_categories() {
      return !isEmpty(this.post_categories) && !isNil(this.post_categories);
    },
  },
};
</script>

<style scoped>
.v-chip--label {
  border-radius: 0 !important;
}
</style>
