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
        clearable
        type="search"
        :placeholder="$t('Search your favourites...')"
        :value="post_search_query"
        @keyup="(event) => SET_POST_SEARCH_QUERY({ data: event.target.value })"
        @keyup.enter="search"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "BaseSearchCard",
  computed: {
    ...mapGetters({
      post_search_query: "post/post_search_query",
    }),
  },
  methods: {
    ...mapMutations({
      SET_POST_SEARCH_QUERY: "post/SET_POST_SEARCH_QUERY",
    }),

    search() {
      this.$router.push({
        path: this.localePath("/"),
        query: {
          search: this.post_search_query,
        },
      });
    },
  },
};
</script>
<style scoped>
:deep(.sidebar__card .v-input__append-inner button::before),
:deep(.sidebar__card .v-input__append-inner button::after) {
  color: var(--color-brick) !important;
}
</style>
