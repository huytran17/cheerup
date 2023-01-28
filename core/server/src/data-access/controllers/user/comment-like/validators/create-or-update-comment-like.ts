const createOrUpdateCommentLikeRules = {
  comment_id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  type: ["required", "string", "in:like,dislike"],
};

export default createOrUpdateCommentLikeRules;
