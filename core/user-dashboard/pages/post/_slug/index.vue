<template>
  <div>
    <BasePostPanel />
    <div v-if="has_suggestion_posts" class="pt-12">
      <BaseSuggestionPosts />
    </div>
    <div class="pt-12">
      <BaseCommentPanel />
    </div>
  </div>
</template>

<script>
import { get, map } from "lodash";
import { mapGetters, mapActions } from "vuex";
import postMixins from "@/mixins/post";
import commentMixins from "@/mixins/comment";
import BasePostPanel from "@/components/post/BasePostPanel";
import BaseSuggestionPosts from "@/components/post/BaseSuggestionPosts";
import BaseCommentPanel from "@/components/comment/BaseCommentPanel";

export default {
  name: "PostPanel",
  head() {
    const seo_title = get(this.post, "seo.title");
    const seo_description = get(this.post, "seo.description");
    const seo_keywords = get(this.post, "seo.keywords");
    const seo_author = get(this.post, "seo.author");
    const seo_thumbnail = get(this.post, "thumbnail_url");

    return {
      title: seo_title,
      meta: [
        {
          hid: "author",
          name: "author",
          content: seo_author,
        },
        {
          hid: "description",
          name: "description",
          content: seo_description,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: seo_keywords,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: seo_title,
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "article",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `${process.env.BASE_URL}/post/${this.$route.params.slug}`,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: seo_description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: seo_thumbnail,
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: seo_title,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: seo_title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: seo_description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: seo_thumbnail,
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: seo_title,
        },
      ],
      link: [{ rel: "canonical", href: `${process.env.BASE_URL}/post` }],
    };
  },
  async asyncData({ store, params, redirect }) {
    try {
      const slug = params.slug;

      const invalidSlug = !slug || slug === "undefined" || slug === "null";
      if (invalidSlug) {
        return redirect("/404");
      }

      const user_id = get(store.getters["auth/me"], "_id");

      const post = await store.dispatch("post/GET_POST_BY_SLUG", {
        slug,
        user_id,
      });

      const post_categories = get(post, "categories", []) || [];
      const category_ids = map(post_categories, (category) => category._id);

      Promise.all([
        store.dispatch("post/GET_SUGGESTION_POSTS", {
          categories: category_ids,
          exclude_ids: [post._id],
        }),

        store.dispatch("comment/GET_COMMENTS_BY_POST_PAGINATED", {
          post_id: post._id,
          user_id,
        }),
      ]);
    } catch (error) {
      console.error(error);
    }
  },
  mixins: [postMixins, commentMixins],
  components: {
    BasePostPanel,
    BaseSuggestionPosts,
    BaseCommentPanel,
  },
  data() {
    return {
      timeout: undefined,
    };
  },
  computed: {
    ...mapGetters({
      me: "auth/me",
    }),

    has_suggestion_posts() {
      return this.suggestion_posts.length;
    },
  },
  methods: {
    ...mapActions({
      INCREASE_POST_VIEWS: "post/INCREASE_POST_VIEWS",
    }),
  },

  async mounted() {
    try {
      const duration_in_milliseconds = Math.round(
        (this.post?.reading_time?.time || 0) * 60 * 0.3
      );

      this.timeout = setTimeout(
        async () => await this.INCREASE_POST_VIEWS({ _id: this.post?._id }),
        duration_in_milliseconds
      );
    } catch (error) {
      console.error(error);
    }
  },

  destroyed() {
    clearTimeout(this.timeout);
  },
};
</script>
