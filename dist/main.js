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

        const totalDiffOfA = diffAx + diffAy + diffAz;

        if (diffAx >= 2) {
            console.log('Big Movement on _A_ Detected!');
            const newValue = parseInt(audio1Slider.value) + 1;
            updateSliderValue(newValue);
            console.log(audio1Slider.value);
            //can also add the drum
            const keyEvent = new KeyboardEvent('keydown', {
                key: 'f'
            });
            document.dispatchEvent(keyEvent);

            const keyUp = new KeyboardEvent('keyup', {
                key: 'f',
            });
            document.dispatchEvent(keyUp);
            Skeleton.dancer.raiseShoulder();
        }

        if (Math.abs(data.ax) < 0.03) 
        {
            console.log('Move!!!!!');                        
            const newValue = parseInt(audio1Slider.value) - 1;
            updateSliderValue(newValue);
            Skeleton.dancer.raiseShoulder();
        }

        if (diffAx >= 3) {
            console.log('Big Movement on _O_ Detected!');
            
            const mouseClickEvent = new MouseEvent('mousedown', {
                bubbles: true,
                cancelable: true,
                view: window
            });

            document.dispatchEvent(mouseClickEvent);

            const mouseUp = new MouseEvent('mouseup', {
                bubbles: true,
                cancelable: true,
                view: window
            });

            document.dispatchEvent(mouseUp);
        }
    }

    prevSensorData = data;
}

function handleReceivedSensorData(data) {
    calculateAbsoluteDifference(data);
}

// socket.on('motion', motionData => {
//     handleReceivedSensorData(motionData);
//     console.log(motionData)
// });