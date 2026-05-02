'use strict';

function consoleReplacer(oldConsole, elt) {
    var savedConsole = oldConsole;
    var element = elt;
    function message(level, args) {
        args = [].slice.call(args);
        var line = level.toUpperCase() + ":";
        var i;
        var arg;
        for (i = 0; i < args.length; i++) {
            arg = args[i];
            if (arg === null) {
                line += " null";
                continue;
            } else if (arg === undefined) {
                line += " undefined";
                continue;
            } else {
                if (arg.constructor === String)
                    arg = String(arg);
                else if (arg.constructor === Number)
                    arg = Number(arg);
                else if (arg.constructor === Boolean)
                    arg = Boolean(arg);
                if (typeof arg === "string" || typeof arg === "number" || typeof arg === "boolean") {
                    line += " " + String(arg);
                } else {
                    line += " " + JSON.stringify(arg, null, 4);
                }
            }
            element.textContent = element.textContent + line + "\n";
        }
    }
    var newConsole = {
        log: function () {
            message("log", arguments);
        },
        error: function () {
            message("error", arguments);
        },
        info: function () {
            message("info", arguments);
        },
        warn: function () {
            message("warn", arguments);
        },
        debug: function () {
            message("debug", arguments);
        },
        assert: function () {
        },
        clear: function () {
            element.innerText = "";
        },
        count: function () {
        },
        countReset: function () {
        },
        dir: function () {
        },
        dirxml: function () {
        },
        group: function () {
        },
        groupCollapsed: function () {
        },
        groupEnd: function () {
        },
        table: function () {
        },
        time: function () {
        },
        timeEnd: function () {
        },
        timeLog: function () {
        },
        trace: function () {
        },
    };
    return newConsole;
}
