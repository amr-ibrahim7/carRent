
import { cars } from "../carsData.js";

//  Globally accessible function for inline buttons
function selectCarAndOffer(carName, offer) {
  localStorage.setItem("carName", carName);
  localStorage.setItem("offer", offer);
  localStorage.setItem("accessedFromBookNow", "true");
  window.location.href = "bookingform.html";
}
window.selectCarAndOffer = selectCarAndOffer;

let formHandled = false;

function getCarDetailsFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const carId = parseInt(params.get("id"));
  return cars.find((car) => car.id === carId);
}

document.addEventListener("DOMContentLoaded", function () {
  const accessedFromBookNow = localStorage.getItem("accessedFromBookNow");

  const offerSelectSection = document.getElementById("offerSelectSection");
  const carSelection = document.getElementById("CarSelectSection");
  const offerSelect = document.getElementById("offerSelect");
  const carSelect = document.getElementById("carSelect");

  if (accessedFromBookNow) {
   //offersection and carSelection are visible
    if (offerSelectSection && carSelection) {
      offerSelectSection.style.display = "block";
      carSelection.style.display = "block";
    }

    const selectedOffer = localStorage.getItem("offer");
    const selectedCar = localStorage.getItem("carName");

    if (selectedOffer && offerSelect) offerSelect.value = selectedOffer;
    if (selectedCar && carSelect) carSelect.value = selectedCar;

    localStorage.setItem("carModel", selectedCar);
    localStorage.setItem("carBrand", "");
    localStorage.setItem("carId", "offer");

    localStorage.removeItem("accessedFromBookNow");
  } else {
  //offersection and carSelection are hidden
    if (offerSelectSection) offerSelectSection.style.display = "none";
    if (carSelection) carSelection.style.display = "none";
    localStorage.removeItem("offer");
    localStorage.removeItem("carName");

    const carFromUrl = getCarDetailsFromUrl();
    if (carFromUrl) {
      localStorage.setItem("carModel", carFromUrl.model);
      localStorage.setItem("carBrand", carFromUrl.brand);
      localStorage.setItem("carId", carFromUrl.id);
      localStorage.setItem("carPrice", carFromUrl.price);
    }
  }

  if (offerSelect && carSelect) {
    offerSelect.addEventListener("change", function () {
      localStorage.setItem("offer", this.value);
      localStorage.setItem("carName", carSelect.value);
      localStorage.setItem("carModel", carSelect.value);
    });

    carSelect.addEventListener("change", function () {
      localStorage.setItem("carName", this.value);
      localStorage.setItem("carModel", this.value);
      localStorage.setItem("offer", offerSelect.value);
    });
  }

  // Form submission
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      if (formHandled) return;
      formHandled = true;
      e.preventDefault();

      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const pickupLocation = document.getElementById("pickupLocation").value.trim();
      const pickupDate = document.getElementById("pickupDate").value;
      const pickupTime = document.getElementById("pickupTime").value;
      const dropoffLocation = document.getElementById("dropoffLocation").value.trim();
      const dropoffDate = document.getElementById("dropoffDate").value;
      const dropoffTime = document.getElementById("dropoffTime").value;

      const now = new Date();
      const bookingTimestamp = now.toISOString().slice(0, 16).replace("T", " ");

      if (!firstName || !lastName || !pickupDate || !pickupTime || !dropoffDate || !dropoffTime || !pickupLocation || !dropoffLocation) {
        alert("Please fill out all fields.");
        formHandled = false;
        return;
      }

      const pickup = new Date(`${pickupDate}T${pickupTime}`);
      const dropoff = new Date(`${dropoffDate}T${dropoffTime}`);
      if (pickup >= dropoff) {
        alert("Drop-off must be after pickup!");
        formHandled = false;
        return;
      }

      const diffTime = Math.abs(dropoff - pickup);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const selectedCarModel = localStorage.getItem("carModel") || "Not selected";
      const selectedCarBrand = localStorage.getItem("carBrand") || "";
      const selectedCarId = localStorage.getItem("carId") || "N/A";
      const selectedCarPrice = selectedCarId === "offer" ? "-" : `$${localStorage.getItem("carPrice")}`;
      const offer = localStorage.getItem("offer");

      document.getElementById("bookingSummary").innerHTML = `
        <strong>Car ID:</strong> ${selectedCarId}<br>
        <strong>CarModel:</strong> ${selectedCarModel}<br>
        <strong>CarBrand:</strong> ${selectedCarBrand}<br>
        <strong>Car Price:</strong> ${selectedCarPrice}<br>
        ${selectedCarId === "offer" ? `<strong>Offer Applied:</strong> ${
          offer === "1"
            ? "Free Fuel"
            : offer === "2"
            ? "20% Off"
            : offer === "3"
            ? "Extra Day Free"
            : ""
        }<br>` : ""}
        <strong>Created At:</strong> ${bookingTimestamp}<br>
        <strong>Customer:</strong> ${firstName} ${lastName}<br>
        <strong>Pickup Location:</strong> ${pickupLocation}<br>
        <strong>Pickup Date:</strong> ${pickupDate} at ${pickupTime}<br>
        <strong>Drop-off Date:</strong> ${dropoffDate} at ${dropoffTime}<br>
        <strong>Drop-off Location:</strong> ${dropoffLocation}<br>
        <strong>Total Days:</strong> ${diffDays} day(s)
      `;

      document.getElementById("confirmation").style.display = "block";

      const booking = {
        carId: selectedCarId,
        carModel: selectedCarModel,
        carBrand: selectedCarBrand,
        carPrice: selectedCarPrice,
        offer,
        createdAt: bookingTimestamp,
        firstName,
        lastName,
        pickupLocation,
        pickupDate,
        pickupTime,
        dropoffLocation,
        dropoffDate,
        dropoffTime,
        totalDays: diffDays,
      };

      const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
      bookings.push(booking);
      localStorage.setItem("bookings", JSON.stringify(bookings));
    });
  }
});
 