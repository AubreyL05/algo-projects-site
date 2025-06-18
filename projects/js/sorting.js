const container = document.getElementById("container");
const sizeInput = document.getElementById("size-input");
let values = [];
let isPaused = false;
let isSorting = false;
let isCancelled = false;


function toggleControls(disabled) {
  const sortBtn = document.getElementById("sortBtn");
  document.querySelectorAll(".control").forEach(el => {
    if (el.id !== "pauseBtn") {
      el.disabled = disabled;
    }
    if(isSorting) {
      sortBtn.disabled = true;
      pauseBtn.disabled = false;
    }
    else {
      sortBtn.disabled = false;
      pauseBtn.disabled = true;
    }
  });
}

function togglePause() {
  isPaused = !isPaused;
  const pauseBtn = document.getElementById("pauseBtn");
  pauseBtn.textContent = isPaused ? "Resume" : "Pause";

  // Unlock settings when paused
  toggleControls(!isPaused);
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
      if (isCancelled) return;
      // Wait while paused
      while (isPaused) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      if (isCancelled) return;

      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";

      if (values[j] > values[j + 1]) {
        await new Promise(resolve =>
          setTimeout(resolve, parseInt(document.getElementById("speedRange").value))
        );

        if (isCancelled) return;

        // Swap values
        [values[j], values[j + 1]] = [values[j + 1], values[j]];
        bars[j].style.height = `${values[j]}px`;
        bars[j + 1].style.height = `${values[j + 1]}px`;
      }

      bars[j].style.backgroundColor = "steelblue";
      bars[j + 1].style.backgroundColor = "green";
    }
  }
  bars[0].style.backgroundColor = "green"; // First item is sorted
  isSorting = false; // Sorting complete
}

// Selection Sort

async function selectionSort() {
  const bars = document.getElementsByClassName("bar");

  for (let i = 0; i < values.length - 1; i++) {
    let minIndex = i;
    bars[minIndex].style.backgroundColor = "orange";

    for (let j = i + 1; j < values.length; j++) {
      while (isPaused) await new Promise(r => setTimeout(r, 100));
      if (isCancelled) return;

      bars[j].style.backgroundColor = "red";

      await new Promise(resolve =>
        setTimeout(resolve, parseInt(document.getElementById("speedRange").value))
      );

      if (isCancelled) return;

      if (values[j] < values[minIndex]) {
        bars[minIndex].style.backgroundColor = "steelblue";
        minIndex = j;
        bars[minIndex].style.backgroundColor = "orange";
      } else {
        bars[j].style.backgroundColor = "steelblue";
      }
    }

    // Always delay on swap to show the change:
    await new Promise(r => setTimeout(r, parseInt(document.getElementById("speedRange").value)));

    if (minIndex !== i) {
      bars[minIndex].style.backgroundColor = "purple";
      [values[i], values[minIndex]] = [values[minIndex], values[i]];
      bars[i].style.height = `${values[i]}px`;
      bars[minIndex].style.height = `${values[minIndex]}px`;
    }

    bars[i].style.backgroundColor = "green";
  }

  bars[values.length - 1].style.backgroundColor = "green";
  isSorting = false;
}

// Insertion Sort (placeholder)
async function insertionSort() {
  alert("Insertion Sort not implemented yet.");
}

function restartSort() {
  isPaused = false;
  isSorting = false;
  isCancelled = true;
  pauseBtn.textContent = "Pause";
  toggleControls(false); // Re-enable UI controls
  generateBars(); // Generate a new array
  bar.style.backgroundColor = "steelblue";
}

// Run selected algorithm
async function runSort() {
  isCancelled = false;
  isPaused = false;
  isSorting = true;
  toggleControls(true); // Lock controls

  const algo = document.getElementById("algo-select").value;

  if (algo === "bubble") await bubbleSort();
  else if (algo === "selection") await selectionSort();
  else if (algo === "insertion") await insertionSort();

  toggleControls(false); // Unlock controls
  isSorting = false; // Sorting complete
}

// Init
generateBars();
