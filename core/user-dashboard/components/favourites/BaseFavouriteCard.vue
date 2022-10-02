<template>
  <div v-if="has_bookmark_data" class="d-flex flex-column flex-sm-row">
    <div class="d-flex">
      <v-img
        :src="post_thumbnail_url"
        :lazy-src="post_thumbnail_url"
        :alt="post_title"
        cover
        :max-width="is_mobile ? '100%' : '250px'"
        :max-height="is_mobile ? '300px' : '138px'"
      ></v-img>
    </div>
    <div class="d-flex flex-column px-0 px-sm-3 w-100">
      <div
        v-if="has_categories"
        class="d-flex justify-space-between pt-4 pt-sm-0"
      >
        <div>
          <v-chip
            v-for="(category, index) in post_categories"
            :key="index"
            class="mr-1 mt-0 clickable"
            :color="category.badge_color"
            label
            text-color="white"
            small
            @click="$router.push(localePath(`/category/${category._id}`))"
          >
            <span v-html="$t(category.title)"></span>
          </v-chip>
        </div>
        <div>
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="brick"
                class="clickable"
                @click="deletePostToBookmark"
                v-bind="attrs"
                v-on="on"
              >
                {{ is_bookmarked ? "mdi-heart" : "mdi-heart-outline" }}</v-icon
              >
            </template>
            <div class="text-body-2 d-flex flex-column justify-center">
              <span class="app-body" v-html="$t('Add to favourite')"></span>
            </div>
          </v-tooltip>
        </div>
      </div>

      <div class="text-body-2 text-sm-body-1 text-uppercase pt-2 pb-1">
        <span
          class="app-body post__title position-relative clickable"
          v-html="$t(post_title)"
          @click="$router.push(localePath(`/post/${post_id}`))"
        ></span>
      </div>
      <div
        class="text-uppercase grey--text"
        :class="is_mobile ? 'text--small' : 'text-body-3'"
      >
        <span class="app-body">{{ formatDate(post_created_at, "LL") }}</span>
        <span>/</span>
        <span class="app-body">{{ post_author_name }}</span>
      </div>
      <div class="text-left">
        <div class="text-caption grey--text text-uppercase">
          <span
            class="app-body"
            v-html="
              $tc(`{count} Comment`, post_comments_count, {
                count: post_comments_count,
              })
            "
          ></span>
        </div>
      </div>
      <div class="text__description matte__black--text" v-line-clamp="2">
        <span class="app-body no-margin" v-html="$t(post_description)"></span>
      </div>
    </div>
  </div>
</template>

<script>
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

  data() {
    return {
      is_bookmarked: true,
    };
  },

  computed: {
    has_bookmark_data() {
      return !_.isEmpty(this.bookmark_data) && !_.isNil(this.bookmark_data);
    },

    post_thumbnail_url() {
      return _.get(this.bookmark_data, "post.thumbnail_url");
    },

    post_title() {
      return _.get(this.bookmark_data, "post.title");
    },

    post_comments_count() {
      return _.get(this.bookmark_data, "post.comments_count");
    },

    post_description() {
      return _.get(this.bookmark_data, "post.description");
    },

    post_created_at() {
      return _.get(this.bookmark_data, "post.created_at");
    },

    post_author_name() {
      return _.get(this.bookmark_data, "post.author.full_name");
    },

    post_id() {
      return _.get(this.bookmark_data, "post._id");
    },

    post_categories() {
      return _.get(this.bookmark_data, "post.categories", []) || [];
    },

    has_categories() {
      return !_.isEmpty(this.post_categories) && !_.isNil(this.post_categories);
    },
  },

  methods: {
    async deletePostToBookmark() {
      try {
        const post_bookmark_data = {
          post: this.post_id,
        };

        await this.CREATE_OR_DELETE_POST_BOOKMARK({ data: post_bookmark_data });

        this.is_bookmarked = !this.is_bookmarked;

        const updated_post_bookmarks = this.post_bookmarks.filter(
          (post_bookmark) => _.get(post_bookmark, "post._id") !== this.post_id
        );

        this.SET_POST_BOOKMARKS({
          data: updated_post_bookmarks,
          new_state: true,
        });

        await this.COUNT_POST_BOOKMARKS();
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    const no_margin_wrapper = document.getElementsByClassName("no-margin");
    for (let i = 0; i < no_margin_wrapper.length; i++) {
      const element = no_margin_wrapper[i];
      const child_el = element.querySelector("p");
      child_el.style.margin = 0;
    }
  },
};
</script>

<style scoped>
:deep(.v-chip--label) {
  border-radius: 0 !important;
}
</style>