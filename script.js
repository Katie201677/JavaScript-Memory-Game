const tiles = document.querySelectorAll(".tile");
const tileBacks = document.querySelectorAll(".tile__face--back");
const tilesArray = ["fish", "fish", "shark", "shark", "crab", "crab", "jellyfish", "jellyfish"];
const isFlippedArray = tilesArray.map((tile) => {
  return false;
});
let firstTile = "";
let secondTile = "";
let count = 0;
let tileOne;
let tileTwo;

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

const setUpBoard = (tiles) => {
  const shuffled = shuffle(tilesArray);
  console.log(shuffled);
  let index = 0;
  tiles.forEach((tile) => {
    tile.classList.add(shuffled[index]);
    index++;
  })
}


const handleMatch = (tileOne, tileTwo) => {
  if (tileOne.getAttribute("class") === tileTwo.getAttribute("class")) {
    console.log("match");
    setInterval(() => {
    tileOne.classList.add("hidden");
    tileTwo.classList.add("hidden");
  }, 2000)
  }
  else console.log("no match")
  firstTile = "";
  secondTile = "";
  setInterval(reset, 2000);
}

const reset = () => {
  tiles.forEach((tile) => {
    if(tile.classList.contains("isFlipped")) {
      tile.classList.remove("isFlipped");
    }
  })
}

setUpBoard(tiles);

const handleClick = (event) => {
  const selectedTile = event.currentTarget;
  count++;

  console.log(`tileOne is ${tileOne} and tileTwo is${tileTwo}`);

  // if (tileOne === "undefined") {
  //   tileOne = selectedTile;
  // } else tileTwo = selectedTile;
  
  tileOne ? tileTwo = selectedTile : tileOne = selectedTile;
  
  console.log(`tileOne is ${tileOne} and tileTwo is${tileTwo}`);

  if (count <= 2) {
    selectedTile.classList.add("isFlipped");
    if (firstTile === "") {
       firstTile = selectedTile.getAttribute("class")
     } else secondTile = selectedTile.getAttribute("class");
  }
  console.log(`firstTile is ${firstTile}, secondTile is ${secondTile}`);
  
  if (count === 2) {
    selectedTile.classList.add("isFlipped");
    handleMatch(tileOne, tileTwo);
  }

  if (count > 2) return;
}


tiles.forEach((tile) => {
  tile.addEventListener("click", handleClick);
})
