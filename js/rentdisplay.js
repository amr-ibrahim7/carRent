const carList = document.getElementById("carList");

function loadCars() {
  const cars = JSON.parse(localStorage.getItem("cars")) || [];
  carList.innerHTML = "";
  if (cars.length === 0) {
    const message = document.createElement("p");
    message.className = "text-center text-muted fs-4 my-5";
    message.textContent = "No cars added yet.";
    carList.appendChild(message);
    return;
  }

  cars.forEach((car, index) => {
    const carCol = document.createElement("div");
    carCol.className = "col";

    carCol.innerHTML = `
      <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
        <img src="${
          car.photo
        }" class="card-img-top" style="height: 200px; object-fit: cover;" alt="${
      car.brand
    } ${car.model}">
        <div class="card-body d-flex flex-column p-3">
          <h5 class="card-title text-capitalize">${car.brand} ${car.model}</h5>
  
          <div class="mb-2">
            <span class="badge bg-success me-1">Year: ${car.year}</span>
            <span class="badge bg-warning text-dark">${car.transmission}</span>
          </div>
  
          <p class="mb-1">Capacity: ${car.capacity} seats</p>
          <p class="fw-bold text-success fs-5">$${car.price} / day</p>
  
          <button class="btn btn-primary mt-auto fw-semibold rounded-pill px-4" onclick='bookCar(${JSON.stringify(
            car
          )})'>
            Book Now
          </button>
        </div>
      </div>
    `;
    carList.appendChild(carCol);
  });
}

function bookCar(car) {
  localStorage.setItem("carModel", car.model);
  localStorage.setItem("carBrand", car.brand);
  localStorage.setItem("carId", "custom");
  localStorage.setItem("carPrice", car.price);
  localStorage.setItem("carName", `${car.brand} ${car.model}`);
  window.location.href = "bookingform.html";
}

window.onload = loadCars;
