<template>
  <BaseCategory />
</template>

<script>
import { seo_category_schema } from "../../seo";
import BaseCategory from "@/components/category/BaseCategory";

export default {
  name: "Categories",
  components: { BaseCategory },
  head() {
    return seo_category_schema;
  },
};
</script>
