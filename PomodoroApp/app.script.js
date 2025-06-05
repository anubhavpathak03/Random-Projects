let startBtn = document.getElementById('btn-start');
let pauseBtn = document.getElementById('btn-pause');
let resetBtn = document.getElementById('btn-reset');


let time = document.getElementById('time');

let minCount = 24;
let count = 59;
time.textContent = `${minCount + 1}:00`;

let pause = true;
let set;
let currentSession = "focus"

let audio = new Audio("alarm.m4a");

const appendZero = (value) => {
    return (value < 10) ? `0${value}` : value;
} 

startBtn.addEventListener("click", () => {
    pauseBtn.classList.add("show");
    resetBtn.classList.add("show");

    startBtn.classList.add("hide");
    startBtn.classList.remove("show");
    
    if(pause) {
        pause = false;
        time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
        // every 1 second = 1000millisecond ke baad ye function run karega 
        set = setInterval(() => {
            count--;
            time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
            if(count == 0) {
                if(minCount != 0) {
                    minCount--;
                    count = 60;
                }else {
                    clearInterval(set);
                    audio.play();
                }
            }
        }, 1000);
    }
});


const pauseTimer = () => {
    pause = true;
    clearInterval(set); // pause the setInterval function
    pauseBtn.classList.remove("show");
    resetBtn.classList.remove("show");
    startBtn.classList.remove("hide");
    audio.pause();
    audio.currentTime = 0
}
pauseBtn.addEventListener("click", pauseTimer);


const resetTimer = () => {
    pauseTimer();
    switch (currentSession) {
        case "break":
            minCount = 4
            break;
    
        default:
            minCount = 24
            break;
    }

    count = 59;
    time.textContent = `${minCount+1}:00`
    audio.pause();
    audio.currentTime = 0;
}

resetBtn.addEventListener("click", resetTimer);


let buttons = document.querySelectorAll('.btn');
console.log(buttons);

const removeFocus = () => {
    buttons.forEach((btn) => {
        btn.classList.remove("focus-btn");
    })
};


let focusButton = document.getElementById("focus");
let breakButton = document.getElementById("break");

focusButton.addEventListener("click", () =>{
    removeFocus();
    focusButton.classList.add("focus-btn");
    pauseTimer();
    minCount = 24;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
});


breakButton.addEventListener("click", () =>{
    currentSession = "break";
    removeFocus();
    breakButton.classList.add("focus-btn");
    pauseTimer();
    minCount = 4;
    count = 59;
    time.textContent = `${appendZero(minCount + 1)}:00`;
});

let colorPlateBtn = document.querySelector(".color-plate-btn");
console.log(colorPlateBtn);

let colorBtn = document.querySelector(".color-btns");
console.log(colorBtn)


colorPlateBtn.addEventListener("click", () => {
    colorPlateBtn.classList.add('hidden');
    colorBtn.classList.remove('hidden');
})


const colorButtons = colorBtn.querySelectorAll('button[id]');


const gradients = {
    red: "linear-gradient(to right, #ff4e50, #f9d423)",
    orange: "linear-gradient(to right, #f83600, #f9d423)",
    green: "linear-gradient(to right, #56ab2f, #a8e063)",
    yellow: "linear-gradient(to right, #fceabb, #f8b500)",
    blue: "linear-gradient(to right, #2193b0, #6dd5ed)",
    violet: "linear-gradient(to right, #DA22FF, #9733EE)",
    pink: "linear-gradient(to right, #ff758c, #ff7eb3)",
    purple: "linear-gradient(to right, #41295a, #2F0743)"
  };
  
  
colorButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedColor = btn.id.toLowerCase(); // matches color name
      document.body.style.background = gradients[selectedColor] || selectedColor;


      colorBtn.classList.add("hidden");
      colorPlateBtn.classList.remove("hidden");
    });
});