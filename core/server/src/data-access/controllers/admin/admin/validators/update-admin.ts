const updateAdminRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  full_name: "string",
  type: "string",
  is_auto_censorship_post: "boolean",
};

export default updateAdminRules;
