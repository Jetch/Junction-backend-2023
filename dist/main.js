let prevSensorData = null;

const movementThreshold = 0.1;

const initialSliderValue = 5;

const audio1Slider = document.getElementById("myRange1");
audio1Slider.value = initialSliderValue;

const audio2Slider = document.getElementById("myRange2");
audio2Slider.value = initialSliderValue;

const audio3Slider = document.getElementById("myRange3");
audio3Slider.value = initialSliderValue;

const audio4Slider = document.getElementById("myRange4");
audio4Slider.value = initialSliderValue;

function updateSliderValue(value) {
    audio1Slider.value = value;
}

function updateSlider2Value(value) {
    audio2Slider.value = value;
    audio3Slider.value = value;
    audio4Slider.value = value;
}

// function updateSlider3Value(value) {
//     audio3Slider.value = value;
// }

// function updateSlider4Value(value) {
//     audio4Slider.value = value;
// }

function calculateAbsoluteDifference(data) {
    if (prevSensorData) {
        const diffAx = Math.abs(data.ax - prevSensorData.ax);
        const diffAy = Math.abs(data.ay - prevSensorData.ay);
        const diffAz = Math.abs(data.az - prevSensorData.az);

        const totalDiffOfA = diffAx + diffAy + diffAz;

        //shoulder up while big movement
        if (diffAx >= 4) {
            console.log('Big Movement on _A_ Detected!');
            const newValue = parseInt(audio1Slider.value) + 1;
            updateSliderValue(newValue);
            updateSlider2Value(newValue)
         
            dancer.raiseShoulder();
        }
        
        //dying
        if (Math.abs(data.ax) < 0.0025) 
        {
            console.log('Move!!!!!');          
            const newValue = parseInt(audio1Slider.value) - 1;
            updateSliderValue(newValue);
            updateSlider2Value(newValue);
            // updateSlider3Value(newValue);
//             updateSlider4Value(newValue);        

            dancer.danceFast();
        }

        //very big movement trigger lower buddy movement
        if (diffAx >= 5) {
            console.log('Very Big Movement Detected!');
            dancer.dance();
            const newValue = parseInt(audio3Slider.value) + 1;
            updateSlider2Value(newValue)
            // updateSlider4Value(newValue)
        }
    }

    prevSensorData = data;
}

function handleReceivedSensorData(data) {
    calculateAbsoluteDifference(data);
}

socket.on('motion', motionData => {
    handleReceivedSensorData(motionData);
    console.log(motionData)
});