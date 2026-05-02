'use strict';
/*global Dial */

var TICK_DURATION = 1000;
var TENTHS_TICK_DURATION = 100;

function Clock() {
    this.hoursDial         = new Dial(document.getElementById("hours"));
    this.minutesTensDial   = new Dial(document.getElementById("minutes-tens"));
    this.minutesOnesDial   = new Dial(document.getElementById("minutes-ones"));
    this.secondsTensDial   = new Dial(document.getElementById("seconds-tens"));
    this.secondsOnesDial   = new Dial(document.getElementById("seconds-ones"));
    this.secondsTenthsDial = new Dial(document.getElementById("seconds-tenths"));
}

Clock.prototype.update = function (date) {
    if (date == null)
        date = new Date();
    this.updateMain(date);
    this.updateTenths(date);
};

Clock.prototype.start = function () {
    this.startMain();
    this.startTenths();
};

Clock.prototype.updateMain = function (date) {
    if (date == null)
        date = new Date();
    var hours = date.getHours();
    var minutesTens = Math.floor(date.getMinutes() / 10);
    var minutesOnes = date.getMinutes() % 10;
    var secondsTens = Math.floor(date.getSeconds() / 10);
    var secondsOnes = date.getSeconds() % 10;
    this.hoursDial.setValue(hours);
    this.minutesTensDial.setValue(minutesTens);
    this.minutesOnesDial.setValue(minutesOnes);
    this.secondsTensDial.setValue(secondsTens);
    this.secondsOnesDial.setValue(secondsOnes);
};

Clock.prototype.updateTenths = function (date) {
    if (date == null)
        date = new Date();
    var tenths = Math.round(date.getMilliseconds() / 100);
    this.secondsTenthsDial.setValue(tenths);
};

Clock.prototype.startMain = function () {
    var now = new Date();
    var delay = TICK_DURATION - now % TICK_DURATION;
    var then = now.getTime() + delay;
    this.updateMain(new Date(then));
    setTimeout(this.startMain.bind(this), delay);
};

Clock.prototype.startTenths = function () {
    var now = new Date();
    var delay = TENTHS_TICK_DURATION - now % TENTHS_TICK_DURATION;
    var then = now.getTime() + delay;
    this.updateTenths(new Date(then));
    setTimeout(this.startTenths.bind(this), delay);
};
