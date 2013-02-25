// AHEM: only works in chrome atm

// Lazy override, not foolproof!
this.alert = this.prompt = function() {};

// Output
var output = document.getElementById("output");
output.text = function(text) {
    this.innerText = text;
    return this;
};
output.valid = function(valid) {
    this.classList.toggle("invalid", !valid);
}

// Input
var input = document.getElementById("input");
var updateOutput = function() {
    localStorage.input = input.value;

    // Put a comma at the end of any line with an =.
    // This avoids "number is not a function" errors when a subsequent line starts with ().
    var lines = input.value.split(/\n/g);
    lines.forEach(function(line, i) {
        if (!!line.match(/=/)) {
            lines[i] += ";";
        }
    });

    var evalResult = eval(lines.join("\n")),
        // http://stackoverflow.com/a/3644302
        cleanValue = parseFloat(Number(evalResult).toPrecision(16));

    output.text(cleanValue || 0).valid(true);
};
input.addEventListener("keyup", updateOutput);
input.value = localStorage.input || "";
updateOutput();

// Handle errors
window.addEventListener("error", function(e) {
    output.valid(false);
});

// Info section
var bookmarklet = document.getElementById("bookmarklet");
bookmarklet.href = "javascript:(function(){" +
    "var script = document.createElement(\"script\");" +
    "script.id = \"calc_script\";" +
    "script.src = \"" + window.location.origin + "/bookmarklet.js?\" + (+new Date());" +
    "document.body.appendChild(script);" +
"}());";
var instructions = document.getElementById("instructions");
bookmarklet.addEventListener("click", function(e) {
    window.location.hash = "";
    e.preventDefault();
});