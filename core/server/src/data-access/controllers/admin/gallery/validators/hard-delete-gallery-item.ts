const hardDeleteGalleryItemRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  _item_id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
};

export default hardDeleteGalleryItemRules;
