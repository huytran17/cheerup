const updateCategoryRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  title: "required|string",
};

export default updateCategoryRules;
