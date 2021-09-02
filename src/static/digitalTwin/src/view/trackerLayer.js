"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerLayer = void 0;
const konva_1 = __importDefault(require("konva"));
/**
 * A layer which display an overlays to track the movement entities in realtime.
 */
class TrackerLayer extends konva_1.default.Layer {
    constructor(width, height
    // allMapEquipment: Array<Equipment>,
    // workstationData: Array<SingleWorkstationData>
    ) {
        super({
            visible: true,
        });
        this.add(new konva_1.default.Rect({
            width: width,
            height: height,
            color: 'transparent',
        }));
        this.currentPositionMarker = undefined;
        this.positionHistoryMarkers = [];
        // this.workstations = new Konva.Group();
        // this.add(this.workstations);
        // this.allMapEquipment = allMapEquipment;
        // this.infoBar = new InfoBar(width, height);
        // this.workstationData = workstationData;
        // this.add(this.infoBar);
        // this.addMouseEvents();
    }
    /** Callback when a tracker position is updated. */
    onUpdate(trackerData) {
        var _a;
        this.updatePositionHistory(trackerData);
        // move the current position marker above any history
        (_a = this.currentPositionMarker) === null || _a === void 0 ? void 0 : _a.moveToTop();
        this.updateCurrentPosition(trackerData);
    }
    updateCurrentPosition(trackerData) {
        if (!trackerData.currentPosition) {
            return;
        }
        // a previous marker doesn't exist, create one and add it to the layer
        if (!this.currentPositionMarker) {
            this.currentPositionMarker = new konva_1.default.Circle({
                x: trackerData.currentPosition.x,
                y: trackerData.currentPosition.y,
                radius: trackerData.currentPosition.radius,
                fill: 'red',
            });
            this.add(this.currentPositionMarker);
        }
        // a previous marker exists, update its coordinates
        const tween = new konva_1.default.Tween({
            node: this.currentPositionMarker,
            x: trackerData.currentPosition.x,
            y: trackerData.currentPosition.y,
            radius: trackerData.currentPosition.radius,
        });
        tween.play();
    }
    updatePositionHistory(trackerData) {
        if (!trackerData.positionHistory) {
            return;
        }
        // the history will be in the order of recency, color the historical locations with the most recent
        // being the most visible
        this.positionHistoryMarkers.forEach((marker) => marker.destroy());
        trackerData.positionHistory.forEach((position) => {
            const marker = new konva_1.default.Circle({
                x: position.x,
                y: position.y,
                radius: position.radius,
                fill: 'gray',
                opacity: 0.25,
            });
            this.add(marker);
            this.positionHistoryMarkers.push(marker);
        });
    }
}
exports.TrackerLayer = TrackerLayer;
