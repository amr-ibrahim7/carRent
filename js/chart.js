let canvas = document.getElementById("myChart");

const ctx = document.getElementById("myChart").getContext("2d");

const bookingsChart = new Chart(ctx, {
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
        label: "Done",
        data: [300, 320, 400, 280, 300, 586, 320, 280, 350, 420, 360, 400], // Positive values
        backgroundColor: "rgb(238, 57, 96)", // Red
        stack: "combined",
        borderRadius: 5,
        borderSkipped: "bottom",
      },
      {
        label: "Canceled",
        data: [
          -300, -320, -400, -280, -300, -586, -320, -280, -350, -420, -360,
          -400,
        ], // Negative values
        backgroundColor: "#1F3044", // Dark blue
        stack: "combined",
        borderRadius: 5,
        borderSkipped: "bottom",
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
      },
      legend: {
        display: true,
        position: "top",
        align: "start",
        labels: {
          color: "#333",
          font: {
            size: 17,
          },
          usePointStyle: true,
          pointStyle: "rectRounded",
          boxWidth: 12,
          boxHeight: 12,
          padding: 10,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          color: "#e0e0e0",
          drawBorder: false,
        },
        ticks: {
          stepSize: 300,
        },
      },
    },
  },
});
