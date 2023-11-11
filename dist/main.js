import { Application } from "@splinetool/runtime";

const canvas = document.getElementById("canvas3d");
const app = new Application(canvas);
app.load("https://prod.spline.design/PIRxMzm9CSqpa2YR/scene.splinecode");

let prevSensorData = null;

const movementThreshold = 0.1;

const initialSliderValue = 5;

const audio1Slider = document.getElementById("myRange1");
audio1Slider.value = initialSliderValue;

const audio2Slider = document.getElementById("myRange2");
audio2Slider.value = initialSliderValue;

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

        const totalDiffOfY = diffGx + diffGy + diffGz;
        console.log(totalDiffOfY)

        const totalDiffOfO = diffOx + diffOy + diffOz;
        console.log(totalDiffOfO)

        if (diffAx >= 5) {
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
            console.log('Media Movement on _G_ Detected!');
            const keyEvent = new KeyboardEvent('keydown', {
                key: 'g',
                code: 'KeyG',
                which: 70,
                keyCode: 70,
            });
            document.dispatchEvent(keyEvent);
        }

        if (totalDiffOfO >= movementThreshold)
        {
            console.log('Big Movement on _O_ Detected!');
            const keyEvent = new KeyboardEvent('keydown', {
                key: 'f',
                code: 'KeyF',
                which: 70,
                keyCode: 70,
            });
            document.dispatchEvent(keyEvent);
        }
    }

    prevSensorData = data;
}

//mock data
const sensorData1 = {
    ax: -0.08816913570985198,
    ay: -0.07182488076090812,
    az: 0.09079670773446559,
    gx: 10.554004890409118,
    gy: 3.832726501806805,
    gz: -5.092158743243797,
    ox: 339.28028106997095,
    oy: 46.7991320504088,
    oz: -3.210808919848527,
};

const sensorData2 = {
    ax: 0.015036168025061487,
    ay: -0.10292378337979316,
    az: 0.10995149005949496,
    gx: 0.028841621028715993,
    gy: 2.436569454555203,
    gz: -0.55516577986657,
    ox: 338.8166064319288,
    oy: 47.00023571952038,
    oz: -2.8027368127909433,
};


function handleReceivedSensorData(data) {
    calculateAbsoluteDifference(data);
}

// handleReceivedSensorData(sensorData1)

//test
document.addEventListener("keydown", function (event) {
    if (event.key === "f") {
        console.log("Key 'F' pressed");
    } else if (event.key === "g") {
        console.log("Key 'G' pressed");
    }
});

// document.addEventListener("keydown", function (event) {
//     if (event.key === "p") {
//         // Create a KeyboardEvent to simulate the 'F' keypress.
//         const keyEvent = new KeyboardEvent('keydown', {
//             key: 'f',
//             code: 'KeyF',
//             which: 70,
//             keyCode: 70,
//         });

//         // Dispatch the keypress event for the 'F' key.
//         document.dispatchEvent(keyEvent);
//     }
// });


socket.on('motion', motionData => {
    handleReceivedSensorData(motionData);
    console.log(motionData)
});