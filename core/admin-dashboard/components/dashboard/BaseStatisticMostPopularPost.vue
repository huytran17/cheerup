<template>
  <BaseStatisticCard>
    <div class="d-flex flex-column">
      <div class="d-flex flex-column">
        <div class="text-body-1 text-sm-h6">
          <span class="app-title">{{ $t("Post Statistics") }}</span>
        </div>
        <div class="text-body-2">
          <span>{{
            $tc("{count} Total Post", total_post, {
              count: total_post,
            })
          }}</span>
        </div>
      </div>

      <div class="d-flex justify-center">
        <BaseMostPopularPostAnalysisChart
          :options="most_popular_post_chart.options"
          :series="most_popular_post_chart.series"
        />
      </div>

      <div v-if="has_most_popular_posts" class="d-flex flex-column">
        <div
          v-for="post in most_popular_posts"
          :key="post._id"
          class="d-flex mt-4"
        >
          <div class="d-flex flex-column justify-start clickable">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <div
                  v-bind="attrs"
                  v-on="on"
                  class="blue lighten-4 w-fit-content h-fit-content pa-1 rounded-lg"
                  @click="goToUpdatePost(post)"
                >
                  <v-icon color="pink darken-1">mdi-circle-edit-outline</v-icon>
                </div>
              </template>
              {{ $t("Edit") }}
            </v-tooltip>
          </div>

          <div class="d-flex flex-column ml-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <div
                  v-bind="attrs"
                  v-on="on"
                  class="text-body-2 clickable primary--text"
                  :class="{
                    'error--text': post.deleted_at,
                    'text-decoration-line-through': post.deleted_at,
                  }"
                  @click="goToPost(post)"
                >
                  <span class="app-title">{{ $t(post.title) }}</span>
                </div>
              </template>
              {{ post.deleted_at ? $t("Deleted") : $t("Go to post") }}
            </v-tooltip>

            <div class="text-caption text-grey">
              <span class="text--small">{{
                joinCategoryTitles(post.categories)
              }}</span>
            </div>

            <div class="text-caption text-grey">
              <span>{{
                $t(`by {text}`, {
                  text: post.author.full_name,
                })
              }}</span>
            </div>
          </div>

          <div class="text-body-2 ml-auto">
            <span>{{
              $tc("{count} view", formatViews(post.views), {
                count: formatViews(post.views),
              })
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </BaseStatisticCard>
</template>

<script>
import { get } from "lodash";
import { mapGetters } from "vuex";
import { kFormatter } from "@/utils";
import chartMixins from "~/mixins/apex-chart";
import BaseStatisticCard from "@/components/dashboard/BaseStatisticCard";
import BaseMostPopularPostAnalysisChart from "@/components/dashboard/BaseMostPopularPostAnalysisChart";

export default {
  name: "BaseStatisticMostPopularPost",
  mixins: [chartMixins],
  components: {
    BaseStatisticCard,
    BaseMostPopularPostAnalysisChart,
  },
  computed: {
    ...mapGetters({
      post_analys_data: "post/post_analys_data",
      most_popular_posts_analys_data: "post/most_popular_posts_analys_data",
    }),

    total_post() {
      return get(this.post_analys_data, "total_count", 0);
    },

    has_most_popular_posts() {
      return !!this.most_popular_posts_analys_data?.posts?.length;
    },
    // FIXME: server have been changing the response type, need check to consistent
    most_popular_posts() {
      return this.most_popular_posts_analys_data?.posts || [];
    },
  },

  methods: {
    joinCategoryTitles(categories = []) {
      return categories.map((category) => category.title).join(", ");
    },

    formatViews(number) {
      return kFormatter(number);
    },

    goToPost(post) {
      const post_url = `${process.env.USER_DASHBOARD_URL}/post/${post._id}`;
      return window.open(post_url, "__blank");
    },

    goToUpdatePost(post) {
      return this.$router.push(this.localePath(`/post/${post._id}`));
    },
  },
};
</script>
