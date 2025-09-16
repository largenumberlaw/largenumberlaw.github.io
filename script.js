const shooters = {
    one: 0.1,
    two: 0.5,
    three: 0.79
};

let currentShooter = "one";
let shotsTaken = 0;
let shotsMade = 0;
let shotData = [];

const statistics = document.getElementById("statistics");

const ctx = document.getElementById("shotChart");
const chart = new Chart(ctx, {
  type: "scatter",
  data: {
    datasets: [{
      label: "Running Percentage",
      data: shotData,
      borderColor: "blue",
      backgroundColor: "blue",
      showLine: false // keep it pure scatter
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: "# of Shots Taken" },
        beginAtZero: true
      },
      y: {
  title: { display: true, text: "Running Percentage" },
  min: -0.05,  
  max: 1.05    // these settings are just to make the graph look nicer
}
    },
    plugins: {
      annotation: {
        annotations: {
          trueLine: {
            type: "line",
            yMin: shooters[currentShooter],
            yMax: shooters[currentShooter],
            borderColor: "red",
            borderWidth: 2,
            borderDash: [6, 6],
            display: false
          }
        }
      }
    }
  }
});
