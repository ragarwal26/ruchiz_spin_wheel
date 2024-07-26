const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 61, maxDegree: 90, value: "Congratulations, you are selected" },
  { minDegree: 51, maxDegree: 80, value: "Congratulations, you are selected" },
  { minDegree: 0, maxDegree: 50, value: "Congratulations, you are selected" },
  { minDegree: 331, maxDegree: 360, value: "Congratulations, you are selected"},
  { minDegree: 301, maxDegree: 330, value: "Congratulations, you are selected"},
  // { minDegree: 271, maxDegree: 300, value: "Congratulations, you are selected" },
  // { minDegree: 277, maxDegree: 303, value: "Congratulations, you are selected"},
  { minDegree: 241, maxDegree: 270, value: "Congratulations, you are selected"},
  { minDegree: 211, maxDegree: 240, value: "Congratulations, you are selected" },
  { minDegree: 181, maxDegree: 210, value: "Congratulations, you are selected" },
  { minDegree: 151, maxDegree: 180, value: "Congratulations, you are selected"},
  { minDegree: 121, maxDegree: 150, value: "Congratulations, you are selected" },
  { minDegree: 91, maxDegree: 120, value: "Congratulations, you are selected"}
];

//Size of each piece
const data = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
//background color for eachpiece
var pieColors = [
  "#E74C3C",
  "#7D3C98",
  "#2E86C1",
  "#138D75",
  "#F1C40F",
  "#D35400",
  "#138D75",
  "#F1C40F",
  "#b163da",
  "#E74C3C",
  "#7D3C98",
  "#138D75",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: ["spin again", "Irene", "Anip", "Amanda" , "Austin" , "spin again", "Jordan","Ruchi","Amy","Adnan"],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
         color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>${i.value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};
//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
