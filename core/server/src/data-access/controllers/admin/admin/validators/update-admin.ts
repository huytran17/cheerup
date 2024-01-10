const updateAdminRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  full_name: "string",
  type: "string",
};

export default updateAdminRules;
