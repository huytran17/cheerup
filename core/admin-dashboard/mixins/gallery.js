import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      folderNameRules: [(v) => !!v || this.$t("Folder name is required.")],
    };
  },
  computed: {
    ...mapGetters({
      gallery: "gallery/gallery",
      galleries: "gallery/galleries",
      gallery_pagination: "gallery/pagination",
    }),
  },
  methods: {
    ...mapActions({
      GET_GALLERIES_PAGINATED: "gallery/GET_GALLERIES_PAGINATED",
      DELETE_GALLERY_ITEM: "gallery/DELETE_GALLERY_ITEM",
      HARD_DELETE_GALLERY: "gallery/HARD_DELETE_GALLERY",
      CREATE_GALLERY: "gallery/CREATE_GALLERY",
      GET_GALLERY: "gallery/GET_GALLERY",
      GET_GALLERIES_BY_PARENT: "gallery/GET_GALLERIES_BY_PARENT",
      UPDATE_GALLERY: "gallery/UPDATE_GALLERY",
    }),
    ...mapMutations({
      SET_GALLERY: "gallery/SET_GALLERY",
      SET_GALLERIES: "gallery/SET_GALLERIES",
      SET_GALLERY_PAGINATION: "gallery/SET_GALLERY_PAGINATION",
    }),
  },
};
