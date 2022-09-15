const replyCommentRules = {
  content: "required|string",
  post: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
};

export default replyCommentRules;
