let prevSensorData = null;

const movementThreshold = 0.1;

function calculateAbsoluteDifference(data) {
    if (prevSensorData) {
        const diffAx = Math.abs(data.ax - prevSensorData.ax);
        const diffAy = Math.abs(data.ay - prevSensorData.ay);
        const diffAz = Math.abs(data.az - prevSensorData.az);

        //shoulder up while big movement
        if (diffAx >= 4) {
            console.log('Big Movement on _A_ Detected!');
            setVolumeForTrack("audio1", 0.1);
            setVolumeForTrack("audio2", 0.1);
            setVolumeForTrack("audio3", 0.1);
            setVolumeForTrack("audio4", 0.1);
            dancer.raiseShoulder();
        }
        
        //dying
        if (Math.abs(data.ax) < 0.0025) 
        {
            console.log('Move!!!!!');          
            setVolumeForTrack("audio1", -0.4);
            setVolumeForTrack("audio2", -0.4);
            setVolumeForTrack("audio3", -0.4);
            setVolumeForTrack("audio4", -0.4);

            // dancer.danceFast();
        }

        //very big movement trigger lower buddy movement
        if (diffAx >= 5) {
            console.log('Very Big Movement Detected!');
            dancer.dance();
            setVolumeForTrack("audio1", 0.1);
            setVolumeForTrack("audio2", 0.1);
            setVolumeForTrack("audio3", 0.1);
            setVolumeForTrack("audio4", 0.1);
        }
    }

    prevSensorData = data;
}

function handleReceivedSensorData(data) {
    calculateAbsoluteDifference(data);
}

socket.on('motion', motionData =>
{
    handleReceivedSensorData(motionData);
    console.log(motionData)
});