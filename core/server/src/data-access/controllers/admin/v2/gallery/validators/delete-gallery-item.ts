const deleteGalleryItemRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  item_id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
};

export default deleteGalleryItemRules;
