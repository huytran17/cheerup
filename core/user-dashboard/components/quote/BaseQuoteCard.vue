<template>
  <div class="d-flex flex-column text-center">
    <div class="text-uppercase text-body-2">
      <span class="sidebar__header position-relative mb-2 d-inline-block">{{
        $t("Daily quote")
      }}</span>
    </div>
    <div class="sidebar__card py-6 px-6 access__list horizontal__scrollbar">
      <div class="text-body-2">
        <div class="font-italic text-left">
          {{ quote.content }}
        </div>
        <div v-if="quote.author" class="pt-2 text-right">
          {{ quote.author }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import quotes from "@/config/quote/quotes.json";

export default {
  name: "BaseQuoteCard",
  computed: {
    quote() {
      return quotes[Math.floor(Math.random() * quotes.length)];
    },
  },
};
</script>
