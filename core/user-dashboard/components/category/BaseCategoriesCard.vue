<template>
  <div class="d-flex flex-column text-center">
    <div class="text-uppercase text-body-2">
      <span
        class="sidebar__header position-relative app-body mb-2 d-inline-block"
        v-html="$t('Categories')"
      ></span>
    </div>
    <div class="sidebar__card py-6 px-6 category__list horizontal__scrollbar">
      <div
        class="text-body-3 text-sm-body-2 text-uppercase text-left"
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
            @click="$router.push(localePath(`/category/${category._id}`))"
          ></span>
        </div>
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
