$(document).ready(function() {
  let myTime,
      timeWork = 25 * 60 * 1000,
      timeBreak = 5 * 60 * 1000,
      startTimer = true,
      workMode = true,
      workInstance = timeWork,
      breakInstance = timeBreak;
  
  //  Getters to grab minutes and seconds
  const getMin = (timeFcn) => Math.floor(timeFcn / (60 * 1000));
  const getSec = (timeFcn) => timeFcn % (60 * 1000) / 1000;
  
  //  Takes current global timer and displays it on app
  const formatSec = (time, element) => {
    let min = (getMin(time) >= 10) ? getMin(time) : "0" + getMin(time),
        sec = getSec(time);
    
    if (sec < 10) {
      $(element).text(min + ':0' + sec);
    } else {
      $(element).text(min + ':' + sec);
    }
  }
  
  //  Subtracts one second from global timer, and switches timers if current timer goes to 0
  const timeTurner = () => {
    if (workMode) {
      timeWork -= 1000;
      formatSec(timeWork, '.timer');    //  Updates the timer instance of work mode
      
      if (timeWork === 0) {
        formatSec(workInstance, '#WorkTimer');
        timeWork = workInstance;
        workMode = false;
      }
    } else {
      timeBreak -= 1000;
      formatSec(timeBreak, '.timer2');   //  Updates the timer instance of break mode
      
      if (timeBreak === 0) {
        formatSec(breakInstance, '#BreakTimer');
        timeBreak = breakInstance;
        workMode = true;
      }
    }
  }
  
  //  Helper functions that alter UI
  const workChange = () => {
    formatSec(timeWork, '#WorkTimer');
    if (workMode) formatSec(timeWork, '#Timer');
    workInstance = timeWork;
  }

  const breakChange = () => {
    formatSec(timeBreak, '#BreakTimer');
    if (!workMode) formatSec(timeBreak, '#Timer')
    breakInstance = timeBreak;
  }
  
  //  Timer click toggers work / break timer
  $('#Timer').on('click', function() {
    if (startTimer) {
      myTime = setInterval(timeTurner, 1000);
      startTimer = false;
    } else {
      clearInterval(myTime);
      startTimer = true;
    }
  })
  
  //  Adds one minute from the work timer
  $('#WorkPlus').on('click', function() {
    if (startTimer) {
      timeWork = getMin(timeWork) * (60 * 1000) + 60 * 1000;
      workChange();
    }
  })
  
  //  Subtracts one minute from the work timer
  $('#WorkMinus').on('click', function() {
    if (startTimer) {
      if (getMin(timeWork) > 1) {
        timeWork = getMin(timeWork) * (60 * 1000) - 60 * 1000;
        workChange();
      }
    }
  })
  
  //  Adds one minute from the break timer
  $('#BreakPlus').on('click', function() {
    if (startTimer) {
      timeBreak = getMin(timeBreak) * (60 * 1000) + 60 * 1000;
      breakChange();
    }
  })
  
  //  Subtracts one minute from the break timer
  $('#BreakMinus').on('click', function() {
    if (startTimer) {
      if (getMin(timeBreak) > 1) {
        timeBreak = getMin(timeBreak) * (60 * 1000) - 60 * 1000;
        breakChange();
      }
    }
  })
  
  formatSec(timeWork, '.timer');
  formatSec(timeBreak, '#BreakTimer');
})