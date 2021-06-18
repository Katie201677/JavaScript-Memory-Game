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
  let status = [];
  for (let i=0; i<tiles.length; i++) {
    if (tiles[i].classList.contains("hidden")) {
      status.push("hidden");
    } else {
      status.push("visible");
    }
  }
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
  count++;
  
  tileOne ? tileTwo = selectedTile : tileOne = selectedTile;

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
