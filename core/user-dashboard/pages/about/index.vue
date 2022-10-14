<template>
  <AboutMe :informations="informations" />
</template>

<script>
import AboutMe from "@/components/about/AboutMe.vue";
export default {
  name: "AboutMeIndex",
  components: {
    AboutMe,
  },
  data() {
    return {
      informations: [
        {
          image: {
            src: require("@/assets/images/me/me_1.jpg"),
            max_width: 400,
          },
          timeline: {
            icon: "mdi-star",
            color: "brick",
          },
          content: this.$t(
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          ),
        },

        {
          image: {
            src: require("@/assets/images/me/me_2.jpg"),
            max_width: 350,
          },
          timeline: {
            icon: "mdi-star",
            color: "brick",
          },
          content: this.$t(
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          ),
        },
        {
          image: {
            src: require("@/assets/images/me/me_3.jpg"),
            max_width: 400,
          },
          timeline: {
            icon: "mdi-star",
            color: "brick",
          },
          content: this.$t(
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          ),
        },
        {
          image: {
            src: require("@/assets/images/me/me_4.jpg"),
            max_width: 300,
          },
          timeline: {
            icon: "mdi-star",
            color: "brick",
          },
          content: this.$t(
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          ),
        },
        {
          image: {
            src: require("@/assets/images/me/me_5.jpg"),
            max_width: 400,
          },
          timeline: {
            icon: "mdi-star",
            color: "brick",
          },
          content: this.$t(
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          ),
        },
        {
          image: {
            src: require("@/assets/images/me/me_6.jpg"),
            max_width: 350,
          },
          timeline: {
            icon: "mdi-star",
            color: "brick",
          },
          content: this.$t(
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          ),
        },
      ],
    };
  },
};
</script>

<style></style>
