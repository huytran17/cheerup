<template>
  <div class="d-flex flex-column text-center">
    <div class="text-uppercase text-body-2">
      <span class="sidebar__header position-relative mb-2 d-inline-block">{{
        $t("Quick access")
      }}</span>
    </div>
    <div class="sidebar__card py-6 px-6 access__list horizontal__scrollbar">
      <div
        class="text-body-2 text-uppercase text-left"
        v-for="(access, index) in menu_access"
        :key="access.id"
      >
        <div
          class="py-2 card-item__wrapper"
          :class="[index === 0 ? 'pt-0' : '']"
        >
          <span
            class="clickable card-item__title"
            @click="goToPage(access.route)"
            >{{ $t(access.title) }}</span
          >
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
          route: "/category",
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
.access__list {
  max-height: toRem(210);
  overflow-y: auto;
}
</style>
