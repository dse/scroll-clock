'use strict';

function Dial(element) {
    this.element = element;
}

Dial.prototype.setValue = function (value) {
    this.lastValue = this.value != null ? this.value : value;
    this.value = value;
    this.reset = this.willReset;
    this.willReset = false;

    // transitions to zero bottom
    if (this.value === 0 && this.lastValue !== 0 && this.lastValue !== this.element.childElementCount - 1) {
        this.value = this.element.childElementCount - 1;
        this.willReset = true;
    }

    var step0, step1, step2, step3, step4;

    step0 = function () {
        if (!this.reset) {
            this.element.style.top = `calc(-1em * var(--line-height) * ${Number(this.value)})`;
        }
    }.bind(this);

    step1 = function () {
        if (this.reset) {
            this.element.style.transition = "unset";
        }
        requestAnimationFrame(step2);
    }.bind(this);

    step2 = function () {
        if (this.reset) {
            this.element.style.top = 0;
        }
        requestAnimationFrame(step3);
    }.bind(this);

    step3 = function () {
        if (this.reset) {
            this.element.style.transition = "";
        }
        requestAnimationFrame(step4);
    }.bind(this);

    step4 = function () {
        if (this.reset) {
            this.element.style.top = `calc(-1em * var(--line-height) * ${Number(this.value)})`;
        }
        this.reset = false;
    }.bind(this);

    step0();
    if (this.reset) {
        requestAnimationFrame(step1);
    }
};
