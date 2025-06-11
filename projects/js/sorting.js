const container = document.getElementById("container");
const sizeInput = document.getElementById("size-input");
let values = [];


function toggleControls(disabled) {
  document.querySelectorAll(".control").forEach(el => {
    el.disabled = disabled;
  });
}

// Generate bars
function generateBars() {
  container.innerHTML = ""; // clear old bars
  values = [];
  const n = parseInt(document.getElementById("size-input").value);

  for (let i = 0; i < n; i++) {
    const value = Math.floor(Math.random() * 250) + 20;
    values.push(value);

    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    container.appendChild(bar);
  }
}

// Update bars whenever number input changes
sizeInput.addEventListener("input", () => {
  let val = parseInt(sizeInput.value);
  if (val < 5) val = 5;
  else if (val > 200) val = 200;
  sizeInput.value = val; // enforce limits

  generateBars();
});

// Bubble Sort
async function bubbleSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < values.length - 1; i++) {
    for (let j = 0; j < values.length - i - 1; j++) {
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";

      if (values[j] > values[j + 1]) {
        await new Promise(resolve => 
        setTimeout(resolve, parseInt(document.getElementById("speedRange").value))
        );

        // Swap values
        [values[j], values[j + 1]] = [values[j + 1], values[j]];
        bars[j].style.height = `${values[j]}px`;
        bars[j + 1].style.height = `${values[j + 1]}px`;
      }

      bars[j].style.backgroundColor = "steelblue";
      bars[j + 1].style.backgroundColor = "steelblue";
    }
  }
}

// Selection Sort (placeholder)
async function selectionSort() {
  alert("Selection Sort not implemented yet.");
}

// Insertion Sort (placeholder)
async function insertionSort() {
  alert("Insertion Sort not implemented yet.");
}

// Run selected algorithm
async function runSort() {
  toggleControls(true); // Lock controls

  const algo = document.getElementById("algo-select").value;

  if (algo === "bubble") await bubbleSort();
  else if (algo === "selection") await selectionSort();
  else if (algo === "insertion") await insertionSort();

  toggleControls(false); // Unlock controls
}


// Init
generateBars();
