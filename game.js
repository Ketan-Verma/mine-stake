document.addEventListener("DOMContentLoaded", () => {
  let grid;
  let rows;
  let cols;
  let totalMines;
  const cellSize = 40;
  const gridContainer = document.getElementById("grid");
  const mineImageSrc = "./assets/bomb.png"; // Update with the correct path to your mine image
  const diamondImageSrc = "./assets/diamond.png"; // Update with the correct path to your diamond image

  function setup() {
    // Prompt user for grid size and number of mines
    rows = 5; //parseInt(prompt("Enter number of rows:"));
    cols = rows; // for a square grid
    totalMines = 3; //parseInt(prompt("Enter number of mines:"));

    gridContainer.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;

    grid = make2DArray(rows, cols);
    placeMines();
    placeDiamonds();
    drawGrid();
  }

  function make2DArray(rows, cols) {
    let arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(cols);
    }
    return arr;
  }

  function placeMines() {
    let options = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        options.push([i, j]);
      }
    }

    for (let n = 0; n < totalMines; n++) {
      let index = Math.floor(Math.random() * options.length);
      let choice = options[index];
      let i = choice[0];
      let j = choice[1];
      grid[i][j] = "X";
      options.splice(index, 1);
    }
  }

  function placeDiamonds() {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j] !== "X") {
          grid[i][j] = "O";
        }
      }
    }
  }

  function drawGrid() {
    gridContainer.innerHTML = "";
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.addEventListener("click", revealCell);
        gridContainer.appendChild(cell);
      }
    }
  }

  function revealCell(event) {
    const cell = event.target;
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    if (grid[row][col] === "X") {
      cell.innerHTML = `<img src="${mineImageSrc}" alt="Mine">`;
      //   alert("Game Over! You clicked on a mine.");
      revealAllMines();
    } else if (grid[row][col] === "O") {
      cell.innerHTML = `<img src="${diamondImageSrc}" alt="Diamond">`;
      cell.classList.add("revealed");
      grid[row][col] = ""; // Mark the cell as revealed
    }
    cell.removeEventListener("click", revealCell);
  }

  function revealAllMines() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      const row = cell.dataset.row;
      const col = cell.dataset.col;
      if (grid[row][col] === "X") {
        cell.innerHTML = `<img src="${mineImageSrc}" alt="Mine">`;
        cell.classList.add("revealed");
      }
    });
    disableAllCells();
  }

  function disableAllCells() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.removeEventListener("click", revealCell);
    });
  }

  setup();
});
