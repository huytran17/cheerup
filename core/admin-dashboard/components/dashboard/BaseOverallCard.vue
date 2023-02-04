<template>
  <div
    class="w-100 h-100 card-box-shadow rounded-lg white d-flex flex-column pa-4 justify-space-between"
  >
    <div class="d-flex justify-space-between">
      <div class="blue lighten-4 w-fit-content pa-1 rounded-lg">
        <v-icon color="pink darken-1">{{ data.icon }}</v-icon>
      </div>

      <v-menu offset-y class="soft-box-shadow">
        <template v-slot:activator="{ on, attrs }">
          <v-btn small icon v-bind="attrs" v-on="on">
            <v-icon color="black">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item v-for="(option, index) in options" :key="index">
            <div class="text-body-2 clickable">
              <span class="app-body">{{ option.text }}</span>
            </div>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="d-flex flex-column py-2">
      <div class="text-body-1 primary--text">
        <span class="app-title" v-html="$t(data.text)"></span>
      </div>
      <div class="text-h6 text-sm-h5">
        <span class="app-title">{{ data.total }}</span>
      </div>
    </div>
    <div class="d-flex flex-column">
      <div class="text-body-1 green--text">
        <span class="app-body">{{ data.total }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseOverallCard",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      options: [{ text: "Refresh" }],
    };
  },
};
</script>
