<template>
  <div class="d-flex flex-column">
    <div class="about__header text-uppercase text-body-1">
        <span class="app-body" v-html="$t('About Me')"></span>
    </div>
    <div class="d-flex flex-column justify-space-between">
        <v-img :src=""></v-img>
    </div>
  </div>
</template>

<script>
export default {
name: "BaseAboutCard"
}
</script>

<style>

</style>