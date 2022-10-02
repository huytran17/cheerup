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
import BaseFavouriteCard from "@/components/favourites/BaseFavouriteCard";

export default {
  name: "BaseFavouriteCards",
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
