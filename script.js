const tiles = document.querySelectorAll(".tile");
const tileBacks = document.querySelectorAll(".tile__face--back");
const tilesArray = ["fish", "fish", "shark", "shark", "crab", "crab", "jellyfish", "jellyfish"];
const isFlippedArray = tilesArray.map((tile) => {
  return false;
});
let firstTile = "";
let secondTile = "";
let count = 0;

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

// const setIsFlippedArray = (index) => {
//   isFlippedArray = [
//     ...isFlippedArray.slice(0, index),
//     true,
//     ...isFlippedArray.slice(index + 1),
//   ]
// } 

const handleMatch = (firstTile, secondTile) => {
  if (firstTile === secondTile) {
    console.log("match")
  }
  else console.log("no match")
  firstTile = "";
  secondTile = "";
}


setUpBoard(tiles);

const handleClick = (event) => {
  const selectedTile = event.currentTarget;
  count++;
  console.log(count);
  
  // let selectedClass = selectedTile.getAttribute("class");
  // let index = selectedClass.match(/\d/);
  
  
  // let classList = selectedTile.getAttribute("class");

  // for (let i=0; i<tiles.length; i++) {
  //   if (tiles[i].getAttribute("class").includes("isFlipped")) {
  //     // count ++;
  //     console.log(count);
  //   }
  // }
  if (count <= 2) {
    selectedTile.classList.add("isFlipped");
    if (firstTile === "") {
       firstTile = selectedTile.getAttribute("class")
     } else secondTile = selectedTile.getAttribute("class");
  }
  console.log(`firstTile is ${firstTile}, secondTile is ${secondTile}`);
  
  if (count === 2) {
    selectedTile.classList.add("isFlipped");
    handleMatch(firstTile, secondTile);
  }

  if (count > 2) return;
}


tiles.forEach((tile) => {
  tile.addEventListener("click", handleClick);
})
