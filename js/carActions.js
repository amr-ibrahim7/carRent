import { renderCarList } from "./carRender.js";
import { cars } from "./carsData.js";

// load the data from localStorage if available
if (localStorage.getItem("carsDashboard")) {
  const savedCars = JSON.parse(localStorage.getItem("carsDashboard"));
  cars.splice(0, cars.length);
  savedCars.forEach((car) => cars.push(car));
}

export function selectCar(id) {
  console.log(`car #${id} selected`);
}

export function editCar(id) {
  const car = cars.find((c) => c.id === id);

  const modal = document.createElement("div");
  modal.id = "editModal";
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-content">
      <form id="editForm">
        <h2>Edit Car #${id}</h2>

        <label for="editPrice">Price:</label>
        <input type="number" id="editPrice" value="${car.price}" />

        <label for="editGeneral">Description:</label>
        <textarea id="editGeneral" rows="6">${car.general}</textarea>

          <label for="editAvailable">Availability:</label>
      <select id="editAvailable">
        <option value="true" ${
          car.available ? "selected" : ""
        }>Available</option>
        <option value="false" ${
          !car.available ? "selected" : ""
        }>Not Available</option>
      </select>

        <div class="modal-actions">
          <button type="submit" class="btn-save">Save Changes</button>
          <button type="button" id="cancelButton" class="btn-cancel">Cancel</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);
  modal.style.display = "flex";

  document.getElementById("editForm").onsubmit = function (e) {
    e.preventDefault();
    car.price = parseFloat(document.getElementById("editPrice").value);
    car.general = document.getElementById("editGeneral").value;
    car.available = document.getElementById("editAvailable").value === "true";

    localStorage.setItem("carsDashboard", JSON.stringify(cars));
    modal.remove();
    renderCarList();
  };

  document.getElementById("cancelButton").onclick = function () {
    modal.remove();
  };
}

export function deleteCar(id) {
  const car = cars.find((c) => c.id === id);
  const modal = document.createElement("div");
  modal.id = "deleteModal";
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Delete Car #${id}</h2>
      <p>Are you sure you want to delete this car?</p>
      <div class="modal-actions">
        <button id="confirmDelete" class="btn-delete">Yes, Delete</button>
        <button id="cancelDelete" class="btn-cancel">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  modal.style.display = "flex";

  document.getElementById("confirmDelete").onclick = function () {
    const index = cars.findIndex((c) => c.id === id);
    if (index !== -1) {
      cars.splice(index, 1);
      localStorage.setItem("carsDashboard", JSON.stringify(cars));
      renderCarList();
    }
    modal.remove();
  };

  document.getElementById("cancelDelete").onclick = function () {
    modal.remove();
  };
}

window.editCar = editCar;
window.deleteCar = deleteCar;
window.selectCar = selectCar;
