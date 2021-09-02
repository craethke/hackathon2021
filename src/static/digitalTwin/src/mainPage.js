"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalTwinForHackathon = void 0;
const React = __importStar(require("react"));
const ReactDOM = __importStar(require("react-dom"));
require("./styles/styles.css");
const digitalTwin_1 = require("./digitalTwin");
const utm_1 = require("geodesy/utm");
const data_json_1 = __importDefault(require("../data/data.json"));
const grid_1 = require("./edit/grid");
const geolocationDisplay_1 = require("./geolocation/geolocationDisplay");
const geolocationProvider_1 = require("./geolocation/geolocationProvider");
const DigitalTwinForHackathon = () => {
    // adjust this so that the stacking areas aren't all on top of each other or too far apart on the map
    // the larger it is, the farther apart they are
    const SCALING_FACTOR = 30;
    const minLat = Math.min(...data_json_1.default.locations.map(location => location.latitude));
    const minLong = Math.min(...data_json_1.default.locations.map(location => location.longitude));
    const offSetMin = new utm_1.LatLon(minLat, minLong).toUtm();
    const convertedEquipmentInput = data_json_1.default.locations.map(location => {
        const offsetLatLon = new utm_1.LatLon(location.latitude, location.longitude);
        return {
            "equipmentType": digitalTwin_1.EquipmentType.StackingArea,
            "label": location.locationId,
            "id": location.locationId,
            "position": {
                "x": grid_1.snapToGrid((offsetLatLon.toUtm().easting - offSetMin.easting) * SCALING_FACTOR),
                "y": grid_1.snapToGrid((offsetLatLon.toUtm().northing - offSetMin.northing) * SCALING_FACTOR),
            },
            "shape": {
                "dimensions": {
                    "width": 30,
                    "height": 30
                }
            }
        };
    });
    let newMapData = {
        facilityId: "",
        equipment: convertedEquipmentInput
    };
    //Can't input an empty list of workstations, so input a dummy workstation
    const dummyWorkStation = {
        resources: [],
        id: "",
        label: ""
    };
    return (React.createElement(geolocationProvider_1.GeolocationProvider, null,
        React.createElement(geolocationDisplay_1.GeolocationDisplay, null),
        React.createElement(digitalTwin_1.DigitalTwinEditor, { scalingFactor: SCALING_FACTOR, offset: offSetMin, workstationsData: { workstations: [dummyWorkStation] }, mapData: { digitalTwin: newMapData }, nodeId: "", onSave: (map) => { newMapData = map; } })));
};
exports.DigitalTwinForHackathon = DigitalTwinForHackathon;
ReactDOM.render(React.createElement(exports.DigitalTwinForHackathon, null), (document.getElementById('digital-twin')));
