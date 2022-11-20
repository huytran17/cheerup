const deleteGalleryItemRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  bucket: ["required", "string"],
  key: ["required", "string"],
};

export default deleteGalleryItemRules;
