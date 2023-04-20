<template>
  <div class="d-flex flex-column text-center">
    <div class="text-uppercase text-body-2">
      <span
        class="sidebar__header position-relative app-body mb-2 d-inline-block"
        v-html="$t('Quick access')"
      ></span>
    </div>
    <div class="sidebar__card py-6 px-6 access__list horizontal__scrollbar">
      <div
        class="text-body-3 text-sm-body-2 text-uppercase text-left"
        v-for="(access, index) in menu_access"
        :key="access.id"
      >
        <div
          class="py-2 card-item__wrapper"
          :class="[index === 0 ? 'pt-0' : '']"
        >
          <span
            class="app-body clickable card-item__title"
            v-html="$t(access.title)"
            @click="goToPage(access.route)"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";

export default {
  name: "BaseQuickAccessCard",
  mixins: [systemMixins],
  computed: {
    menu_access() {
      return [
        {
          id: this.generateRandomString({ length: 10 }),
          title: "Categories",
          route: "/access",
        },
        {
          id: this.generateRandomString({ length: 10 }),
          title: "Posts",
          route: "/post",
        },
      ];
    },
  },
  methods: {
    goToPage(route) {
      this.$router.push(this.localePath(route));
    },
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
.access__list {
  max-height: 210px;
  overflow-y: auto;
}
</style>
