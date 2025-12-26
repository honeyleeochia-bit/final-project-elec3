// script.js
// PlaceDog Image Generator
// Uses public PlaceDog image service (image-based API)

/* =========================
   DOM ELEMENTS
========================= */
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const generateBtn = document.getElementById("generateBtn");
const dogImage = document.getElementById("dogImage");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");

/* =========================
   UI HELPERS
========================= */

// Show / hide loading text and disable button
function setLoading(isLoading) {
  loadingEl.classList.toggle("hidden", !isLoading);
  generateBtn.disabled = isLoading;
}

// Display error message
function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
}

// Hide error message
function clearError() {
  errorEl.classList.add("hidden");
}

/* =========================
   IMAGE LOADER (NO FETCH)
========================= */
/*
  PlaceDog returns an IMAGE (not JSON).
  Images must be loaded via <img src>,
  not fetch(), due to browser CORS rules.
*/
function loadDogImage(width, height) {
  clearError();
  setLoading(true);

  // Public PlaceDog endpoint (frontend-safe)
  const imageUrl = `https://placedog.net/${width}/${height}`;

  dogImage.onload = () => {
    setLoading(false);
  };

  dogImage.onerror = () => {
    setLoading(false);
    showError("Failed to load dog image.");
  };

  dogImage.src = imageUrl;
}

/* =========================
   EVENT HANDLER
========================= */
generateBtn.addEventListener("click", () => {
  const width = widthInput.value.trim();
  const height = heightInput.value.trim();

  // Input validation
  if (!width || !height) {
    showError("Width and height are required.");
    return;
  }

  if (width <= 0 || height <= 0) {
    showError("Width and height must be positive numbers.");
    return;
  }

  loadDogImage(width, height);
});
