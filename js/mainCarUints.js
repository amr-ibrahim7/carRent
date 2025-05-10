import { showAddUnitModal } from "./addUnit.js";
import { renderCarList } from "./carRender.js";
import { setupFilterListeners } from "./filterFunctions.js";
import { nextPage, prevPage } from "./pagination.js";

// load user profile data from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const adminName = localStorage.getItem("loggedInAdmin");

  // Update the profile name in the UI
  const profileNameElement = document.querySelector(".profile-name");
  if (profileNameElement) {
    if (adminName) {
      profileNameElement.textContent = adminName;
    } else {
      profileNameElement.textContent = "Unknown Admin";
    }
  }
});

// Set up pagination event listeners
document.getElementById("prevPageBtn").addEventListener("click", (e) => {
  e.preventDefault();
  prevPage();
});

document.getElementById("nextPageBtn").addEventListener("click", (e) => {
  e.preventDefault();
  nextPage();
});

// Initialize filters and search listeners
setupFilterListeners();

// Link "Add Unit" button to modal
document.getElementById("addUnitBtn").addEventListener("click", () => {
  showAddUnitModal();
});

// Enable search on Enter key press (if input exists)
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      renderCarList();
    }
  });
}

// Initial render of car list
renderCarList();

// Make this function accessible from HTML ( inline onclick)
window.showAddUnitModal = showAddUnitModal;
