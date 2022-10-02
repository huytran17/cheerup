<template>
  <div v-if="has_bookmark_data">
    <v-row>
      <v-col
        v-for="bookmark in post_bookmarks_data"
        :key="bookmark._id"
        cols="12"
      >
        <BaseFavouriteCard :bookmark_data="bookmark" />
      </v-col>

      <v-col cols="12">
        <infinite-loading
          v-if="!!post_bookmark_pagination.to"
          identifier="post-bookmarks"
          spinner="spiral"
          @infinite="
            ($state) => {
              getMorePostBookmarks({
                page: post_bookmark_pagination.current_page + 1,
              }).then((posts) => {
                if (!posts || (posts && posts.length === 0)) {
                  $state.complete();
                } else {
                  $state.loaded();
                }
              });
            }
          "
        >
          <div slot="no-more">{{ $t("No more posts") }}</div>
        </infinite-loading>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <div
      class="text__description text-sm-body-2 text-uppercase text-center grey--text"
    >
      <span class="app-body" v-html="$t('No data to show')"></span>
    </div>
  </div>
</template>

<script>
import postBookmarkMixins from "@/mixins/post-bookmark";
import BaseFavouriteCard from "@/components/favourites/BaseFavouriteCard";

export default {
  name: "BaseFavouriteCards",
  mixins: [postBookmarkMixins],
  components: {
    BaseFavouriteCard,
  },
  props: {
    post_bookmarks_data: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    has_bookmark_data() {
      return (
        !_.isEmpty(this.post_bookmarks_data) &&
        !_.isNil(this.post_bookmarks_data)
      );
    },
  },
};
</script>

<style></style>
