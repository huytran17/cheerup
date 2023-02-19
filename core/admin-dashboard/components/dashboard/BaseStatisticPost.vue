<template>
  <BaseStatisticCard>
    <template slot="header">
      <div class="d-flex flex-column">
        <div class="d-flex flex-column">
          <div class="text-body-1 text-sm-h6">
            <span class="app-title" v-html="$t('Post Statistics')"></span>
          </div>
          <div class="text-body-2">
            <span
              class="app-body"
              v-html="
                $tc('{count} Total Post', total_post, {
                  count: total_post,
                })
              "
            ></span>
          </div>
        </div>

        <div class="d-flex justify-center"></div>

        <div v-if="has_most_popular_posts" class="d-flex flex-column">
          <div
            v-for="post in most_popular_posts_analys_data"
            :key="post._id"
            class="d-flex mt-4"
          >
            <div class="d-flex flex-column justify-start">
              <div
                class="blue lighten-4 w-fit-content h-fit-content pa-1 rounded-lg"
              >
                <v-icon color="pink darken-1">mdi-book-open-outline</v-icon>
              </div>
            </div>

            <div class="d-flex flex-column ml-2">
              <div class="text-body-2">
                <span class="app-title">{{ $t(post.title) }}</span>
              </div>

              <div class="text-caption text-grey">
                <span class="app-body text--small">{{
                  joinCategoryTitles(post.categories)
                }}</span>
              </div>

              <div class="text-caption text-grey">
                <span
                  class="app-body"
                  v-html="
                    $t(`by {text}`, {
                      text: post.author.full_name,
                    })
                  "
                ></span>
              </div>
            </div>

            <div class="text-body-2 ml-auto">
              <span
                class="app-body"
                v-html="
                  $tc('{count} view', formatViews(post.views), {
                    count: formatViews(post.views),
                  })
                "
              ></span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseStatisticCard>
</template>

<script>
import { mapGetters } from "vuex";
import { kFormatter } from "@/utils";
import BaseStatisticCard from "@/components/dashboard/BaseStatisticCard";

export default {
  name: "BaseStatisticPost",
  components: {
    BaseStatisticCard,
  },
  computed: {
    ...mapGetters({
      post_analys_data: "post/post_analys_data",
      most_popular_posts_analys_data: "post/most_popular_posts_analys_data",
    }),

    total_post() {
      return _.get(this.post_analys_data, "total_count", 0);
    },

    has_most_popular_posts() {
      return this.most_popular_posts_analys_data.length;
    },
  },

  methods: {
    joinCategoryTitles(categories) {
      return categories.map((category) => category.title).join(", ");
    },

    formatViews(number) {
      return kFormatter(number);
    },
  },
};
</script>

<style></style>
