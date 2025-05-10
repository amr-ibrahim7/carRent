import { renderCarList } from "./carRender.js";
import { cars } from "./carsData.js";
import { goToPage } from "./pagination.js";

let activeCarType = ""; // currently selected car type filter ( SUV, Sedan,)
let activeStatus = ""; // currently selected availability filter (e.g., "available" or "unavailable")
let activeSearchQuery = ""; // currently search text entered by the user
let activeView = "list"; // default view mode is "list", can be changed to "grid"

export function getFilteredCars() {
  return cars.filter((car) => {
    // Filter by selected car type if specified
    if (activeCarType && car.type !== activeCarType) {
      return false; // Car doesn't match selected type
    }

    // Filter by availability status if specified
    if (activeStatus === "available" && !car.available) {
      return false; // User wants available cars, this one isn't
    }
    if (activeStatus === "unavailable" && car.available) {
      return false; // User wants unavailable cars, this one is available
    }

    // Filter by search query if entered
    if (activeSearchQuery) {
      const query = activeSearchQuery.toLowerCase();
      return (
        car.brand.toLowerCase().includes(query) || // match brand
        car.model.toLowerCase().includes(query) || // match model
        (car.general && car.general.toLowerCase().includes(query)) // match general description if exists
      );
    }

    // If no filters block it, include the car
    return true;
  });
}
export function applyFilters() {
  goToPage(1); // reset pagination to first page when filters are changed
  renderCarList(); // Re-render the list with updated filter results
}

export function setupFilterListeners() {
  // car type dropdown filter
  const carTypeDropdown = document.getElementById("carTypeDropdown");
  if (carTypeDropdown) {
    carTypeDropdown.addEventListener("change", () => {
      activeCarType = carTypeDropdown.value; // update current filter value
      applyFilters(); // re-apply filters to update the list
    });
  }

  // Availability status dropdown filter
  const statusDropdown = document.getElementById("statusDropdown");
  if (statusDropdown) {
    statusDropdown.addEventListener("change", () => {
      activeStatus = statusDropdown.value;
      applyFilters();
    });
  }

  // text input for keyword search
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      activeSearchQuery = searchInput.value.trim(); // remove extra spaces
      applyFilters();
    });
  }

  // View mode buttons (list/grid)
  const listViewBtn = document.getElementById("listViewBtn");
  const gridViewBtn = document.getElementById("gridViewBtn");

  if (listViewBtn && gridViewBtn) {
    listViewBtn.addEventListener("click", () => {
      setActiveView("list"); // switch to list view
    });

    gridViewBtn.addEventListener("click", () => {
      setActiveView("grid"); // switch to grid view
    });
  }

  // Add new unit button
  const addUnitBtn = document.getElementById("addUnitBtn");
  if (addUnitBtn) {
    addUnitBtn.addEventListener("click", () => {
      showAddUnitModal(); // show modal to add a new car/unit
    });
  }
}

function setActiveView(viewType) {
  activeView = viewType; // save selected view mode ("list" or "grid")

  const listViewBtn = document.getElementById("listViewBtn");
  const gridViewBtn = document.getElementById("gridViewBtn");
  const carListContainer = document.getElementById("car-list-container");

  if (viewType === "list") {
    // Make "list" button active, remove "grid"
    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");

    // Apply list view styles
    carListContainer.classList.remove("grid-view");
    carListContainer.classList.add("list-view");
  } else {
    // Make "grid" button active, remove "list"
    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");

    // Apply grid view styles
    carListContainer.classList.remove("list-view");
    carListContainer.classList.add("grid-view");
  }

  renderCarList(); // update the UI with the new view mode
}

export function getActiveView() {
  return activeView; // can be "list" or "grid"
}
