let hearts = 3; // Start with 3 hearts

// Update the hearts display
function updateHearts() {
  const heartsElement = document.getElementById("hearts");
  if (heartsElement) { // Ensure the element exists
    console.log("Updating hearts:", hearts);  // Debugging: log current hearts
    heartsElement.textContent = "❤️".repeat(hearts); // Show remaining hearts
    heartsElement.classList.add('lose-heart');
    setTimeout(() => heartsElement.classList.remove('lose-heart'), 500); // Remove animation class after it completes
  }
}

// Load hearts from localStorage at the start of the level
function loadHearts() {
  const savedHearts = localStorage.getItem("hearts");
  if (savedHearts) {
    hearts = parseInt(savedHearts, 10); // Convert string to number
    console.log("Loaded hearts from localStorage:", hearts);  // Debugging
  }
  updateHearts();
}

// Reset hearts to 3 when the player finishes or restarts the game
function resetHearts() {
  hearts = 3;
  localStorage.setItem("hearts", hearts); // Reset in localStorage
  console.log("Hearts reset to:", hearts); // Debugging
  updateHearts();
}

// Call this function when the player makes an incorrect move
function handleIncorrectAnswer() {
  hearts--; // Reduce hearts by 1
  console.log("Incorrect answer! Hearts left:", hearts);  // Debugging
  localStorage.setItem("hearts", hearts); // Store current hearts count
  updateHearts(); // Update the hearts display

  if (hearts === 0) {
    // Redirect to the index page if all hearts are gone
    alert("You have lost all your hearts! Redirecting to the start.");
    localStorage.removeItem("hearts");
    window.location.href = "index.html"; // Change this to your index page's actual path
  }
}

// Wait until the DOM is fully loaded before accessing the hearts element
document.addEventListener('DOMContentLoaded', function () {
  loadHearts();
  updateHearts();
});
