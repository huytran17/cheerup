<template>
  <div class="d-flex flex-column text-center">
    <div class="text-uppercase text-body-2">
      <span
        class="sidebar__header position-relative app-body mb-2 d-inline-block"
        v-html="$t('Categories')"
      ></span>
    </div>
    <div class="sidebar__card py-6 px-6 category__list horizontal__scrollbar">
      <div v-if="category_titles.length">
        <div
          class="text-body-2 text-uppercase text-left"
          v-for="(category, index) in category_titles"
          :key="category._id"
        >
          <div
            class="py-2 card-item__wrapper"
            :class="[index === 0 ? 'pt-0' : '']"
          >
            <span
              class="app-body clickable card-item__title"
              v-html="$t(category.title)"
              @click="$router.push(localePath(`/category/${category.slug}`))"
            ></span>
          </div>
        </div>
      </div>
      <div
        v-else
        class="text__content text-sm-body-2 text-uppercase text-center grey--text"
      >
        <span class="app-body" v-html="$t('No data available')"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BaseCategoriesCard",
  computed: {
    ...mapGetters({
      category_titles: "category/category_titles",
    }),
  },
};
</script>

<style scoped>
.card-item__wrapper {
  border-bottom: 1px solid var(--color-article-baseline);
}
.card-item__title {
  transition: all 0.2s linear;
}
.card-item__title:hover {
  padding-left: 15px;
}
.category__list {
  max-height: 210px;
  overflow-y: auto;
}
</style>
