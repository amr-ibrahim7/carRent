import { cars } from '../carsData.js';

function getCarDetailsFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const carId = parseInt(params.get("id"));
  return cars.find((car) => car.id === carId);
}

let carFromUrl = getCarDetailsFromUrl();
let bookings = [];

document.addEventListener("DOMContentLoaded", function () {
  bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  carFromUrl = getCarDetailsFromUrl();
  if (carFromUrl) {
    localStorage.setItem("carName", `${carFromUrl.brand} ${carFromUrl.model}`);
  }

  localStorage.getItem("carName");

  renderBookingTable(bookings);
});

function renderBookingTable(bookings) {
  const tableBody = document.getElementById("bookingTableBody");

  tableBody.innerHTML = "";

  if (bookings.length === 0) {
    tableBody.innerHTML =`<tr><td colspan="7" class="text-center">No bookings found.</td></tr>`;
    return;
  }

  bookings.forEach((booking) => {
    const row = document.createElement("tr");

    const offerText =
      booking.offer === "1"
        ? "Free Fuel"
        : booking.offer === "2"
        ? "20% Off"
        : booking.offer === "3"
        ? "Extra Day Free"
        : "None";
    {
    //   <td>${carFromUrl.brand} ${carFromUrl.model}</td> 
    }
    row.innerHTML = `
    
    <td>1</td>
    
    <td>${booking.carName}</td>
    <td>${booking.firstName} ${booking.lastName}</td>
    <td>${offerText}</td>
    <td><span>${booking.pickupDate}</span> <strong>at</strong> ${booking.pickupTime} <strong>from</strong> <span class="location">${booking.pickupLocation}</span> </td>
    <td>${booking.dropoffDate} <strong>at</strong> ${booking.dropoffTime} <strong>in</strong> <span class="location">${booking.dropoffLocation}</span></td>
    <td>${booking.totalDays}  <strong>day(s)</strong></td>
    
    `;
    tableBody.appendChild(row);
  });
}

const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("input", function (e) {
  let searchItem = e.target.value.toLowerCase();

  const searching = bookings.filter((booking) => {
    return (
      booking.firstName.toLowerCase().includes(searchItem) ||
      booking.lastName.toLowerCase().includes(searchItem) ||
      booking.pickupLocation.toLowerCase().includes(searchItem) ||
      booking.dropoffLocation.toLowerCase().includes(searchItem) ||
      booking.pickupDate.includes(searchItem) ||
      booking.dropoffDate.includes(searchItem)
    );
  });
  renderBookingTable(searching);
});

document.querySelectorAll(".offer").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedOffer = e.target.innerText.trim().toLowerCase();
    if (selectedOffer === "reset filter") {
      renderBookingTable(bookings);
    } else {
      let filteredOffers = bookings.filter(
        (e) => e.offerText.toLowerCase() === selectedOffer
      );
      renderBookingTable(filteredOffers);
    }
  });
});

document.getElementById("addBookingBtn").addEventListener("click", () => {
  const firstName = prompt("Enter First Name:");
  const lastName = prompt("Enter Last Name:");
  const offer = prompt(
    "Enter Offer Code (1 = Free Fuel, 2 = 20% Off, 3 = Extra Day Free):"
  );
  const pickupDate = prompt("Enter Pickup Date (YYYY-MM-DD):");
  const pickupTime = prompt("Enter Pickup Time (HH:mm):");
  const pickupLocation = prompt("Enter Pickup Location:");
  const dropoffDate = prompt("Enter Dropoff Date (YYYY-MM-DD):");
  const dropoffTime = prompt("Enter Dropoff Time (HH:mm):");
  const dropoffLocation = prompt("Enter Dropoff Location:");
  const totalDays = prompt("Enter Total Days:");

  if (
    firstName &&
    lastName &&
    offer &&
    pickupDate &&
    pickupTime &&
    pickupLocation &&
    dropoffDate &&
    dropoffTime &&
    dropoffLocation &&
    totalDays
  ) {
    const newBooking = {
      firstName,
      lastName,
      offer,
      pickupDate,
      pickupTime,
      pickupLocation,
      dropoffDate,
      dropoffTime,
      dropoffLocation,
      totalDays,
    };

    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    renderBookingTable(bookings);
  } else {
    alert("All fields are required to add a booking.");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const adminName = localStorage.getItem("loggedInAdmin");
  if (adminName) {
    document.getElementById("admin").innerText = adminName;
  } else {
    document.getElementById("admin").innerText = "Unknown Admin";
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInAdmin"); // Clear the logged-in admin
  window.location.href = "/car/adminLogin.html"; // Redirect to login page
});