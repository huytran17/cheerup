export default ({ app }) => {
  app.nuxt.defaultTransition.beforeEnter = () => {
    app.i18n.finalizePendingLocaleChange();
  };

  app.router.options.scrollBehavior = async (to, from, savedPosition) => {
    to.name !== from.name && (await app.i18n.waitForPendingLocaleChange());
    return savedPosition || { x: 0, y: 0 };
  };
};
