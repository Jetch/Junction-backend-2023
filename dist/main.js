import { Application } from "@splinetool/runtime";

const canvas = document.getElementById("canvas3d");
const app = new Application(canvas);
app.load("https://prod.spline.design/PIRxMzm9CSqpa2YR/scene.splinecode");

let prevSensorData = null;

const movementThreshold = 0.1;

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

        const diffGx = Math.abs(data.gx - prevSensorData.gx);
        const diffGy = Math.abs(data.gy - prevSensorData.gy);
        const diffGz = Math.abs(data.gz - prevSensorData.gz);

        const diffOx = Math.abs(data.ox - prevSensorData.ox);
        const diffOy = Math.abs(data.oy - prevSensorData.oy);
        const diffOz = Math.abs(data.oz - prevSensorData.oz);

        const totalDiffOfA = diffAx + diffAy + diffAz;
        console.log(totalDiffOfA)

        const totalDiffOfY = diffGx + diffGy + diffGz;
        console.log(totalDiffOfY)

        const totalDiffOfO = diffOx + diffOy + diffOz;
        console.log(totalDiffOfO)

        if (totalDiffOfA >= movementThreshold) {
            console.log('Big Movement on _A_ Detected!');
            const newValue = parseInt(audio1Slider.value) + 1;
            updateSliderValue(newValue);
            console.log(audio1Slider.value);
            //can also add the drum

            const keyEvent = new KeyboardEvent('keydown', {
                key: 'f',
                code: 'KeyF',
                which: 70,
                keyCode: 70,
            });
            document.dispatchEvent(keyEvent);
        }

        if (totalDiffOfY >= movementThreshold)
        {
            console.log('Big Movement on _G_ Detected!');
        }

        if (totalDiffOfO >= movementThreshold)
        {
            console.log('Big Movement on _O_ Detected!');
        }
    }

    prevSensorData = data;
}

function handleReceivedSensorData(data) {
    calculateAbsoluteDifference(data);
}

socket.on('motion', motionData => {
    handleReceivedSensorData(motionData);
});