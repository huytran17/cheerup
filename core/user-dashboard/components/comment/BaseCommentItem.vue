<template>
  <div class="d-flex">
    <div>
      <v-img
        :src="user_avatar"
        :lazy-src="user_avatar"
        :alt="user_fullname"
        max-width="35px"
        class="rounded-circle"
      ></v-img>
    </div>
    <div class="d-flex flex-column pl-4">
      <div class="text-body-2">
        <span class="app-body">{{ user_fullname }}</span>
      </div>
      <div class="text-caption grey--text">
        <span class="app-body">{{ formatDate(comment_data.created_at) }}</span>
      </div>
      <div class="text-body-2 pt-1">
        <span class="app-body" v-html="comment_data.content"></span>
      </div>
    </div>
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";
export default {
  name: "BaseCommentItem",
  mixins: [systemMixins],
  props: {
    comment_data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    user_avatar() {
      return (
        _.get(this.comment_data, "user.avatar_url") ||
        require("@/assets/images/default/user-avatar.png")
      );
    },

    user_fullname() {
      return _.get(this.comment_data, "user.full_name");
    },
  },
};
</script>

<style></style>
