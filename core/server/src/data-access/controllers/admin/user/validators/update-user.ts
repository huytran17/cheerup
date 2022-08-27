const updateUserRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  is_blocked_comment: "boolean",
  full_name: "string",
};

export default updateUserRules;
