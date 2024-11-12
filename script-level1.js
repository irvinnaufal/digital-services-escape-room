// Drag-and-Drop functionality for both Mouse and Touch devices
const tasks = document.querySelectorAll(".task");
const dropZones = document.querySelectorAll(".drop-zone");
const message = document.getElementById("message");
const nextButton = document.getElementById("finish-level1-btn");

let isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
let currentDraggedTask = null;

// Attach event listeners to tasks
tasks.forEach((task) => {
  if (!isTouchDevice) {
    // Mouse events
    task.addEventListener("dragstart", dragStart);
    task.addEventListener("dragend", dragEnd);
  } else {
    // Touch events
    task.addEventListener("touchstart", touchStart);
    task.addEventListener("touchend", touchEnd);
  }
});

// Attach event listeners to drop zones
dropZones.forEach((zone) => {
  if (!isTouchDevice) {
    // Mouse events
    zone.addEventListener("dragover", dragOver);
    zone.addEventListener("drop", drop);
  } else {
    // Touch events
    zone.addEventListener("touchmove", touchMove);
    zone.addEventListener("touchend", drop);
  }
});

// Function to handle dragging start (for mouse)
function dragStart(e) {
  currentDraggedTask = e.target;
  e.dataTransfer.setData("text/plain", e.target.id);
  e.target.style.opacity = "0.5"; // Fade out while dragging
}

// Function to handle dragging end (for mouse)
function dragEnd(e) {
  e.target.style.opacity = "1"; // Reset opacity after dragging
  currentDraggedTask = null;
}

// Function to handle touch start (for touch devices)
function touchStart(e) {
  e.preventDefault(); // Prevent default touch actions
  currentDraggedTask = e.target;
  currentDraggedTask.style.opacity = "0.5"; // Fade out while dragging
}

// Function to handle touch end (for touch devices)
function touchEnd(e) {
  e.preventDefault(); // Prevent default touch actions
  currentDraggedTask.style.opacity = "1"; // Reset opacity after dragging
  checkCompletion();
  currentDraggedTask = null;
}

// Function to handle touch move (for touch devices)
function touchMove(e) {
  e.preventDefault(); // Prevent the browser's default swipe actions (back or forward)
  // You may also use touch.clientX and touch.clientY to manually move the element
  if (currentDraggedTask) {
    const touch = e.touches[0];
    currentDraggedTask.style.position = "absolute"; // Set the dragged element to absolute
    currentDraggedTask.style.left = `${
      touch.clientX - currentDraggedTask.offsetWidth / 2
    }px`; // Adjust for touch position
    currentDraggedTask.style.top = `${
      touch.clientY - currentDraggedTask.offsetHeight / 2
    }px`; // Adjust for touch position
  }
}

// Function to handle dragging over (for both mouse and touch)
function dragOver(e) {
  e.preventDefault(); // Allow dropping
}

// Function to handle drop (for both mouse and touch)
function drop(e) {
  e.preventDefault();

  let task = currentDraggedTask;
  if (!task) return;

  const targetZone = e.target;

  // Only drop into valid drop zones
  if (targetZone.classList.contains("drop-zone")) {
    targetZone.appendChild(task);
    task.style.opacity = "1"; // Reset opacity after drop
    task.classList.add("dropped"); // Add a dropped class for animation

    // Clear the message before re-checking placement
    message.textContent = "";

    // Recheck placement every time a task is dropped
    checkCompletion();
  }
}

// Function to check if all tasks are correctly placed
function checkCompletion() {
  const operationsZone = document.getElementById("it-operations");
  const solutionsZone = document.getElementById("it-solutions");

  // Check if all tasks have been placed in a drop zone
  const allTasks = document.querySelectorAll(".task");
  const allTasksPlaced = Array.from(allTasks).every((task) => {
    return (
      task.parentElement === operationsZone ||
      task.parentElement === solutionsZone
    );
  });

  if (!allTasksPlaced) {
    // Don't check placement if not all tasks have been used
    message.textContent = "Please place all tasks in a drop zone.";
    nextButton.style.display = "none"; // Hide the "Next Puzzle" button
    return;
  }

  // Correct placement validation
  let correctPlacement = true;

  // Validate IT Operations zone: Check if it contains task1 and task2 (ID-based)
  const operationsTaskIds = Array.from(operationsZone.children).map(
    (task) => task.id
  );
  if (
    !operationsTaskIds.includes("task1") ||
    !operationsTaskIds.includes("task2")
  ) {
    correctPlacement = false;
  }

  // Validate IT Solutions zone: Check if it contains task3 and task4 (ID-based)
  const solutionsTaskIds = Array.from(solutionsZone.children).map(
    (task) => task.id
  );
  if (
    !solutionsTaskIds.includes("task3") ||
    !solutionsTaskIds.includes("task4")
  ) {
    correctPlacement = false;
  }

  // Display the result based on the placement validation
  if (correctPlacement) {
    message.textContent = "All units have been assigned correctly! Well done!";
    nextButton.style.display = "inline"; // Show the "Next Puzzle" button
  } else {
    message.textContent = "Incorrect placement. Please try again.";
    handleIncorrectAnswer(); // Deduct a heart
    nextButton.style.display = "none"; // Hide the "Next Puzzle" button if wrong
  }
}

// level1.js
document.addEventListener('DOMContentLoaded', function () {
  const finishButton = document.getElementById('finish-level1-btn');
  finishButton.addEventListener('click', function () {
      // Mark Level 1 as completed in localStorage
      localStorage.setItem('level1Complete', 'true');
      window.location.href = 'level2.html'; // Redirect to Level 2
  });
});
