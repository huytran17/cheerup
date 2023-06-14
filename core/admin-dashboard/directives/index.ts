import Vue from "vue";

Vue.directive("page-roles", {
    inserted: function (el, binding, vnode) {
        const store = vnode.context?.$store;
        const user = store?.getters["auth/me"];

        const roles = binding.value || [];
        const user_type = user?.type

        const invalid_role = !roles.includes(user_type)

        invalid_role && (window.location.href = `${process.env.BASE_URL}/403`)
    },
});

Vue.directive("component-roles", {
    inserted: function (el, binding, vnode) {
        const store = vnode.context?.$store;
        const user = store?.getters["auth/me"];

        const roles = binding.value || [];
        const user_type = user?.type

        const invalid_role = !roles.includes(user_type)

        invalid_role && (el.innerHTML = '')
    },
});
