/*jshint curly: false */
"use strict";

function initModalToggles() {
    var toggles = Array.from(document.querySelectorAll("[data-toggle-modal]"));
    var backdrops = Array.from(document.querySelectorAll(".modal__backdrop"));
    toggles.forEach(function (toggle) {
        if (toggle.dataset.hasListener)
            return;
        toggle.dataset.hasListener = true;
        toggle.addEventListener("click", toggleClickHandler);
    });
    backdrops.forEach(function (backdrop) {
        if (backdrop.dataset.hasListener)
            return;
        backdrop.dataset.hasListener = true;
        backdrop.addEventListener("click", backdropClickHandler);
    });
}

function toggleClickHandler(event) {
    var toggle = event.target;
    var sel = toggle.getAttribute("data-toggle-modal");
    if (sel == null)
        return;
    var modal = document.querySelector(sel);
    if (!modal)
        return;
    modal.classList.toggle("show");
}

function backdropClickHandler(event) {
    var backdrop = event.target;
    var modal = backdrop.closest(".modal");
    if (!modal)
        return;
    modal.classList.toggle("show");
}
