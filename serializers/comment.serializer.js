
const commentSerializer = {
  new: (comment) => {
    // user = user ? user : findUser(comment.userId)
    return ({
      id: comment.id,
      comment: comment.comment,
      officerId: comment.officerId,
      user: JSON.parse(comment.user),
    })
  },
};

module.exports = commentSerializer;
