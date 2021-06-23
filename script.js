// variables:
const button = document.querySelector(".win-message__button");
const tileGrid = document.querySelector(".tiles");
const tiles = document.querySelectorAll(".tile");
console.log(tiles);
const tilesArray = ["fish", "fish", "shark", "shark", "crab", "crab", "jellyfish", "jellyfish"];
const winMessage = document.querySelector(".win-message");

let count = 0;
let processing = false;
let tileOne;
let tileTwo;

// function to shuffle an array randomly - used in game set-up:
const shuffle = (array) => {
  let arr = [...array];
  for (let i=arr.length-1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
  }
  return arr;
}

// function to set up the board at the start of the game:
const setUpBoard = (tiles) => {
  const shuffled = shuffle(tilesArray);
  let index = 0;
  tiles.forEach((tile) => {
    tile.classList.add(shuffled[index]);
    index++;
  })
}

// function to check whether two selected cards are a match or not:
const handleMatch = (tileOne, tileTwo) => {
  processing = true; //prevents clicks while this function is running
  if (tileOne.getAttribute("class") === tileTwo.getAttribute("class")) {
    // setTimeout used to create slight delay before hiding matches:
    setTimeout(() => {
      tileOne.classList.add("hidden");
      tileTwo.classList.add("hidden");
      // check whether game won:
      gameOver(tiles);
    }, 1000)
  }
}

//function to flip tiles back if no match:
const reset = () => {
  tiles.forEach((tile) => {
    if(tile.classList.contains("isFlipped")) {
      tile.classList.remove("isFlipped");
    }
  });
  tileOne = null;
  tileTwo = null;
  processing = false;
}

//function to check whether each tile has been matched then display game over message and play again button:
const gameOver = (tiles) => {
  // reducer creates an array from tiles node list then reduces to array of "hidden" or "visible":
  let status = [...tiles].reduce((acc, cv) => {
    if (cv.classList.contains("hidden")) {
      acc.push("hidden");
    } else {
      acc.push("visible");
    }
    return acc;
  }, []);
  
  if (!status.includes("visible")) {
    console.log(`game over`);
    winMessage.classList.add("visible");
    tileGrid.classList.add("hide");
  }
}

//function to reset board if 'play again' button clicked:
const playAgain = () => {
  tiles.forEach((tile) => {
    tile.className = "tile";
  });
  tileOne = null;
  tileTwo = null;
  processing = false;
  setUpBoard(tiles);
  winMessage.classList.remove("visible");
  tileGrid.classList.remove("hide");
}

//function to manage game play when tile clicked:
const handleClick = (event) => {
  if (processing) return; //prevents further clicks while matches are being checked:
  const selectedTile = event.currentTarget;
  if (selectedTile.classList.contains("isFlipped")) return;
  count++;
  
  if (tileOne) {
    tileTwo = selectedTile;
  } else {
    tileOne = selectedTile
  }

  if (count <= 2) {
    selectedTile.classList.add("isFlipped");
  }
  if (count === 2) {
    selectedTile.classList.add("isFlipped");
    handleMatch(tileOne, tileTwo);
    setTimeout(reset, 1000);
    count = 0;
  }

  if (count > 2) return; 
}

setUpBoard(tiles);

tiles.forEach((tile) => {
  tile.addEventListener("click", handleClick);
})

button.addEventListener("click", playAgain);

//bubbles animation:

const canvasContainer = document.querySelector(".canvas-container");
const canvasHeight = document.body.clientHeight;
const canvasWidth = document.body.clientWidth;

window.addEventListener('resize', () => {
  canvas.height = document.body.clientHeight;
  canvas.width = document.body.clientWidth;
});

canvasContainer.innerHTML = `<canvas class="canvas" width=${canvasWidth} height=${canvasHeight}></canvas>`;

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

let bubbles = [];
let frame = 0;
let yCoord = 1000;
let xCoord;

const bubbleImage = new Image();
bubbleImage.src = "assets/images/bubble.png";
bubbleImage.width = 20;
bubbleImage.height = 20;

// function to generate random coordinates:
function generateRandomCoord(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}

// function to populate an array with bubbles, up to a maximum and with randomly generated x coordinate:
function populateBubbles(max) {
  for (let i=0; i<max; i++) {
    xCoord =  generateRandomCoord(0, canvasWidth);
    yCoord = generateRandomCoord(700, 800);
    bubbles.push({x: xCoord, y: yCoord});
  }
}
populateBubbles(5);

const drawBubble = (bubbleArray) => {
  for (let i=0; i<bubbleArray.length; i++) {
    ctx.drawImage(bubbleImage, bubbleArray[i].x, bubbleArray[i].y, 40, 40);
  }  
}

const animateBubbles = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // add new ball to array every 13 frames
  if (frame === 100) {
    populateBubbles(3);
  }
  drawBubble(bubbles);

  // make the bubbles rise:
  for (let i=0; i<bubbles.length; i++) {
    bubbles[i].y -= 1;
    bubbles[i].x -= 0.3;
  }
  frame < 100 ? frame++ : frame = 1;

  requestAnimationFrame(animateBubbles);
}

requestAnimationFrame(animateBubbles);


