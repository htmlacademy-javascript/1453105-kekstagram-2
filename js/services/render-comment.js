import {COMMENTS_PER_PAGE} from '../mockData/const';
const commentWrapper = document.querySelector('.social__comments');
let currentCountComments = 0;
let comments = [];
const counter = document.querySelector('.social__comment-count');
const allCounter = document.querySelector('.comments-loader');
const showCommentsButton = document.querySelector('.social__comments-loader');

const renderComment = ({id, avatar, message, name}, commentTemplate) => {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__comment').dataset.commentId = id;
  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  return commentElement;
};

const drawContext = (shown, total) => {
  counter.querySelector('.social__comment-shown-count').textContent = shown;
  counter.querySelector('.social__comment-total-count').textContent = total;
};

export const drawComments = () => {
  const commentListFragment = document.createDocumentFragment();
  const slicedComments = comments.slice(currentCountComments, currentCountComments + COMMENTS_PER_PAGE);
  const countSlicedComments = slicedComments.length + currentCountComments;
  const commentTemplate = document.querySelector('#comment').content;

  slicedComments.forEach((comment) => {
    const commentItem = renderComment(comment, commentTemplate);
    commentListFragment.appendChild(commentItem);
  });
  commentWrapper.appendChild(commentListFragment);
  drawContext(countSlicedComments, comments.length);

  if (comments.length < 1 || comments.length < COMMENTS_PER_PAGE) {
    counter.classList.add('hidden');
    allCounter.classList.add('hidden');
  }
  if (comments.length <= countSlicedComments) {
    counter.classList.remove('hidden');
    allCounter.classList.add('hidden');
  }
  currentCountComments += COMMENTS_PER_PAGE;
};

export const clearCommentList = () => {
  currentCountComments = 0;
  commentWrapper.innerHTML = '';
  counter.classList.remove('hidden');
  allCounter.classList.remove('hidden');
  showCommentsButton.removeEventListener('click', drawComments);
};

export const renderComments = (commentList) => {
  comments = commentList;
  drawComments();
  showCommentsButton.addEventListener('click', drawComments);
};
