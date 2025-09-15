const REMOVE_MESSAGE_TIME = 5000;
const errorTemplate = document.querySelector('#data-error').content;
export const showErrorMessage = () => {
  const content = errorTemplate.cloneNode(true);
  document.body.append(content);
  const errorTemple = document.querySelector('.data-error');
  setTimeout(() => {
    errorTemple.remove();
  }, REMOVE_MESSAGE_TIME);
};
