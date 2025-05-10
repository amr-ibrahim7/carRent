import { cars } from "../carsData.js";

// Get car details from the URL by extracting the `id` query parameter

function getCarDetailsFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const carId = parseInt(params.get("id"));
  return cars.find((car) => car.id === carId);
}

let carFromUrl = getCarDetailsFromUrl(); // Get the selected car
let bookings = [];
// Run after DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  carFromUrl = getCarDetailsFromUrl();
  if (carFromUrl) {
    localStorage.setItem("carName", `${carFromUrl.brand} ${carFromUrl.model}`);
  }

  localStorage.getItem("carName");

  renderBookingTable(bookings);
});
// Function to display bookings in the table

function renderBookingTable(bookings) {
  const tableBody = document.getElementById("bookingTableBody");

  tableBody.innerHTML = "";
  // Show message if there are no bookings

  if (bookings.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7" class="text-center">No bookings found.</td></tr>`;
    return;
  }
  // Loop through each booking and create a table row
  bookings.forEach((booking) => {
    const row = document.createElement("tr");
    // Convert offer codes to readable text
    const offerText =
      booking.offer === "1"
        ? "Free Fuel"
        : booking.offer === "2"
        ? "20% Off"
        : booking.offer === "3"
        ? "Extra Day Free"
        : "None";

    booking.offerText = offerText;

    // Populate the table row with booking details

    row.innerHTML = `
    
    <td><strong>${booking.carId}</strong></td>
    <td><span>${booking.carBrand}</span> <span class="carType">${booking.carModel}</span></td>
    <td>${booking.firstName} ${booking.lastName}</td>
    <td>${offerText}</td>
    <td><span>${booking.pickupDate}</span> <strong>at</strong> ${booking.pickupTime} <strong>from</strong> <span class="location">${booking.pickupLocation}</span> </td>
    <td>${booking.dropoffDate} <strong>at</strong> ${booking.dropoffTime} <strong>in</strong> <span class="location">${booking.dropoffLocation}</span></td>
    <td>${booking.totalDays}  <strong>day(s)</strong></td>
    
    `;
    tableBody.appendChild(row);
  });
}

// Search bar filter

const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("input", function (e) {
  let searchItem = e.target.value.toLowerCase();

  // Filter bookings by matching search text to any relevant field

  const searching = bookings.filter((booking) => {
    return (
      booking.carModel.toLowerCase().includes(searchItem) ||
      booking.carBrand.toLowerCase().includes(searchItem) ||
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

// Offer dropdown filter

document.querySelectorAll(".offer").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedOffer = e.target.innerText.trim().toLowerCase();

    if (selectedOffer === "reset filter") {
      renderBookingTable(bookings);
    } else {
      const filteredOffers = bookings.filter((booking) => {
        return booking.offerText.toLowerCase() === selectedOffer;
      });
      renderBookingTable(filteredOffers);
    }
  });
});

// Add booking manually using prompts

document.getElementById("addBookingBtn").addEventListener("click", () => {
  const carId = prompt("Enter Car ID:");
  const carBrand = prompt("Enter Car Brand:");
  const carModel = prompt("Enter Car Model:");
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

  // Ensure all fields are filled

  if (
    carId &&
    carBrand &&
    carModel &&
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
      carId,
      carBrand,
      carModel,
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
// Display logged-in admin name

window.addEventListener("DOMContentLoaded", () => {
  const adminName = localStorage.getItem("loggedInAdmin");
  if (adminName) {
    document.getElementById("admin").innerText = adminName;
  } else {
    document.getElementById("admin").innerText = "Unknown Admin";
  }
});
// Logout functionality

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInAdmin");
  window.location.href = "adminLogin.html";
});
