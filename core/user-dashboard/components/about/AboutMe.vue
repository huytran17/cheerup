<template></template>

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
  },
};
</script>

<style></style>
