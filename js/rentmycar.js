const carForm = document.getElementById('carForm');
const carList = document.getElementById('carList');

function loadCars() {
    const cars = JSON.parse(localStorage.getItem('cars')) || [];
    carList.innerHTML = '';

    cars.forEach((car, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';

        const card = document.createElement('div');
        card.className = 'car-card card';


        card.innerHTML = `
        <img src="${car.photo}" class="card-img-top" alt="Car Photo">
        <div class="card-body">
            <h5 class="card-title">${car.brand} ${car.model}</h5>
            <p class="card-text">
                Year: ${car.year}<br>
                Price: $${car.price} / day<br>
                Transmission: ${car.transmission}<br>
                Capacity: ${car.capacity} seats
            </p>
            <button class="btn btn-danger btn-sm me-2" onclick="deleteCar(${index})">Delete</button>
            <button class="btn btn-warning btn-sm" onclick="editCar(${index})">Edit</button>
        </div>
    `;

        col.appendChild(card);
        carList.appendChild(col);
    });
}

function deleteCar(index) {
    const cars = JSON.parse(localStorage.getItem('cars')) || [];
    if (confirm("Are you sure you want to delete this car?")) {
        cars.splice(index, 1);
        localStorage.setItem('cars', JSON.stringify(cars));
        loadCars();
    }
}

function editCar(index) {
    const cars = JSON.parse(localStorage.getItem('cars')) || [];
    const car = cars[index];

    const newBrand = prompt("Edit brand:", car.brand) || car.brand;
    const newModel = prompt("Edit model:", car.model) || car.model;
    const newYear = prompt("Edit year:", car.year) || car.year;
    const newPrice = prompt("Edit price:", car.price) || car.price;
    const newTransmission = prompt("Edit transmission (Automatic/Manual):", car.transmission) || car.transmission;
    const newCapacity = prompt("Edit capacity:", car.capacity) || car.capacity;

    const wantToChangePhoto = confirm("Do you want to change the photo?");

    if (wantToChangePhoto) {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/jpeg';

        fileInput.onchange = function () {
            const file = fileInput.files[0];
            if (file && file.type !== "image/jpeg") {
                alert("Only JPG images are supported.");
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                const newPhoto = e.target.result;

                cars[index] = {
                    brand: newBrand,
                    model: newModel,
                    year: newYear,
                    price: newPrice,
                    transmission: newTransmission,
                    capacity: newCapacity,
                    photo: newPhoto
                };

                localStorage.setItem('cars', JSON.stringify(cars));
                loadCars();
            };
            reader.readAsDataURL(file);
        };

        fileInput.click();
    } else {
        cars[index] = {
            brand: newBrand,
            model: newModel,
            year: newYear,
            price: newPrice,
            transmission: newTransmission,
            capacity: newCapacity,
            photo: car.photo
        };
        localStorage.setItem('cars', JSON.stringify(cars));
        loadCars();
    }
}

carForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const price = document.getElementById('price').value;
    const transmission = document.getElementById('transmission').value;
    const capacity = document.getElementById('capacity').value;
    const photoInput = document.getElementById('photo');

    const file = photoInput.files[0];
    if (file.type !== "image/jpeg") {
        alert('Only JPG images are allowed!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const photoBase64 = e.target.result;

        const newCar = { brand, model, year, price, transmission, capacity, photo: photoBase64 };
        const cars = JSON.parse(localStorage.getItem('cars')) || [];
        cars.push(newCar);
        localStorage.setItem('cars', JSON.stringify(cars));

        carForm.reset();
        loadCars();

        // Show toast
        const toastElement = document.getElementById('carAddedToast');
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    };

    reader.readAsDataURL(file);
});

window.onload = loadCars;