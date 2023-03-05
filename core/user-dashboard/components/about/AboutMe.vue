<template>
  <div class="d-flex flex-column">
    <div class="text-body-2 owner__description">
      <span class="app-body">{{ owner_description }}</span>
    </div>
    <v-timeline align-top dense>
      <v-timeline-item
        v-for="(information, index) in informations"
        :key="index + Date.now()"
        :color="information.timeline && information.timeline.color"
        :icon="information.timeline && information.timeline.icon"
        fill-dot
        left
        small
      >
        <div class="d-flex justify-start pb-4">
          <v-img
            :src="information.image.src"
            :max-height="information.image.max_width"
            :alt="$t('image')"
            cover
          >
          </v-img>
        </div>
        <div class="text-body-2 text-left pb-2">
          <span
            class="app-body position-relative"
            v-html="information.content"
          ></span>
        </div>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
export default {
  name: "AboutMe",
  props: {
    informations: {
      type: Array,
      default: () => [
        {
          image: {
            type: String,
          },
          content: {
            type: String,
          },
        },
      ],
    },

    system_configuration_data: {
      type: Object,
      required: true,
    },
  },

  computed: {
    owner_description() {
      return _.get(
        this.system_configuration_data,
        "client_meta.owner.description"
      );
    },
  },
};
</script>
<style scoped>
.about-me__text--left::before,
.about-me__text--right::before {
  content: "";
  position: absolute;
  bottom: -15px;
  width: 120px;
  height: 4px;
  background: var(--color-brick);
}

.about-me__text--left::before {
  left: 0;
}

.about-me__text--right::before {
  right: 0;
}

.owner__description {
  padding-left: 46px;
}
</style>
