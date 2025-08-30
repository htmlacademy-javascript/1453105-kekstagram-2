const renderComment = ({id, avatar, message, name}, commentTemplate) => {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__comment').dataset.commentId = id;
  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  return commentElement;
};

export const renderComments = (commentList) => {
  const commentWrapper = document.querySelector('.social__comments');
  const commentTemplate = document.querySelector('#comment').content;
  const commentListFragment = document.createDocumentFragment();
  commentList.forEach((comment) => {
    const commentItem = renderComment(comment, commentTemplate);
    commentListFragment.appendChild(commentItem);
  });
  commentWrapper.appendChild(commentListFragment);
};

export const clearCommentList = () => {
  const commentWrapper = document.querySelector('.social__comments');
  commentWrapper.innerHTML = '';
};

