const timeDisplay = document.getElementById('timeDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;

let paused = true;
let intervalId;

let hrs = 0; 
let mins = 0;
let secs = 0;

startBtn.addEventListener("click",()=>{
    if(paused){
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime,1000);//runs each 1 second.
    }
});

pauseBtn.addEventListener("click",()=>{
    if(!paused){ //if (paused = false) then with (!) behind it, it will be true and goes into the if.
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
});

resetBtn.addEventListener("click",()=>{
    paused = true;
    clearInterval(intervalId);

    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;

    hrs = 0; 
    mins = 0;
    secs = 0;

    timeDisplay.textContent = "00:00:00";
});

function updateTime(){
    elapsedTime = Date.now() - startTime;

    secs = Math.floor((elapsedTime / 1000) % 60); //milliseconds converts to seconds in the first parenthese and divides by 60 returns the remainder.
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);

    timeDisplay.textContent = `${hrs}:${mins}:${secs}`;


    function pad (digit){
        return (("0") + digit).length > 2 ? digit : "0" + digit; //ternary operator if (0 + digit).length is more than two it means the number is decimal... otherwise we prepend a zero behind the digit.
    }
}
