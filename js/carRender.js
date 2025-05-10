import { deleteCar, editCar, selectCar } from "./carActions.js";
import { cars } from "./carsData.js";
import { getActiveView, getFilteredCars } from "./filterFunctions.js";
import { currentPage, itemsPerPage, updatePagination } from "./pagination.js";

export function getCurrentPageCars() {
  const filteredCars = getFilteredCars();

  const start = (currentPage - 1) * itemsPerPage;
  return filteredCars.slice(start, start + itemsPerPage);
}

function getStatusBadge(available) {
  return `<span class="status-badge ${
    available ? "available" : "unavailable"
  }">${available ? "Available" : "Unavailable"}</span>`;
}

export function renderCarList() {
  const carListContainer = document.getElementById("car-list-container");
  const currentCars = getCurrentPageCars();
  const activeView = getActiveView();

  carListContainer.innerHTML = "";

  if (currentCars.length === 0) {
    carListContainer.innerHTML = "<p class='no-cars-message'>No cars found</p>";
    updatePagination(getFilteredCars().length);
    return;
  }

  if (activeView === "grid") {
    renderGridView(carListContainer, currentCars);
  } else {
    renderListView(carListContainer, currentCars);
  }

  updatePagination(getFilteredCars().length);
}

function renderListView(container, cars) {
  cars.forEach((car) => {
    const carCard = document.createElement("div");
    carCard.className = "car-unit-card";

    carCard.innerHTML = `
      <div class="row align-items-center">
        <div class="col-md-2">
          <img src="${car.image || car.photo}" class="car-image" alt="${
      car.brand
    } ${car.model}" />
        </div>
        <div class="col-md-2">
          <div class="car-brand">${car.brand}</div>
          <h4 class="car-model">${car.model}</h4>
          ${getStatusBadge(car.available)}
        </div>
        <div class="col-md-1 text-center">
          <div class="feature-icon"><i class="bi bi-gear"></i></div>
          <div class="feature-label">Transmission</div>
          <div class="feature-value">${car.transmission}</div>
        </div>
        <div class="col-md-2 text-center">
          <div class="feature-icon"><i class="bi bi-people"></i></div>
          <div class="feature-label">Capacity</div>
          <div class="feature-value">${car.capacity || "N/A"}</div>
        </div>
        <div class="col-md-2">
          <div class="price-label">Price</div>
          <div class="price-value">${
            car.price
          } L.E<span class="price-period">/days</span></div>
        </div>
        <div class="col-md-1 text-center">
          <button class="btn btn-danger rounded-pill px-4" onclick="selectCar(${
            car.id
          })">Select</button>
        </div>
        <div class="col-md-2 text-end">
          <button class="btn btn-light btn-sm me-2" onclick="editCar(${
            car.id
          })">Edit</button>
          <button class="btn btn-light btn-sm" onclick="deleteCar(${
            car.id
          })">Delete</button>
        </div>
      </div>`;

    container.appendChild(carCard);
  });
}

function renderGridView(container, cars) {
  const gridContainer = document.createElement("div");
  gridContainer.className = "row car-grid";

  cars.forEach((car) => {
    const carCard = document.createElement("div");
    carCard.className = "col-md-4 mb-4";

    carCard.innerHTML = `
      <div class="card car-grid-card">
        <img src="${car.image}" class="card-img-top" alt="${car.brand} ${
      car.model
    }">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h5 class="card-title">${car.brand} ${car.model}</h5>
              ${getStatusBadge(car.available)}
            </div>
            <div class="price-tag">
              $${car.price}<span class="price-period">/days</span>
            </div>
          </div>
          
          <div class="car-features mt-3">
            <span class="feature"><i class="bi bi-gear"></i> ${
              car.transmission
            }</span>
            <span class="feature"><i class="bi bi-people"></i> ${
              car.capacity
            } Persons</span>
            <span class="feature"><i class="bi bi-car-front"></i> ${
              car.type || "N/A"
            }</span>
          </div>
          
          <div class="card-actions mt-3">
            <button class="btn btn-danger w-100 mb-2" onclick="selectCar(${
              car.id
            })">Select</button>
            <div class="d-flex justify-content-between">
              <button class="btn btn-light flex-fill me-2" onclick="editCar(${
                car.id
              })">Edit</button>
              <button class="btn btn-light flex-fill" onclick="deleteCar(${
                car.id
              })">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;

    gridContainer.appendChild(carCard);
  });

  container.appendChild(gridContainer);
}
