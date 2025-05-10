import { cars } from '../carsData.js';

// the number of the car units that will be shown per page 
const carsPerPage = 4;
// the number of the current page in pagination 
let currentPage = 1;

// function that apply the filter logic in any cars
function filterCars()
{
    const query = document.getElementById("searchInput").value.toLowerCase();
    const typeValue = document.getElementById('typeFilter').value;
    const priceValue = parseInt(document.getElementById('priceFilter').value, 10);
    
    return cars.filter(car => {
        const matchesSearch = car.brand.toLowerCase().includes(query) || car.model.toLowerCase().includes(query);
        const matchesType = typeValue ? car.type === typeValue : true;
        const matchesPrice = priceValue ? car.price <= priceValue : true;
        return matchesSearch && matchesType && matchesPrice;
    });
}

// function to display cars in the container according to its data and filteration 
function displayCars(carsToDisplay)
{
    const carsContainer = document.getElementById('carsContainer');
    carsContainer.innerHTML = '';

    const startIndex = (currentPage - 1) * carsPerPage;
    const endIndex = startIndex + carsPerPage;
    const currentCars = carsToDisplay.slice(startIndex, endIndex);

    if (currentCars.length === 0)
    {
        carsContainer.innerHTML = '<p class="emptyText">No cars available with the selected filters</p>';
    }
    else
    {
        currentCars.forEach(car => {
            const carCard = `
                <div class="car_card">
                    <div class="car_image">
                        <img src="${car.image}" alt="${car.model}">
                        <div class="car_price">${car.price}L.E<span>/day</span></div>
                    </div>
                    <div class="car_details">
                        <div class="car_rating">★★★★★ <span>(500+ review)</span></div>
                        <h3 class="car_title">${car.brand} ${car.model}</h3>
                        <p class="card_text">${car.type}</p>
                        <div class="car_features">
                            <div><i class="bi bi-people-fill"></i> ${car.capacity}</div>
                            <div><i class="bi bi-gear-fill"></i> ${car.transmission}</div>
                            <div><i class="bi bi-speedometer2"></i> 24 MPG</div>
                        </div>
                        <div class="car_buttons">
                            ${
                                car.available 
                                ? `<a href="./bookingform.html?id=${car.id}" class="btn_book">Book Now</a>`
                                : `<a class="btn_book disabled">Book Now</a>`
                            }
                            <a href="./carDetails.html?id=${car.id}" class="btn_details">View Details</a>
                        </div>
                    </div>
                    ${car.available ? 
                        `<span class="cardBadge" style="background-color: #02b92a">Available</span>` : 
                        `<span class="cardBadge" style="background-color: #dc3545;">Not Available</span>`
                    }
                </div>`

            carsContainer.innerHTML += carCard;
        });
    }

    updatePagination(carsToDisplay.length);
}

// function to update the pagination (number of pages)
function updatePagination(totalCars)
{
    const paginationContainer = document.getElementById('paginationContainer');
    const totalPages = Math.ceil(totalCars / carsPerPage);
    paginationContainer.innerHTML = '';

    // previous button
    paginationContainer.innerHTML += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="goToPage(${currentPage - 1})">Previous</a>
    </li>`;

    // the buttons of the page number
    for (let i = 1; i <= totalPages; i++)
    {
        paginationContainer.innerHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>
        </li>`;
    }

    // the next button
    paginationContainer.innerHTML += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="goToPage(${currentPage + 1})">Next</a>
    </li>`;
}

// helping function to refresh the list 
function refreshCarsList()
{
    const filteredCars = filterCars();
    displayCars(filteredCars);
}

// function for the pagination page buttons
function goToPage(pageNumber)
{
    currentPage = pageNumber;
    refreshCarsList();
}
window.goToPage = goToPage; 

// event for search input 
document.getElementById("searchInput").addEventListener("input", () => {
    currentPage = 1;
    refreshCarsList();
});

// event for filter button 
document.getElementById('applyFiltersBtn').addEventListener('click', () => {
    currentPage = 1;
    refreshCarsList();
});

// event for reset button
document.getElementById('resetFiltersBtn').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('typeFilter').value = '';
    document.getElementById('priceFilter').value = '';
    currentPage = 1;
    refreshCarsList();
});

refreshCarsList();