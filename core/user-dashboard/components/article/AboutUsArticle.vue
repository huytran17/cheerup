<template>
  <div class="layout_Wrapper">
    <div class="style_AboutWrapper">
      <div class="style_AboutPageTitle">
        <h2 class="text-h5">
          <span class="app-title" v-html="$t('About StoryHub')"></span>
        </h2>
        <p class="text-body-2 text-md-body-1 lineheight-large">
          <span
            class="app-body"
            v-html="
              $t(
                'StoryHub is a beautiful Gatsby Blog theme designed to showcase your work in style. Perfect for designers, artists, photographers and developers to use for their portfolio website.'
              )
            "
          ></span>
        </p>
      </div>
      <div class="style_AboutImage">
        <v-img :src="img" :lazy-src="img" style="margin-bottom: 70px"></v-img>
      </div>
      <div class="style_AboutDetails">
        <h2 class="text-h6">
          <span class="app-title" v-html="$t('Hey there, what’s up?')"></span>
        </h2>
        <p class="text-body-1">
          <span
            class="app-body"
            v-html="
              $t(
                'RedQ Team is a creative agency specializing in building scalable, high-performance web &amp; mobile application. Our main concern is creating more value into the application so that can help our customers to grow their business.'
              )
            "
          ></span>
        </p>
        <p class="text-body-1">
          <span
            class="app-body"
            v-html="
              $t(
                'RedQ Team is a creative agency specializing in building scalable, high-performance web & mobile application. Our main concern is creating more value into the application so that can help our customers to grow their business.'
              )
            "
          ></span>
        </p>
        <div class="style__SocialProfiles">
          <div class="d-flex">
            <div class="d-flex justify-center gap-30">
              <v-icon color="black" class="clickable hover-icon"
                >mdi-facebook</v-icon
              >
              <v-icon color="black" class="clickable hover-icon"
                >mdi-instagram</v-icon
              >
              <v-icon color="black" class="clickable hover-icon"
                >mdi-twitter</v-icon
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUsArticle",
  props: {
    img: {
      type: String,
      default: require("@/assets/images/sample/about.jpg"),
    },
  },
};
</script>
<style scoped>
.hover-icon:hover {
  color: #ff2e55 !important;
}
.layout_Wrapper {
  max-width: 1385px;
  padding: 30px 15px;
  margin: 0px auto;
  min-height: 80vh;
}
.style_AboutWrapper {
  position: relative;
  padding: 60px 0px 0px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: -15px;
  width: 860px;
}
.style_AboutPageTitle {
  margin-bottom: 50px;
  text-align: center;
  padding: 0px 100px;
}
.style_AboutPageTitle h2 {
  font-size: 30px;
  font-weight: 700;
  color: rgb(18, 18, 19);
  line-height: 1.53;
  margin-bottom: 20px;
}

.style_AboutDetails {
  width: 1170px;
  max-width: 100%;
  margin: 0px auto;
}
.style_AboutDetails h2 {
  font-size: 21px;
  font-weight: 500;
  color: rgb(18, 18, 19);
  margin-bottom: 30px;
}
p {
  color: rgb(117, 117, 117);
  line-height: 2;
  margin: 0px 0px 1.7em;
  font-size: 18px !important;
  font-weight: 400 !important;
}
.style__SocialProfiles {
  margin-top: 60px;
  position: relative;
}
.style__SocialProfiles::before {
  content: "";
  width: 30px;
  height: 1px;
  background: rgb(41, 41, 41);
  display: block;
  margin-bottom: 60px;
}

@media (max-width: 1200px) {
  .layout_Wrapper {
    max-width: 100%;
  }
  .style_AboutWrapper {
    width: 100%;
  }
  .layout_Wrapper {
    padding: 0 15px;
  }
}
@media (max-width: 1024px) {
  .style_AboutPageTitle h2 {
    font-size: 28px;
  }
}
@media (max-width: 767px) {
  .style_AboutPageTitle {
    margin-bottom: 45px;
    padding: 0px 50px;
  }
  .style_AboutPageTitle h2 {
    font-size: 24px;
    margin-bottom: 15px;
  }
  p {
    font-size: 15px;
  }
}
@media (max-width: 575px) {
  .style_AboutPageTitle {
    margin-bottom: 40px;
    padding: 0px;
  }
}
</style>
