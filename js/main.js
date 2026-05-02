"use strict";

var hoursDial;
var minutesTensDial;
var minutesOnesDial;
var secondsTensDial;
var secondsOnesDial;
var secondsTenthsDial;
var dials;

var TICK_DURATION = 1000;
var TENTHS_TICK_DURATION = 100;

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
    dials.forEach(function (dial) {
        dial.style.position = "relative";
    });
    updateClock();
    startClock();
    startTenths();
}

function next(fn) {
    return requestAnimationFrame(fn);
}

function timeout(fn, delay) {
    return setTimeout(fn, delay);
}

var hoursValue;
var minutesTensValue;
var minutesOnesValue;
var secondsTensValue;
var secondsOnesValue;
var secondsTenthsValue;

var hoursLastValue;
var minutesTensLastValue;
var minutesOnesLastValue;
var secondsTensLastValue;
var secondsOnesLastValue;
var secondsTenthsLastValue;

var hoursReset = false;
var minutesTensReset = false;
var minutesOnesReset = false;
var secondsTensReset = false;
var secondsOnesReset = false;
var secondsTenthsReset = false;

var hoursWillReset = false;
var minutesTensWillReset = false;
var minutesOnesWillReset = false;
var secondsTensWillReset = false;
var secondsOnesWillReset = false;
var secondsTenthsWillReset = false;

function updateClock(date) {
    if (date == null) {
        date = new Date();
    }

    var hours = date.getHours();
    var minutesTens = Math.floor(date.getMinutes() / 10);
    var minutesOnes = date.getMinutes() % 10;
    var secondsTens = Math.floor(date.getSeconds() / 10);
    var secondsOnes = date.getSeconds() % 10;

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

    var secondsTenths = Math.round(date.getMilliseconds() / 100);

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
    var now = new Date();
    var delay = TICK_DURATION - now % TICK_DURATION;
    var then = now.getTime() + delay;
    updateClock(new Date(then));
    timeout(startClock, delay);
}

function startTenths() {
    var now = new Date();
    var delay = TENTHS_TICK_DURATION - now % TENTHS_TICK_DURATION;
    var then = now.getTime() + delay;
    updateTenths(new Date(then));
    timeout(startTenths, delay);
}

if (document.readyState === 'complete') {
    initClock();
} else {
    window.addEventListener('load', initClock);
}
