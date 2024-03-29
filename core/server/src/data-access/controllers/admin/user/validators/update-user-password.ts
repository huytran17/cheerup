const updateUserPasswordRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  password: "required|string|min:8",
  password_confirmation: "required|string|min:8",
};

export default updateUserPasswordRules;
