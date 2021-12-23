const slider = document.getElementById('slider');
const buttonLeft = document.getElementById('btn-left');
const buttonRight = document.getElementById('btn-right');
const slide = document.getElementsByClassName('slide');
const pointers = document.getElementById('pointers');

buttonLeft.addEventListener('click', () => movePosition(-1));
buttonRight.addEventListener('click', () => movePosition(1));

const widthOfslide = -440;
let position = 1;
let blockButtons = false;

const numberOfImg = slide.length - 1;

const initialization = () => {
  for (let i = numberOfImg; i > 0; i--) {
    pointers.insertAdjacentHTML(
      'afterbegin',
      `<div class="pointer" id="point${i}" onClick="setPosition(${i})"></div>`
    );
  }
  document.getElementById(`point${1}`).className += ' active';
};

function movePosition(step) {
  if (!blockButtons) {
    document.getElementById(`point${position}`).className = 'pointer';
    if (position + step >= numberOfImg + 1) position = 0;
    if (position + step <= 0) position = numberOfImg + 1;
    moveImage(position + step, step);
    document.getElementById(`point${position + step}`).className += ' active';
    position += step;
  }
}

function setPosition(nextPosition) {
  if (!blockButtons) {
    let steps = nextPosition - position;
    moveImage(nextPosition, steps);
    document.getElementById(`point${position}`).className = 'pointer';
    document.getElementById(`point${nextPosition}`).className += ' active';
    position = nextPosition;
  }
}

function moveImage(currentPosition, steps) {
  animate({
    timing: function (timeFraction) {
      return timeFraction;
    },
    draw: (progress) => {
      slider.style.transform = `translateX(${
        // widthOfslide * currentPosition + widthOfslide * steps * progress + 'px'
        widthOfslide * (currentPosition - steps) + widthOfslide * steps * progress + 'px'
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

initialization();
