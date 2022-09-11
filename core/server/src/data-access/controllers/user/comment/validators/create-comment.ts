const createCommentRules = {
  content: "required",
  post: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
};

export default createCommentRules;
