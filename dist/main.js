let prevSensorData = null;

const movementThreshold = 0.1;

function calculateAbsoluteDifference(data) {
    if (prevSensorData) {
        const diffAx = Math.abs(data.ax - prevSensorData.ax);
        const diffAy = Math.abs(data.ay - prevSensorData.ay);
        const diffAz = Math.abs(data.az - prevSensorData.az);

        //shoulder up while big movement
        if (diffAx >= 4) {
            setVolumeForTrack("audio1", 0.1);
            setVolumeForTrack("audio2", 0.1);
            setVolumeForTrack("audio3", 0.1);
            setVolumeForTrack("audio4", 0.1);
            dancer.raiseShoulder();
        }
        
        //dying
        if (Math.abs(data.ax) < 0.0025) 
        {   
            setVolumeForTrack("audio1", -0.6);
            setVolumeForTrack("audio2", -0.6);
            setVolumeForTrack("audio3", -0.6);
            setVolumeForTrack("audio4", -0.6);
        }

        //very big movement trigger lower buddy movement
        if (diffAx >= 5) {
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

var channel = (new Date().getTime()).toString().substr(-8);
document.getElementById("code").innerHTML = "Code for mobile app: " + channel
socket.on(channel, motionData =>
{
    handleReceivedSensorData(motionData);
});