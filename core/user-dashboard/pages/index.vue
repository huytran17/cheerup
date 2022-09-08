<template>
  <div>
    <div class="pt-15">
      <BaseSlider :posts="latest_posts" />
    </div>
    <v-row class="flex-column flex-md-row flex-column-reverse">
      <v-col cols="12" md="8">
        <BaseArticles :posts_data="posts" />
      </v-col>
      <v-col cols="12" md="4">
        <v-row>
          <v-col cols="12" class="mt-15">
            <BaseAboutCard :system_configuration_data="system_configuration" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import systemConfigurationMixins from "@/mixins/system-configuration";
import postMixins from "@/mixins/post";
import BaseSlider from "@/components/slider/BaseSlider";
import BaseArticles from "@/components/article/BaseArticles";
import BaseAboutCard from "@/components/about/BaseAboutCard";
export default {
  name: "IndexPage",
  mixins: [postMixins, systemConfigurationMixins],
  components: {
    BaseSlider,
    BaseArticles,
    BaseAboutCard,
  },

  async fetch() {
    try {
      await Promise.all([
        this.GET_LATEST_POSTS(),
        this.GET_POSTS_PAGINATED(),
        this.GET_LATEST_SYSTEM_CONFIGURATION(),
      ]);
    } catch (err) {
      console.error(err);
    }
  },
};
</script>
