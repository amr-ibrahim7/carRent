// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Line Chart for Earnings Summary
  const earningsCtx = document.getElementById("earningsChart").getContext("2d");
  const earningsChart = new Chart(earningsCtx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      datasets: [
        {
          label: "Earnings",
          data: [8000, 10000, 12000, 18450, 14000, 16000, 12000, 15000],
          fill: true,
          borderColor: "#f63854",
          tension: 0.6,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#f63854",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            display: true,
          },
          ticks: {
            callback: function (value) {
              return "$" + value;
            },
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "#ECF5FA",
          padding: 12,
          titleColor: "#B3BAC1",
          titleAlign: "center",
          titleFont: {
            size: 10,
            weight: "normal",
          },
          bodyColor: "#1C344C",
          bodyAlign: "center",
          bodyFont: {
            size: 16,
            weight: "bold",
          },
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            title: function (context) {
              return context[0].label + " 2028";
            },
            label: function (context) {
              return context.parsed.y + "$";
            },
          },
        },
      },
    },
  });

  // Bar Chart for Booking Overview
  const bookingCtx = document.getElementById("bookingChart").getContext("2d");
  const bookingChart = new Chart(bookingCtx, {
    type: "bar",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          data: [350, 900, 700, 900, 750, 850, 650, 950, 750, 700, 800, 900],
          backgroundColor: function (context) {
            return context.dataIndex === 3 ? "#f63854" : "#1e2a3b";
          },
          borderRadius: 4,
          barThickness: 20,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: "#f0f0f0",
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "#ECF5FA",
          padding: 12,
          titleColor: "#B3BAC1",
          titleAlign: "center",
          titleFont: {
            size: 10,
            weight: "normal",
          },
          bodyColor: "#1C344C",
          bodyAlign: "center",
          bodyFont: {
            size: 16,
            weight: "bold",
          },
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            title: function (context) {
              return context[0].label + " 2024";
            },
          },
        },
      },
    },
  });

  // Doughnut Chart for Rent Status
  const rentStatusCtx = document
    .getElementById("rentStatusChart")
    .getContext("2d");
  const rentStatusChart = new Chart(rentStatusCtx, {
    type: "doughnut",
    data: {
      labels: ["Hired", "Pending", "Cancelled"],
      datasets: [
        {
          data: [58, 24, 18],
          backgroundColor: ["#1e2a3b", "#f63854", "#e9ecef"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const adminName = localStorage.getItem("loggedInAdmin");

  // Update the profile name in the UI
  const profileNameElement = document.querySelector(".profile-name");
  if (profileNameElement) {
    if (adminName) {
      profileNameElement.textContent = adminName;
    } else {
      profileNameElement.textContent = "Unknown Admin";
    }
  }
});
