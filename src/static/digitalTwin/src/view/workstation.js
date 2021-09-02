"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workstation = void 0;
const konva_1 = __importDefault(require("konva"));
const WORKSTATION_DEFAULT_OPACITY = 0.4;
const WORKSTATION_HOVER_OPACITY = 0.7;
const WORKSTATION_DEFAULT_COLOR = 'red';
const WORKSTATION_INFO_COLOR = 'white';
const WORKSTATION_INFO_POINTER_DIRECTION = 'down';
const WORKSTATION_INFO_POINTER_WIDTH = 10;
const WORKSTATION_INFO_POINTER_HEIGHT = 10;
const WORKSTATION_INFO_PADDING = 10;
/**
 * A class for a workstation.
 */
class Workstation extends konva_1.default.Group {
    constructor(label, equipment) {
        super({
            opacity: WORKSTATION_DEFAULT_OPACITY,
        });
        this.workstationName = label;
        this.equipment = equipment;
        this.createWorkstation();
        this.addMouseEvents();
        this.workstationInfo = new konva_1.default.Label({
            visible: false,
        });
        this.configureInfo();
        this.add(this.workstationInfo);
    }
    createWorkstation() {
        for (let i = 0; i < this.equipment.length; i++) {
            const equipment = this.equipment[i];
            this.add(new konva_1.default.Rect({
                x: equipment.x(),
                y: equipment.y(),
                width: equipment.width(),
                height: equipment.height(),
                fill: WORKSTATION_DEFAULT_COLOR,
            }));
        }
    }
    addMouseEvents() {
        this.on('mouseover', () => {
            this.opacity(WORKSTATION_HOVER_OPACITY);
            this.workstationInfo.show();
            this.moveToTop();
        });
        this.on('mousemove', () => {
            const position = this.getRelativePointerPosition();
            this.workstationInfo.x(position.x);
            this.workstationInfo.y(position.y);
        });
        this.on('mouseout', () => {
            this.opacity(WORKSTATION_DEFAULT_OPACITY);
            this.workstationInfo.hide();
        });
    }
    configureInfo() {
        this.workstationInfo.add(new konva_1.default.Tag({
            fill: WORKSTATION_INFO_COLOR,
            pointerDirection: WORKSTATION_INFO_POINTER_DIRECTION,
            pointerWidth: WORKSTATION_INFO_POINTER_WIDTH,
            pointerHeight: WORKSTATION_INFO_POINTER_HEIGHT,
        }));
        this.workstationInfo.add(new konva_1.default.Text({
            text: this.workstationName,
            padding: WORKSTATION_INFO_PADDING,
        }));
    }
}
exports.Workstation = Workstation;
