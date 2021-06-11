const tiles = document.querySelectorAll(".tile");
const tileBacks = document.querySelectorAll(".tile__face--back");
const tilesArray = ["fish", "fish", "shark", "shark", "crab", "crab", "jellyfish", "jellyfish"];

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

setUpBoard(tileBacks);

const handleClick = (event) => {
  const selectedTile = event.currentTarget;
  selectedTile.classList.toggle("isFlipped");
}

tiles.forEach((tile) => {
  tile.addEventListener("click", handleClick);
})
