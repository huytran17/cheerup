const updateGalleryRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  name: "required|string",
};

export default updateGalleryRules;
