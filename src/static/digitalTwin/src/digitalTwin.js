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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalTwinEditor = exports.DigitalTwinView = exports.EquipmentType = void 0;
const react_1 = __importStar(require("react"));
const stage_1 = require("./view/stage");
const editableStage_1 = require("./edit/editableStage");
require("./styles/styles.css");
const geolocationProvider_1 = require("./geolocation/geolocationProvider");
const utmConverter_1 = require("./geolocation/utmConverter");
var equipment_1 = require("./view/equipment");
Object.defineProperty(exports, "EquipmentType", { enumerable: true, get: function () { return equipment_1.EquipmentType; } });
const DigitalTwinView = ({ workstationsData, mapData }) => {
    react_1.useEffect(() => {
        if (workstationsData === undefined || workstationsData.workstations === undefined || mapData === undefined) {
            return;
        }
        const stage = new stage_1.Stage(workstationsData.workstations, mapData.digitalTwin);
        return () => {
            stage.destroy();
        };
    }, [workstationsData, mapData]);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { id: "stage" })));
};
exports.DigitalTwinView = DigitalTwinView;
const DigitalTwinEditor = ({ nodeId, workstationsData, mapData, onSave, offset, scalingFactor, }) => {
    const { error, initialPosition, position, positionHistory } = geolocationProvider_1.useGeolocation();
    const [stage, setStage] = react_1.useState();
    const [utmConverter, setUtmConverter] = react_1.useState();
    // initialize the DigitalTwin stage
    react_1.useEffect(() => {
        if (workstationsData === undefined || workstationsData.workstations === undefined || mapData === undefined) {
            return;
        }
        const stage = new editableStage_1.EditableStage(nodeId, workstationsData.workstations, mapData.digitalTwin, onSave);
        setStage(stage);
        return () => {
            mapData.digitalTwin = stage.getMapData();
            stage.destroy();
        };
    }, [nodeId, workstationsData, mapData, onSave]);
    // initialize the UTM converter
    react_1.useEffect(() => {
        if (initialPosition) {
            let converter = utmConverter_1.createUtmConverter(initialPosition);
            setUtmConverter(converter);
        }
    }, [initialPosition]);
    // initialize the DigitalTwin tracker renderer
    react_1.useEffect(() => {
        if (!utmConverter) {
            return;
        }
        if (stage) {
            stage;
            console.log("new position: " + (position === null || position === void 0 ? void 0 : position.coords.latitude) + " " + (position === null || position === void 0 ? void 0 : position.coords.longitude));
            const toPosition = (geolocation) => {
                const utm = utmConverter.convert(geolocation);
                return {
                    x: (utm.easting - offset.easting) * scalingFactor,
                    y: (utm.northing - offset.northing) * scalingFactor,
                    radius: geolocation.coords.accuracy,
                };
            };
            const trackerData = {
                currentPosition: position ? toPosition(position) : undefined,
                positionHistory: positionHistory === null || positionHistory === void 0 ? void 0 : positionHistory.map((geolocation) => toPosition(geolocation)),
            };
            stage.onUpdateRenderers.trackerRenderer.onUpdate(trackerData);
        }
    }, [utmConverter, stage, position, positionHistory]);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { id: "buttons" },
            react_1.default.createElement("button", { id: "zoom-to-fit" }, "Zoom To Fit"),
            react_1.default.createElement("button", { id: "zoom-in" }, "Zoom In"),
            react_1.default.createElement("button", { id: "zoom-out" }, "Zoom Out"),
            react_1.default.createElement("button", { id: "workstations" }, "Preview workstations"),
            react_1.default.createElement("button", { id: "save" }, "Save")),
        react_1.default.createElement("div", { id: "editable-stage" }),
        react_1.default.createElement("div", { id: "menu" },
            react_1.default.createElement("button", { id: "copy" }, "Copy"),
            react_1.default.createElement("button", { id: "cut" }, "Cut"),
            react_1.default.createElement("button", { id: "paste" }, "Paste"),
            react_1.default.createElement("hr", null),
            react_1.default.createElement("button", { id: "delete" }, "Delete"))));
};
exports.DigitalTwinEditor = DigitalTwinEditor;
