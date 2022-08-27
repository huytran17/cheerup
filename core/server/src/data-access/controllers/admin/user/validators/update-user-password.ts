const updateUserPasswordRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  password: "string",
  password_confirmation: "string",
};

export default updateUserPasswordRules;
