const createUserRules = {
  email: "required|string",
  password: "required|string|min:8|max:255|confirmed",
  password_confirmation: "required|string|min:8|max:255",
  is_blocked_comment: "boolean",
  full_name: "string",
};

export default createUserRules;
