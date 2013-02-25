(function(exports) {
    if (exports.toggleCalc) {
        exports.toggleCalc();
        return;
    }

    var calcWidth = 400,
        scriptUrl = document.getElementById("calc_script").src,
        scriptDomain = scriptUrl.substr(0, scriptUrl.lastIndexOf("/")) + "/";

    var body = document.body,
        container = document.createElement("div");

    var iframe = document.createElement("iframe");
    iframe.src = scriptDomain + "index.html";

    var containerCss = {
        position: "fixed",
        "border-left": "1px solid #999",
        background: "#e4e4e4",
        top: 0,
        bottom: 0,
        right: 0,
        width: calcWidth + "px",
        "box-shadow": "0 0 20px rgba(0,0,0,.25)",
        "z-index": 100
    };
    for (prop in containerCss) {
        container.style[prop] = containerCss[prop];
    }

    var iframeCss = {
        position: "absolute",
        height: "100%",
        width: "100%",
        border: "none"
    };
    for (prop in iframeCss) {
        iframe.style[prop] = iframeCss[prop];
    }

    var showCalc = false,
        originalBodyPaddingRight = body.style["padding-right"];

    var toggleCalc = exports.toggleCalc = function() {
        showCalc = !showCalc;

        if (showCalc) {
            body.style["padding-right"] = calcWidth + "px";
            body.appendChild(container);
            container.appendChild(iframe);
        } else {
            body.style["padding-right"] = originalBodyPaddingRight;
            body.removeChild(container);
            container.removeChild(iframe);
        }
    };

    toggleCalc();

}(this));