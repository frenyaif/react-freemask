export function isNextNavigation(e) {
  return 39 === e.keyCode;
}

export function isPrevNavigation(e) {
  return 37 === e.keyCode;
}

export function navigateToNextSibling(element) {
  const nextElementSibling = element.nextElementSibling;

  if (null !== nextElementSibling) {
    if (nextElementSibling.classList.contains('freemask__text')) {
      navigateToNextSibling(nextElementSibling);
    } else {
      nextElementSibling.focus();
    }
  }
}

export function navigateToPrevSibling(element) {
  const prevElementSibling = element.previousElementSibling;

  if (null !== prevElementSibling) {
    if (prevElementSibling.classList.contains('freemask__text')) {
      navigateToPrevSibling(prevElementSibling);
    } else {
      prevElementSibling.focus();
    }
  }
}
