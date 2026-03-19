"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = csv2json;
// Partial implementation that covers everything we need
const DELIMITER = ",";
function camelize(str) {
    return str
        .split(" ")
        .map((str, i) => i === 0
        ? str.toLowerCase()
        : str[0].toUpperCase() + str.substr(1).toLowerCase())
        .join("");
}
function convert(input) {
    if (input.match(/\d{4,4}-\d{2,2}-\d{2,2}/))
        return new Date(input);
    if (input.match(/^[0-9\.]+$/))
        return parseFloat(input);
    if (input === "null")
        return null;
    return input;
}
function csv2json(csv) {
    const lines = csv.split("\n");
    // Actually we should handle this case, i.e. headers but no data.
    // if (lines.length === 1)
    //  throw new Error("No newlines in: " + csv);
    const headers = lines.shift().split(DELIMITER).map(camelize);
    const out = new Array(lines.length);
    for (let i = 0; i < lines.length; i++) {
        const inRow = lines[i].split(DELIMITER);
        const outRow = (out[i] = {});
        for (let j = 0; j < inRow.length; j++) {
            outRow[headers[j]] = convert(inRow[j]);
        }
    }
    return out;
}
