<template>
  <SideNavListItems />
</template>

<script>
import systemMixins from "@/mixins/system";
import SideNavListItems from "@/components/SideNavListItems";
export default {
  name: "TheSideNav",
  mixins: [systemMixins],
  components: {
    SideNavListItems,
  },
};
</script>
