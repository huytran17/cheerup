const updateCommentRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  user: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  post: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  content: "required",
};

export default updateCommentRules;
