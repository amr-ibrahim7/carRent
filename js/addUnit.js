import { renderCarList } from "./carRender.js";
import { cars } from "./carsData.js";

// Function to show the modal for adding a new car
export function showAddUnitModal() {
  const modal = document.createElement("div");
  modal.id = "addUnitModal";
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="modal-content">
      <form id="addUnitForm" enctype="multipart/form-data">
        <h2>Add New Car</h2>

        <!-- Brand input -->
        <div class="form-group">
          <label for="brand">Brand:</label>
          <input type="text" id="brand" class="form-control" required />
        </div>

        <!-- Model input -->
        <div class="form-group">
          <label for="model">Model:</label>
          <input type="text" id="model" class="form-control" required />
        </div>
        <!-- Car Type dropdown -->
        <div class="form-group">
          <label for="carType">Car Type:</label>
          <select id="carType" class="form-control" required>
            <option value="">Select Type</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Sports">Sports</option>
            <option value="Truck">Truck</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        <!-- Transmission dropdown -->
        <div class="form-group">
          <label for="transmission">Transmission:</label>
          <select id="transmission" class="form-control" required>
            <option value="">Select Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <!-- Capacity input -->
        <div class="form-group">
          <label for="capacity">Capacity:</label>
          <input type="number" id="capacity" min="1" max="10" class="form-control" required />
        </div>

        <!-- Price input -->
        <div class="form-group">
          <label for="price">Price per day ($):</label>
          <input type="number" id="price" min="0" step="0.01" class="form-control" required />
        </div>

        <!-- Image file input -->
        <div class="form-group">
          <label for="image">Car Image:</label>
          <input type="file" id="image" accept="image/*" class="form-control" />
        </div>

        <!-- Description textarea -->
        <div class="form-group">
          <label for="general">Description:</label>
          <textarea id="general" class="form-control" rows="3"></textarea>
        </div>

        <!-- Availability dropdown -->
        <div class="form-group">
          <label for="availability">Availability:</label>
          <select id="availability" class="form-control">
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>

        <!-- Action buttons -->
        <div class="modal-actions">
          <button type="submit" class="btn-save">Add Car</button>
          <button type="button" id="cancelAddButton" class="btn-cancel">Cancel</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);
  modal.style.display = "flex";

  // Cancel button closes the modal
  modal.querySelector("#cancelAddButton").onclick = () => {
    modal.remove();
  };

  // Handle form submission
  const form = modal.querySelector("#addUnitForm");
  form.onsubmit = function (e) {
    e.preventDefault();

    const fileInput = form.querySelector("#image");
    const file = fileInput.files[0];

    const newCar = {
      id: cars.length ? Math.max(...cars.map((car) => car.id)) + 1 : 1,
      brand: form.querySelector("#brand").value.trim(),
      model: form.querySelector("#model").value.trim(),
      type: form.querySelector("#carType").value,
      transmission: form.querySelector("#transmission").value,
      capacity: parseInt(form.querySelector("#capacity").value),
      price: parseFloat(form.querySelector("#price").value),
      image: file ? URL.createObjectURL(file) : "",
      general: form.querySelector("#general").value.trim(),
      available: form.querySelector("#availability").value === "true",
    };

    cars.push(newCar);
    localStorage.setItem("carsDashboard", JSON.stringify(cars));
    renderCarList();
    modal.remove();
    alert("Car added successfully!");
  };
}
