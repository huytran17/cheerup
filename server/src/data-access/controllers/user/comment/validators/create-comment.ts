const createCommentRules = {
  content: "required",
  user: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  post: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
};

export default createCommentRules;
