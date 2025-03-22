var powerLeft = 499.78;
var isPowerOn = false;
var intervalID;
var audioStarted = false;

function drainPower() {
    if (isPowerOn) {
        powerLeft -= 0.11;
        document.getElementById('powerbar-text').innerText = powerLeft.toFixed(2) + '%';
    }
    if (powerLeft <= 0.06) {
        clearInterval(intervalID);
        document.getElementById('powerout').style.display = 'block';
    }
}

document.addEventListener('keypress', function (event) {
    playAudio();
    console.log('Key Presed: ' + event.key);
    if (event.key === ' ') {
        event.preventDefault();
        isPowerOn = !isPowerOn;
        console.log('Power On: ' + isPowerOn);
        if (isPowerOn && powerLeft > 0) {
            intervalID = setInterval(drainPower, 17);
            document.getElementById('powerout').style.display = 'none';
        } else {
            clearInterval(intervalID);
            document.getElementById('powerout').style.display = 'block';
        }
    }
});

document.addEventListener('scroll', playAudio);
document.addEventListener('click', playAudio);

function playAudio() {
    if(audioStarted) return;
    audioStarted = true;
    const audio = document.getElementById('audio');
    audio.play().catch(error => {
        console.log('Autoplay was blocked. User interaction is required to play the audio.');
    });
}