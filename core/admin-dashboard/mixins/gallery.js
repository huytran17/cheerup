import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
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
    }),
    ...mapMutations({
      SET_GALLERY: "post/SET_GALLERY",
      SET_GALLERIES: "post/SET_GALLERIES",
      SET_LOADING: "post/SET_LOADING",
      SET_GALLERY_PAGINATION: "post/SET_GALLERY_PAGINATION",
    }),
  },
};
