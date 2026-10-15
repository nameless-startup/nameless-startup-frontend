const ctx = document.getElementById("financeChart");

new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "25 فروردین",
      "27 فروردین",
      "1 اردیبهشت",
      "3 اردیبهشت",
      "5 اردیبهشت",
      "7 اردیبهشت",
      "9 اردیبهشت",
      "11 اردیبهشت",
      "13 اردیبهشت",
      "15 اردیبهشت",
      "17 اردیبهشت",
      "19 اردیبهشت",
      "21 اردیبهشت",
      "23 اردیبهشت"
    ],

    datasets: [
      {
        label: "درآمد",
        data: [
          2200000,
          1800000,
          2900000,
          2400000,
          3100000,
          2600000,
          2800000,
          2000000,
          2700000,
          2300000,
          2500000,
          1700000,
          2600000,
          2100000
        ],

        borderColor: "#22c55e",
        backgroundColor: "transparent",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0
      },

      {
        label: "هزینه",
        data: [
          800000,
          1000000,
          700000,
          1200000,
          900000,
          750000,
          800000,
          1100000,
          600000,
          1250000,
          700000,
          850000,
          900000,
          650000
        ],

        borderColor: "#ef4444",
        backgroundColor: "transparent",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0
      }
    ]
  },

  options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
        align: "end"
      }
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          callback(value) {
            return value / 1000000 + "M";
          }
        }
      }
    }
  }
});