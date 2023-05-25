<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row class="pb-5 pb-md-12">
          <v-col cols="12">
            <BaseAppBar />
          </v-col>
          <v-col cols="12" class="pt-0">
            <BaseLanguageSwitcher />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BaseAppBar from "@/components/BaseAppBar";
import BaseLanguageSwitcher from "@/components/BaseLanguageSwitcher";

export default {
  name: "PublicLayout",
  components: {
    BaseAppBar,
    BaseLanguageSwitcher,
  },
};
</script>
