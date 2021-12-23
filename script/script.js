const imagesArray = document.getElementById('image-array');
const buttonLeft = document.getElementById('btn-left');
const buttonRight = document.getElementById('btn-right');
const images = document.getElementsByClassName('image');
const pointers = document.getElementById('pointers');

buttonLeft.addEventListener('click', () => movePosition(-1));
buttonRight.addEventListener('click', () => movePosition(1));

const widthOfImages = -440;
let position = 1;
let blockButtons = false;

const numberOfImg = images.length - 2;

for (let i = numberOfImg; i > 0; i--) {
  pointers.insertAdjacentHTML(
    'afterbegin',
    `<div class="pointer" id="point${i}" onClick="setPosition(${i})"></div>`
  );
}

function movePosition(pos) {
  if (!blockButtons) {
    document.getElementById(`point${position}`).className = "pointer"
    if (position + pos >= numberOfImg + 1) position = 0;
    if (position + pos <= 0) position = numberOfImg + 1;
    moveImage(position + pos, pos);
    document.getElementById(`point${position + pos}`).className += " active"
    position += pos;
  }
}

function setPosition(pos) {
  if (!blockButtons) {
    let steps = pos - position;
    moveImage(pos, steps);
    document.getElementById(`point${position}`).className = "pointer"
    document.getElementById(`point${pos}`).className += " active"
    position = pos;
  }
}

function moveImage(currentPosition, steps) {
  animate({
    timing: function (timeFraction) {
      return timeFraction;
    },
    draw: (progress) => {
      imagesArray.style.transform = `translateX(${
        // widthOfImages * currentPosition + widthOfImages * steps * progress + 'px'
        widthOfImages * (currentPosition - steps) + widthOfImages * steps * progress + 'px'
      })`;
    },
    duration: 600,
  });
}

function animate({ timing, draw, duration }) {
  blockButtons = true;
  setTimeout(() => {
    blockButtons = false;
  }, 550);
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}
