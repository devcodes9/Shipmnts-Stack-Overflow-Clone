const validateVoteType = (voteType) => {
  return !voteType || (voteType !== "upvote" && voteType !== "downvote");
};

module.exports = { validateVoteType };
