<template>
  <div class="d-flex flex-column text-center">
    <div class="text-uppercase text-body-2">
      <span
        class="sidebar__header position-relative app-body mb-2 d-inline-block"
        v-html="$t('Categories')"
      ></span>
    </div>
    <div class="sidebar__card py-6 px-6">
      <div
        class="text-body-2 text-uppercase text-left"
        v-for="(category, index) in category_titles"
        :key="category._id"
      >
        <div
          :class="[
            index === category_titles.length - 1
              ? 'pt-2'
              : 'py-2 category-item__wrapper',
            index === 0 ? 'pt-0' : '',
          ]"
        >
          <span
            class="app-body clickable category-item__title"
            v-html="$t(category.title)"
            @click="$router.push(localePath(`/category/${category._id}`))"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseCategoriesCard",
  props: {
    category_titles: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.category-item__wrapper {
  border-bottom: 1px solid var(--color-article-baseline);
}
.category-item__title {
  transition: all 0.2s linear;
}
.category-item__title:hover {
  padding-left: 15px;
}
</style>
