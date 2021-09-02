"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackingArea = void 0;
const equipment_1 = require("./equipment");
const STACKING_AREA_WIDTH = 80;
const STACKING_AREA_HEIGHT = 80;
const STACKING_AREA_COLOR = 'white';
const STACKING_AREA_DEFAULT_TEXT = 'Stacking Area';
/**
 * A stacking area class, which extends Equipment.
 */
class StackingArea extends equipment_1.Equipment {
    constructor(posX = 0, posY = 0, labelText = STACKING_AREA_DEFAULT_TEXT) {
        super(posX, posY, STACKING_AREA_WIDTH, STACKING_AREA_HEIGHT, STACKING_AREA_COLOR, equipment_1.EquipmentType.StackingArea, labelText);
    }
    returnInstanceOf(posX, posY) {
        return new StackingArea(posX, posY);
    }
}
exports.StackingArea = StackingArea;
