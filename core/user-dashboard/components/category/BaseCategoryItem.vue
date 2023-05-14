<template>
  <div class="d-flex card flex-column w-100">
    <div class="thumbnail">
      <v-img
        :src="data.thumbnail_url"
        :alt="data.title"
        cover
        max-height="400"
      ></v-img>
    </div>
    <div class="content d-flex flex-column">
      <div class="text-h6 text-sm-h4 text-uppercase text-center pt-4 pb-3">
        <v-badge :color="data.badge_color" dot>
          <span
            class="app-body post__title position-relative clickable"
            v-html="data.title"
            @click="$router.push(localePath(`/category/${data.slug}`))"
          ></span>
        </v-badge>
      </div>
      <div class="post__description text__description matte__black--text">
        <span class="app-body" v-html="data.description"></span>
      </div>
      <div class="text-left text-caption grey--text text-uppercase">
        <span class="app-body" v-html="$t('Total number of posts:')"></span>
        <span class="app-body">{{ data.post_count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseCategoryItem",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
