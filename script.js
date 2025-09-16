// true shooter percentages
const shooters = {
    one: 0.2,
    two: 0.6,
    three: 0.8
};

let currentShooter = "one";
let shotsTaken = 0;
let shotsMade = 0;
let shotData = [];

const statistics = document.getElementById("statistics");

// graph stuff
const ctx = document.getElementById("shotChart");
const chart = new Chart(ctx, {
  type: "scatter",
  data: {
    datasets: [{
      label: "Running % of Shots Made",
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
  title: { display: true, text: "Running % of Shots Made" },
  min: -0.05,  
  max: 1.05    // these settings are just to make the graph look nicer, should be 0 and 1 realistically
}
    },
    // true percentage line
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

function takeShot(){
    shotsTaken ++;
    const prob = shooters[currentShooter];
    const madeShot = Math.random() < prob;
    if (madeShot){
        shotsMade ++;
    }

    const runningPct = shotsMade / shotsTaken;
    shotData.push({x: shotsTaken, y: runningPct});

    statistics.textContent = `${madeShot ? "Made it!" : "Missed!"} Made ${shotsMade}/${shotsTaken} shots (${(runningPct*100).toFixed(2)}%)`;

    chart.update()

}

function takeTenShots(){
    for (let i = 0; i < 10; i++) takeShot();
}

document.getElementById("shooters").addEventListener("change", (e) => {
  currentShooter = e.target.value;
  shotsTaken = 0;
  shotsMade = 0;
  shotData.length = 0;


  chart.options.plugins.annotation.annotations.trueLine.yMin = shooters[currentShooter];
  chart.options.plugins.annotation.annotations.trueLine.yMax = shooters[currentShooter];
  chart.options.plugins.annotation.annotations.trueLine.display = false;


  statistics.textContent = "Scoring statistics:";
  chart.update();
});


// linking buttons w functions
document.getElementById("oneshot").addEventListener("click", takeShot);
document.getElementById("tenshot").addEventListener("click", takeTenShots);
document.getElementById("reveal").addEventListener("click", () => {
  chart.options.plugins.annotation.annotations.trueLine.display = true;
  chart.update();
});

