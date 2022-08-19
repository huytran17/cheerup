const createAdminRules = {
  email: "required|email",
  full_name: "required|string",
  type: "required|string",
  password: "required|string|confirmed",
  password_confirmation: "required|string",
  is_auto_censorship_post: "boolean",
};

export default createAdminRules;
