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

function updateSlider2Value(value) {
    audio2Slider.value = value;
}

function calculateAbsoluteDifference(data) {
    if (prevSensorData) {
        const diffAx = Math.abs(data.ax - prevSensorData.ax);
        const diffAy = Math.abs(data.ay - prevSensorData.ay);
        const diffAz = Math.abs(data.az - prevSensorData.az);

        const totalDiffOfA = diffAx + diffAy + diffAz;

        //shoulder up while big movement
        if (diffAx >= 2) {
            console.log('Big Movement on _A_ Detected!');
            const newValue = parseInt(audio1Slider.value) + 1;
            updateSliderValue(newValue);
            console.log(audio1Slider.value);
            if (audio1Slider.value)
            {
                const newValue = parseInt(audio2Slider.value) + 1;
                updateSlider2Value(newValue)
            }
         
            dancer.raiseShoulder();
        }
        
        //dying
        if (Math.abs(data.ax) < 0.0065) 
        {
            console.log('Move!!!!!');                        
            const newValue = parseInt(audio1Slider.value) - 1;
            updateSliderValue(newValue);
            dancer.danceFast();
        }

        //very big movement trigger lower buddy movement
        if (diffAx >= 4) {
            console.log('Very Big Movement Detected!');
            dancer.dance();
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