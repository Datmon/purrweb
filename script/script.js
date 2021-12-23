const cookieWindow = document.getElementById('cookie-container');
const acceptButton = document.getElementById('accept-button');

const moveDown = () => {
  cookieWindow.style.transform = ' translateY(93px)';
  window.localStorage.setItem('isAccepted', true);
}

if (window.localStorage.getItem('isAccepted')) {
  cookieWindow.style.display = 'none';
}

acceptButton.addEventListener('click', moveDown);