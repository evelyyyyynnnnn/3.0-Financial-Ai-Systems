"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Timeseries script extracts keys from requests in a HAR file.
 * It reads the HAR file as input to update the timeseries.json.
 * A HAR file can be saved from the Network tab (see Developer tools).
 * Filter the results on the time-series API url to create the HAR file.
 * See: INPUT_PATH for the location.
 */
const promises_1 = __importDefault(require("fs/promises"));
const INPUT_PATH = "timeseries.har";
const OUTPUT_PATH = "../src/lib/timeseries.json";
const STRIP_REGEX = new RegExp("annual|quarterly|trailing");
function fileExists(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield promises_1.default
            .access(INPUT_PATH)
            .then(() => true)
            .catch(() => {
            console.log(`File not found: ${path}`);
            process.exit(1);
        });
    });
}
/* Read the HAR file. */
function getTimeseriesHAR() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fileExists(INPUT_PATH);
        const fileBuffer = yield promises_1.default.readFile(INPUT_PATH, "utf8");
        return JSON.parse(fileBuffer);
    });
}
/* Read the timeseries JSON file. */
function getTimeseriesJSON() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fileExists(OUTPUT_PATH);
        const fileBuffer = yield promises_1.default.readFile(OUTPUT_PATH, "utf8");
        return JSON.parse(fileBuffer);
    });
}
/* Main async script function. */
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const har = yield getTimeseriesHAR();
        for (const entry of har.log.entries) {
            const json = yield getTimeseriesJSON();
            const refererHeader = entry.request.headers.find((header) => header.name === "Referer");
            const typeParam = entry.request.queryString.find((header) => header.name === "type");
            if (!refererHeader) {
                throw new Error("Referer header not found.");
            }
            else if (!typeParam) {
                throw new Error("Type query parameter not found.");
            }
            else {
                console.log(`Entry: ${entry.startedDateTime}: ${refererHeader.value}`);
            }
            /* Extract the type of request from the referer. */
            const module = refererHeader.value.split("/").pop();
            const keysArray = module ? json[module] : undefined;
            /* Use the first key to confirm the module. */
            if (keysArray && !typeParam.value.includes(keysArray[0])) {
                console.log(`${module} does not contain key: ${keysArray[0]}`);
                console.log("Referer most likely does not contain the right module.");
                continue;
            }
            else if (keysArray && module) {
                const keySet = new Set(keysArray);
                const paramKeys = typeParam.value.split(",");
                console.log(`Module: ${module} with ${keySet.size} keys.`);
                console.log(`Query param includes ${paramKeys.length} keys.`);
                for (const key of paramKeys) {
                    const stripped = key.replace(STRIP_REGEX, "");
                    keySet.add(stripped);
                }
                json[module] = Array.from(keySet);
                try {
                    yield promises_1.default.writeFile(OUTPUT_PATH, JSON.stringify(json, null, 2));
                }
                catch (err) {
                    console.error(err);
                    process.exit(1);
                }
                finally {
                    const counter = keySet.size - keysArray.length;
                    console.log(`Updated ${module} with ${counter} new keys.`);
                }
            }
            else
                throw new Error(`Keys array not found for module: ${module}`);
        }
    });
}
main();
