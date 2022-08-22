const updateAdminPersonalPasswordRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  password: "string",
  new_password_confirmation: "string",
  new_password: "string",
};

export default updateAdminPersonalPasswordRules;
