document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("bookingsContainer");

  if (!container) {
    console.error("bookingsContainer element not found.");
    return;
  }

  // Sort toggle state
  let sortByDateAsc = true;

  // Create sort button
  const sortBtn = document.createElement("button");
  sortBtn.className = "btn btn-success mb-3";
  sortBtn.textContent = "Sort by Date ↑";
  sortBtn.addEventListener("click", function () {
    sortByDateAsc = !sortByDateAsc;
    sortBtn.textContent = `Sort by Date ${sortByDateAsc ? "↑" : "↓"}`;
    loadBookings();
  });
  container.parentNode.insertBefore(sortBtn, container);

  function loadBookings() {
    let bookings;
    try {
      bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    } catch (e) {
      console.error("Failed to load bookings from localStorage:", e);
      container.innerHTML = `<p class="text-danger">An error occurred while loading bookings.</p>`;
      return;
    }

    container.innerHTML = "";

    if (bookings.length === 0) {
      container.innerHTML = `<p class="text-muted">No saved bookings found.</p>`;
      return;
    }

    // Sort by createdAt date
    bookings.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return sortByDateAsc ? dateA - dateB : dateB - dateA;
    });

    const table = document.createElement("table");
    table.className = "table table-bordered table-striped";

    table.innerHTML = `
      <thead class="table-success">
        <tr>
           <th>ID</th>
      <th>Booked At</th>
      <th>CarModel</th>
      <th>CarBrand</th>
      <th>price</th>
      <th>name</th>
      <th>offer</th>
      <th>pick up</th>
            <th>drop off</th>

      <th>Duration (Days)</th>
      <th>Cancel</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");
    

    bookings.forEach((booking, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
       <td>${index + 1}</td>
<td>${booking.createdAt || "N/A"}</td>
<td>${booking.carModel}</td>
<td>${booking.carBrand}</td>
<td>${booking.carPrice}</td>

        
        <td>${booking.firstName} ${booking.lastName}</td>
        <td>${
          booking.offer === "1"
            ? "Free Fuel"
            : booking.offer === "2"
            ? "20% Off"
            : booking.offer === "3"
            ? "Extra Day Free"
            : ""
        }</td>
        <td>${booking.pickupLocation}<br>${booking.pickupDate} ${
        booking.pickupTime
      }</td>
        <td>${booking.dropoffLocation}<br>${booking.dropoffDate} ${
        booking.dropoffTime
      }</td>
        <td>${booking.totalDays}</td>
        <td><button class="btn btn-sm btn-danger" onclick="deleteBooking(${index})">Cancel reservation</button></td>
      `;

      tbody.appendChild(row);
    });

    const responsiveWrapper = document.createElement("div");
    responsiveWrapper.className = "table-responsive";
    responsiveWrapper.appendChild(table);
    container.appendChild(responsiveWrapper);
  }

  // Delete logic
  window.deleteBooking = function (index) {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    if (confirm("Are you sure you want to cancel this booking?")) {
      bookings.splice(index, 1);
      localStorage.setItem("bookings", JSON.stringify(bookings));
      loadBookings();
    }
  };

  loadBookings();
});
