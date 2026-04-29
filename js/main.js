"use strict";

let hoursDial;
let minutesTensDial;
let minutesOnesDial;
let secondsTensDial;
let secondsOnesDial;
let secondsTenthsDial;
let dials;

const TICK_DURATION = 1000;
const TENTHS_TICK_DURATION = 100;

function initClock() {
    hoursDial       = document.getElementById("hours");
    minutesTensDial = document.getElementById("minutes-tens");
    minutesOnesDial = document.getElementById("minutes-ones");
    secondsTensDial = document.getElementById("seconds-tens");
    secondsOnesDial = document.getElementById("seconds-ones");
    secondsTenthsDial = document.getElementById("seconds-tenths");
    dials = [
        hoursDial,
        minutesTensDial,
        minutesOnesDial,
        secondsTensDial,
        secondsOnesDial,
        secondsTenthsDial,
    ];
    dials.forEach(dial => dial.style.position = "relative");
    updateClock();
    startClock();
    startTenths();
}

// batch up requestAnimationFrame tasks requested during this
// execution cycle.
let queue = [];
// function next(fn) {
//     window.requestAnimationFrame(fn);
// }

function next(fn) {
    // if (!queue.length) {
    //     requestAnimationFrame(function () {
    //         console.log(queue.length);
    //         const exeQueue = [...queue];
    //         queue = [];
    //         for (const f of exeQueue) {
    //             f();
    //         }
    //     });
    // }
    // queue.push(fn);
    requestAnimationFrame(fn);
}

let queues = {};

function timeout(fn, delay) {
    // if (!queues[delay] || !queues[delay].length) {
    //     queues[delay] = [];
    //     setTimeout(function () {
    //         console.log(`timeout ${queues[delay].length}`);
    //         const exeQueue = [...queues[delay]];
    //         queues[delay] = [];
    //         for (const f of exeQueue) {
    //             f();
    //         }
    //     }, delay);
    // }
    // queues[delay].push(fn);
    setTimeout(fn, delay);
}

let hoursValue;
let minutesTensValue;
let minutesOnesValue;
let secondsTensValue;
let secondsOnesValue;
let secondsTenthsValue;

let hoursLastValue;
let minutesTensLastValue;
let minutesOnesLastValue;
let secondsTensLastValue;
let secondsOnesLastValue;
let secondsTenthsLastValue;

let hoursReset = false;
let minutesTensReset = false;
let minutesOnesReset = false;
let secondsTensReset = false;
let secondsOnesReset = false;
let secondsTenthsReset = false;

let hoursWillReset = false;
let minutesTensWillReset = false;
let minutesOnesWillReset = false;
let secondsTensWillReset = false;
let secondsOnesWillReset = false;
let secondsTenthsWillReset = false;

function updateClock(date) {
    if (date == null) {
        date = new Date();
    }

    const hours = date.getHours();
    const minutesTens = Math.floor(date.getMinutes() / 10);
    const minutesOnes = date.getMinutes() % 10;
    const secondsTens = Math.floor(date.getSeconds() / 10);
    const secondsOnes = date.getSeconds() % 10;

    hoursLastValue       = hoursValue       != null ? hoursValue       : hours;
    minutesTensLastValue = minutesTensValue != null ? minutesTensValue : minutesTens;
    minutesOnesLastValue = minutesOnesValue != null ? minutesOnesValue : minutesOnes;
    secondsTensLastValue = secondsTensValue != null ? secondsTensValue : secondsTens;
    secondsOnesLastValue = secondsOnesValue != null ? secondsOnesValue : secondsOnes;

    hoursValue       = hours;
    minutesTensValue = minutesTens;
    minutesOnesValue = minutesOnes;
    secondsTensValue = secondsTens;
    secondsOnesValue = secondsOnes;

    hoursReset       = hoursWillReset;
    minutesTensReset = minutesTensWillReset;
    minutesOnesReset = minutesOnesWillReset;
    secondsTensReset = secondsTensWillReset;
    secondsOnesReset = secondsOnesWillReset;

    hoursWillReset       = false;
    minutesTensWillReset = false;
    minutesOnesWillReset = false;
    secondsTensWillReset = false;
    secondsOnesWillReset = false;

    // transitions to zero bottom
    if (hoursValue === 0 && hoursLastValue !== 0 && hoursLastValue !== hoursDial.childElementCount - 1) {
        hoursValue = hoursDial.childElementCount - 1;
        hoursWillReset = true;
    }
    if (minutesTensValue === 0 && minutesTensLastValue !== 0 && minutesTensLastValue !== minutesTensDial.childElementCount - 1) {
        minutesTensValue = minutesTensDial.childElementCount - 1;
        minutesTensWillReset = true;
    }
    if (minutesOnesValue === 0 && minutesOnesLastValue !== 0 && minutesOnesLastValue !== minutesOnesDial.childElementCount - 1) {
        minutesOnesValue = minutesOnesDial.childElementCount - 1;
        minutesOnesWillReset = true;
    }
    if (secondsTensValue === 0 && secondsTensLastValue !== 0 && secondsTensLastValue !== secondsTensDial.childElementCount - 1) {
        secondsTensValue = secondsTensDial.childElementCount - 1;
        secondsTensWillReset = true;
    }
    if (secondsOnesValue === 0 && secondsOnesLastValue !== 0 && secondsOnesLastValue !== secondsOnesDial.childElementCount - 1) {
        secondsOnesValue = secondsOnesDial.childElementCount - 1;
        secondsOnesWillReset = true;
    }

    step0();
    if (hoursReset || minutesTensReset || minutesOnesReset || secondsTensReset || secondsOnesReset) {
        next(step1);
    }

    function step0() {
        if (!hoursReset) {
            hoursDial.style.top       = `calc(-1em * var(--line-height) * ${Number(hoursValue)})`;
        }
        if (!minutesTensReset) {
            minutesTensDial.style.top = `calc(-1em * var(--line-height) * ${Number(minutesTensValue)})`;
        }
        if (!minutesOnesReset) {
            minutesOnesDial.style.top = `calc(-1em * var(--line-height) * ${Number(minutesOnesValue)})`;
        }
        if (!secondsTensReset) {
            secondsTensDial.style.top = `calc(-1em * var(--line-height) * ${Number(secondsTensValue)})`;
        }
        if (!secondsOnesReset) {
            secondsOnesDial.style.top = `calc(-1em * var(--line-height) * ${Number(secondsOnesValue)})`;
        }
    }

    function step1() {
        if (hoursReset) {
            hoursDial.style.transition = "unset";
        }
        if (minutesTensReset) {
            minutesTensDial.style.transition = "unset";
        }
        if (minutesOnesReset) {
            minutesOnesDial.style.transition = "unset";
        }
        if (secondsTensReset) {
            secondsTensDial.style.transition = "unset";
        }
        if (secondsOnesReset) {
            secondsOnesDial.style.transition = "unset";
        }
        next(step2);
    }

    function step2() {
        if (hoursReset) {
            hoursDial.style.top = 0;
        }
        if (minutesTensReset) {
            minutesTensDial.style.top = 0;
        }
        if (minutesOnesReset) {
            minutesOnesDial.style.top = 0;
        }
        if (secondsTensReset) {
            secondsTensDial.style.top = 0;
        }
        if (secondsOnesReset) {
            secondsOnesDial.style.top = 0;
        }
        next(step3);
    }

    function step3() {
        if (hoursReset) {
            hoursDial.style.transition = "";
        }
        if (minutesTensReset) {
            minutesTensDial.style.transition = "";
        }
        if (minutesOnesReset) {
            minutesOnesDial.style.transition = "";
        }
        if (secondsTensReset) {
            secondsTensDial.style.transition = "";
        }
        if (secondsOnesReset) {
            secondsOnesDial.style.transition = "";
        }
        next(step4);
    }

    function step4() {
        if (hoursReset) {
            hoursDial.style.top       = `calc(-1em * var(--line-height) * ${Number(hoursValue)})`;
        }
        if (minutesTensReset) {
            minutesTensDial.style.top = `calc(-1em * var(--line-height) * ${Number(minutesTensValue)})`;
        }
        if (minutesOnesReset) {
            minutesOnesDial.style.top = `calc(-1em * var(--line-height) * ${Number(minutesOnesValue)})`;
        }
        if (secondsTensReset) {
            secondsTensDial.style.top = `calc(-1em * var(--line-height) * ${Number(secondsTensValue)})`; 
        }
        if (secondsOnesReset) {
            secondsOnesDial.style.top = `calc(-1em * var(--line-height) * ${Number(secondsOnesValue)})`;
        }
        hoursReset = false;
        minutesTensReset = false;
        minutesOnesReset = false;
        secondsTensReset = false;
        secondsOnesReset = false;
    }
}

function updateTenths(date) {
    if (date == null) {
        date = new Date();
    }

    const secondsTenths = Math.round(date.getMilliseconds() / 100);

    secondsTenthsLastValue = secondsTenthsValue != null ? secondsTenthsValue : secondsTenths;

    secondsTenthsValue = secondsTenths;

    secondsTenthsReset = secondsTenthsWillReset;

    secondsTenthsWillReset = false;

    // transitions to zero bottom
    if (secondsTenthsValue === 0 && secondsTenthsLastValue !== 0 && secondsTenthsLastValue !== secondsTenthsDial.childElementCount - 1) {
        secondsTenthsValue = secondsTenthsDial.childElementCount - 1;
        secondsTenthsWillReset = true;
    }

    step0();
    if (secondsTenthsReset) {
        next(step1);
    }

    function step0() {
        if (!secondsTenthsReset) {
            secondsTenthsDial.style.top = `calc(-1em * var(--line-height) * ${Number(secondsTenthsValue)})`;
        }
    }

    function step1() {
        if (secondsTenthsReset) {
            secondsTenthsDial.style.transition = "unset";
        }
        next(step2);
    }

    function step2() {
        if (secondsTenthsReset) {
            secondsTenthsDial.style.top = 0;
        }
        next(step3);
    }

    function step3() {
        if (secondsTenthsReset) {
            secondsTenthsDial.style.transition = "";
        }
        next(step4);
    }

    function step4() {
        if (secondsTenthsReset) {
            secondsTenthsDial.style.top = `calc(-1em * var(--line-height) * ${Number(secondsTenthsValue)})`;
        }
        secondsTenthsReset = false;
    }
}

function startClock() {
    const now = new Date();
    const delay = TICK_DURATION - now % TICK_DURATION;
    const then = now.getTime() + delay;
    updateClock(new Date(then));
    timeout(startClock, delay);
}

function startTenths() {
    const now = new Date();
    const delay = TENTHS_TICK_DURATION - now % TENTHS_TICK_DURATION;
    const then = now.getTime() + delay;
    updateTenths(new Date(then));
    timeout(startTenths, delay);
}

if (document.readyState === 'complete') {
    initClock();
} else {
    window.addEventListener('load', initClock);
}
