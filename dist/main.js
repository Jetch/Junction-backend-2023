// Variables to keep track of the previous sensor data
let prevSensorData = null;

// Threshold to consider as a "big movement"
const movementThreshold = 0.1; // You can adjust this value

const initialSliderValue = 5;

const audio1Slider = document.getElementById("myRange1");
audio1Slider.value = initialSliderValue;

function updateSliderValue(value) {
    audio1Slider.value = value;
}

function calculateAbsoluteDifference(data) {
    if (prevSensorData) {
        const diffAx = Math.abs(data.ax - prevSensorData.ax);
        const diffAy = Math.abs(data.ay - prevSensorData.ay);
        const diffAz = Math.abs(data.az - prevSensorData.az);

        const totalDiff = diffAx + diffAy + diffAz;

        if (totalDiff >= movementThreshold) {
            console.log('Big Movement on _A_ Detected!');
            const newValue = parseInt(audio1Slider.value) + 1;
            updateSliderValue(newValue);
            console.log(audio1Slider.value);
        }
    }

    prevSensorData = data;
}

// Replace this with your actual data reception code (e.g., receiving data from a socket)
// The data parameter should be the sensor data as an object
function handleReceivedSensorData(data) {
    calculateAbsoluteDifference(data);
}

// Example usage: Call handleReceivedSensorData with your sensor data
const sensorData1 = {
    ax: -0.08816913570985198,
    ay: -0.07182488076090812,
    az: 0.09079670773446559,
};

const sensorData2 = {
    ax: 0.015036168025061487,
    ay: -0.10292378337979316,
    az: 0.10995149005949496,
};

handleReceivedSensorData(sensorData1);
handleReceivedSensorData(sensorData2);
