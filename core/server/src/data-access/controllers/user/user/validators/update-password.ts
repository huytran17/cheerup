const updatePasswordRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  password: "required|string|min:8|max:255",
  new_password: "required|string|min:8|max:255|confirmed",
  new_password_confirmation: "required|min:8|max:255|string",
};

export default updatePasswordRules;
