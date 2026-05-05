'use strict';

function Dial(element) {
    this.element = element;
    this.value = 0;
    this.lastValue = 0;
    this.positioner = this.element.querySelector(".clock-dial-positioner");
    this.valueCount = this.positioner.childElementCount - 1;
}
Object.assign(Dial.prototype, {
    setValue: function (value) {
        if (value % this.valueCount === this.value % this.valueCount)
            return;
        var curValue = this.value % this.valueCount;
        var newValue = (value + this.valueCount - 1) % this.valueCount + 1;
        console.log(curValue, newValue);
        var top1 = "calc(-" + String(curValue) + " * var(--clock-font-size) * var(--clock-line-height))";
        var top2 = "calc(-" + String(newValue) + " * var(--clock-font-size) * var(--clock-line-height))";
        this.positioner.classList.remove("animating");
        requestAnimationFrame(function () {
            this.positioner.style.top = top1;
            requestAnimationFrame(function () {
                this.positioner.classList.add("animating");
                requestAnimationFrame(function () {
                    this.positioner.style.top = top2;
                }.bind(this));
            }.bind(this));
        }.bind(this));
        this.value = newValue;
    }
});

function Clock(hoursDial, minutesTensDial, minutesOnesDial, secondsTensDial, secondsOnesDial, dayDial, dateDial) {
    this.hoursDial = hoursDial;
    this.minutesTensDial = minutesTensDial;
    this.minutesOnesDial = minutesOnesDial;
    this.secondsTensDial = secondsTensDial;
    this.secondsOnesDial = secondsOnesDial;
    this.dayDial = dayDial;
    this.dateDial = dateDial;
}
Object.assign(Clock.prototype, {
    update: function (date) {
        date = date == null ? new Date() : date;
        const hours = date.getHours();
        const minutesTens = Math.floor(date.getMinutes() / 10);
        const minutesOnes = date.getMinutes() % 10;
        const secondsTens = Math.floor(date.getSeconds() / 10);
        const secondsOnes = date.getSeconds() % 10;
        const dayValue = date.getDay();
        const dateValue = date.getDate() - 1;
        this.hoursDial.setValue(hours);
        this.minutesTensDial.setValue(minutesTens);
        this.minutesOnesDial.setValue(minutesOnes);
        this.secondsTensDial.setValue(secondsTens);
        this.secondsOnesDial.setValue(secondsOnes);
        this.dayDial.setValue(dayValue);
        this.dateDial.setValue(dateValue);
    },
    start: function (date) {
        date = date == null ? new Date() : date;
        this.update(date);
        var ms = date.getTime();
        var delay = 1000 - ms % 1000;
        var then = new Date(ms + delay);
        this.timeout = setTimeout(function () {
            this.timeout = null;
            this.start(then);
        }.bind(this), delay);
    },
    stop: function () {
        if (this.timeout != null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    },
});
