import { cars } from "../carsData.js";

//  function to get the id of the car from the data 
function getCarDetailsFromUrl()
{
    const params = new URLSearchParams(window.location.search);
    const carId = parseInt(params.get("id"));
    return cars.find(car => car.id === carId);
}

// function to display the cars images and its data
function displayCarDetails()
{
    const car = getCarDetailsFromUrl();
    const pageHeader = document.getElementById('carMainPic');
    const generalInfo = document.getElementById('general');
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const detailsInfo = document.getElementById('detailsInfo');
    if (car)
    {
        pageHeader.innerHTML = `
            <div style = "background:linear-gradient(rgba(10, 10, 10, 0.205), rgba(10, 10, 10, 0.205)), url(${car.main_img}) center center/cover;" class="img-fluid section-image pageHeader py-5 text-center">
                <h1 class="hero-title">${car.brand}<span> ${car.model}</span></h1>
            </div>
        `
        generalInfo.innerHTML = `<p class="text-light">${car.general}</p> `
        img1.innerHTML = `
            <a href="#" data-bs-toggle="modal" data-bs-target="#modalImg1">
                <img src="${car.img1}" class="img-fluid gallery_img rounded" alt="Car 1" />
            </a>
            `;
        img2.innerHTML = `
            <a href="#" data-bs-toggle="modal" data-bs-target="#modalImg2">
                <img src="${car.img2}" class="img-fluid gallery_img rounded" alt="Car 2" />
            </a>
            `;
        detailsInfo.innerHTML = `
            <div class="bg-accent text-center rounded-top py-3">
                <p>${car.price} L.E / per day</p>
            </div>
            <div class="bg-primary-dark rounded-box padding-box mt-0">
                <p><strong>Type of this car:</strong> ${car.type}</p>
                <p><strong>Doors:</strong> ${car.doors}</p>
                <p><strong>Passengers:</strong> ${car.capacity}</p>
                <p><strong>Transmission:</strong> ${car.transmission}</p>
                <p><strong>Luggage:</strong> ${car.luggage}</p>
                <p><strong>Air Condition:</strong> ${car.air_condition}</p>
                <p><strong>Age:</strong> ${car.age}</p>
                <p><strong>Availability:</strong> <span class="${car.available ? 'text-success' : 'text-danger'}">${car.available ? 'Available' : 'Not Available'}</span></p>
                <div class="d-grid gap-2 mt-3">
                <div class="card_buttons">
                        ${
                            car.available 
                            ? `<a href="bookingform.html?id=${car.id}" class="btn btn-accent">Rent Now</a>`
                            : `<a class="btn btn-disabled">Rent Now</a>`
                        } 
                        <a href="http://wa.me/00201095343940" class="btn btn-accent-outline">WhatsApp</a>
                </div>
            </div>
        `
    }
    return car;
}

// add event so that we can expand the images after press on it 
const car = displayCarDetails();
document.addEventListener('click', function (e)
{
    if (!car)
    {
        return;
    }
    if (e.target.closest('#img1 img'))
    {
        document.getElementById('modalImg1Src').src = car.img1;
    }
    if (e.target.closest('#img2 img'))
    {
        document.getElementById('modalImg2Src').src = car.img2;
    }
});

// calling to display the cars
displayCarDetails();