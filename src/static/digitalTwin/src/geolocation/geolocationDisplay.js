"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeolocationDisplay = void 0;
const react_1 = __importDefault(require("react"));
const geolocationProvider_1 = require("./geolocationProvider");
const GeolocationErrorDisplay = ({ error }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h2", null, "Error"),
        react_1.default.createElement("table", null,
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null,
                        react_1.default.createElement("b", null, "Code")),
                    react_1.default.createElement("td", null, error.code)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null,
                        react_1.default.createElement("b", null, "Message")),
                    react_1.default.createElement("td", null, error.message))))));
};
const GeolocationPositionDisplay = ({ position }) => {
    const date = new Date(position.timestamp);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h2", null, "Position"),
        react_1.default.createElement("h3", null, "Timestamp"),
        react_1.default.createElement("p", null, date.toString()),
        react_1.default.createElement("h3", null, "Coordinates"),
        react_1.default.createElement("table", null,
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null,
                        react_1.default.createElement("b", null, "Latitude")),
                    react_1.default.createElement("td", null, position.coords.latitude)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null,
                        react_1.default.createElement("b", null, "Longitude")),
                    react_1.default.createElement("td", null, position.coords.longitude)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null,
                        react_1.default.createElement("b", null, "Altitude")),
                    react_1.default.createElement("td", null, position.coords.altitude)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null,
                        react_1.default.createElement("b", null, "Accuracy")),
                    react_1.default.createElement("td", null,
                        position.coords.accuracy,
                        " meters")),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null,
                        react_1.default.createElement("b", null, "Altitude Accuracy")),
                    react_1.default.createElement("td", null,
                        position.coords.altitudeAccuracy,
                        " meters")),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null,
                        react_1.default.createElement("b", null, "Heading")),
                    react_1.default.createElement("td", null,
                        position.coords.heading,
                        " degress from north")),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null,
                        react_1.default.createElement("b", null, "Speed")),
                    react_1.default.createElement("td", null,
                        position.coords.speed,
                        " meters per second"))))));
};
const GeolocationDisplay = () => {
    const { error, position } = geolocationProvider_1.useGeolocation();
    if (!error && !position) {
        return react_1.default.createElement("h2", null, "Loading...");
    }
    if (error) {
        return react_1.default.createElement(GeolocationErrorDisplay, { error: error });
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null, "WatchPosition"),
        react_1.default.createElement(GeolocationPositionDisplay, { position: position })));
};
exports.GeolocationDisplay = GeolocationDisplay;
