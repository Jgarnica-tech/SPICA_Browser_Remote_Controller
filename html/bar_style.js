
const rangeLabel = document.querySelector('.custom-range-slider');
const rangeInput = rangeLabel.children[0];
const thumbWidth = 6;

rangeLabel.insertAdjacentHTML(
  'beforeend', 
  `<span class="bubble"></span>`
);

const rangeBubble = rangeLabel.children[1];

positionBubble(rangeBubble, rangeInput)

function positionBubble(bubbleElement, anchorElement) {
  const {min, max, value, offsetWidth} = anchorElement;
  const total = Number(max) - Number(min);
  const perc = (Number(value) - Number(min)) / total;
  const offset = (thumbWidth/2) - (thumbWidth * perc);
  
  bubbleElement.style.left = `calc(${perc * 100}% + ${offset}px)`;
  bubbleElement.textContent = value;
}

rangeInput.addEventListener('input', (e) => positionBubble(rangeBubble, e.target))