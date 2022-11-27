import _ from "lodash";
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
      gallery_loading: "gallery/loading",
      gallery_pagination: "gallery/pagination",
    }),
  },
  methods: {
    ...mapActions({
      GET_GALLERIES_PAGINATED: "gallery/GET_GALLERIES_PAGINATED",
      DELETE_GALLERY_ITEM: "gallery/DELETE_GALLERY_ITEM",
      HARD_DELETE_GALLERY: "gallery/HARD_DELETE_GALLERY",
      CREATE_GALLERY: "gallery/CREATE_GALLERY",
      UPLOAD_GALLERY_ITEM: "gallery/UPLOAD_GALLERY_ITEM",
      GET_GALLERY: "gallery/GET_GALLERY",
      GET_GALLERIES_BY_PARENT: "gallery/GET_GALLERIES_BY_PARENT",
      UPDATE_GALLERY: "gallery/UPDATE_GALLERY",
    }),
    ...mapMutations({
      SET_GALLERY: "gallery/SET_GALLERY",
      SET_GALLERIES: "gallery/SET_GALLERIES",
      SET_GALLERY_LOADING: "gallery/SET_LOADING",
      SET_GALLERY_PAGINATION: "gallery/SET_GALLERY_PAGINATION",
      UPDATE_GALLERY_DATA: "gallery/UPDATE_GALLERY_DATA",
    }),

    updateGalleryObject({ variable_path, data }) {
      this.UPDATE_GALLERY_DATA({
        variable_path,
        data,
      });
    },
  },
};
