"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equipment = exports.EquipmentType = exports.EQUIPMENT_TEXT_SIZE = exports.EQUIPMENT_TEXT_FONT = void 0;
const konva_1 = __importDefault(require("konva"));
exports.EQUIPMENT_TEXT_FONT = 'Arial';
exports.EQUIPMENT_TEXT_SIZE = 12;
const EQUIPMENT_BORDER_COLOR = 'black';
const EQUIPMENT_BORDER_WIDTH = 1;
const EQUIPMENT_TEXT_COLOR = 'black';
const EQUIPMENT_TEXT_PADDING = 5;
const EQUIPMENT_TEXT_ALIGNMENT = 'center';
const EQUIPMENT_TEXT_VERTICAL_ALIGNMENT = 'middle';
var EquipmentType;
(function (EquipmentType) {
    EquipmentType["Chute"] = "CHUTE";
    EquipmentType["StackingArea"] = "STACKING_AREA";
})(EquipmentType = exports.EquipmentType || (exports.EquipmentType = {}));
/**
 * An abstract class for equipment that chutes and stacking areas will extend.
 */
class Equipment extends konva_1.default.Group {
    constructor(posX, posY, width, height, color, equipmentType, labelText) {
        super({
            x: posX,
            y: posY,
            width: width,
            height: height,
        });
        this.rectangle = new konva_1.default.Rect({
            width: width,
            height: height,
            fill: color,
            stroke: EQUIPMENT_BORDER_COLOR,
            strokeWidth: EQUIPMENT_BORDER_WIDTH,
        });
        this.label = new konva_1.default.Text({
            text: labelText,
            width: width,
            fontFamily: exports.EQUIPMENT_TEXT_FONT,
            fontSize: exports.EQUIPMENT_TEXT_SIZE,
            fill: EQUIPMENT_TEXT_COLOR,
            padding: EQUIPMENT_TEXT_PADDING,
            align: EQUIPMENT_TEXT_ALIGNMENT,
            verticalAlign: EQUIPMENT_TEXT_VERTICAL_ALIGNMENT,
        });
        this.label.y(height / 2 - this.label.height() / 2);
        this.add(this.rectangle);
        this.add(this.label);
        this.type = equipmentType;
    }
    getCopy() {
        const equipment = this.returnInstanceOf(this.x(), this.y());
        equipment.destroyChildren();
        equipment.setAttrs({
            width: this.width(),
            height: this.height(),
            draggable: this.draggable(),
        });
        const rectangle = this.rectangle.clone();
        equipment.rectangle = rectangle;
        equipment.add(rectangle);
        const label = this.label.clone();
        equipment.label = label;
        equipment.add(label);
        return equipment;
    }
    serialize() {
        return {
            equipmentType: this.type,
            label: this.label.text(),
            id: this.id(),
            position: {
                x: Math.round(this.x()),
                y: Math.round(this.y()),
            },
            shape: {
                dimensions: {
                    width: this.width(),
                    height: this.height(),
                },
            },
        };
    }
}
exports.Equipment = Equipment;
