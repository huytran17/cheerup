<template>
  <div class="d-flex flex-column text-center">
    <div class="text-uppercase text-body-2">
      <span
        class="sidebar__header position-relative app-body mb-2 d-inline-block"
        v-html="$t('Search')"
      ></span>
    </div>
    <div class="sidebar__card pa-6">
      <v-text-field
        filled
        rounded
        dense
        hide-details
        type="search"
        :placeholder="$t('Search your favourites...')"
        @keyup.enter="search"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  name: "BaseSearchCard",
  methods: {
    ...mapActions({
      GET_POSTS_PAGINATED: "post/GET_POSTS_PAGINATED",
    }),

    ...mapMutations({
      SET_POST_SEARCH_QUERY: "post/SET_POST_SEARCH_QUERY",
    }),

    async search(event) {
      this.SET_POST_SEARCH_QUERY({ data: event.target.value });
      await this.GET_POSTS_PAGINATED({
        query: event.target.value,
      });
    },
  },
};
</script>

<style></style>
