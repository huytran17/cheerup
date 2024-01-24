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
      <BaseNoData v-else message="No data available" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseNoData from "@/components/BaseNoData";

export default {
  name: "BaseCategoriesCard",
  components: { BaseNoData },
  computed: {
    ...mapGetters({
      category_titles: "category/category_titles",
    }),
  },
};
</script>

<style lang="scss" scoped>
.card-item__wrapper {
  border-bottom: toRem(1) solid var(--color-article-baseline);
}
.card-item__title {
  transition: all 0.2s linear;
}
.card-item__title:hover {
  padding-left: toRem(15);
}
.category__list {
  max-height: toRem(210);
  overflow-y: auto;
}
</style>
