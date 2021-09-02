"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chute = void 0;
const equipment_1 = require("./equipment");
const CHUTE_WIDTH = 80;
const CHUTE_HEIGHT = 480;
const CHUTE_COLOR = 'gray';
const CHUTE_DEFAULT_TEXT = 'Chute';
/**
 * A chute class, which extends Equipment.
 */
class Chute extends equipment_1.Equipment {
    constructor(posX = 0, posY = 0, labelText = CHUTE_DEFAULT_TEXT, width = CHUTE_WIDTH, height = CHUTE_HEIGHT) {
        super(posX, posY, width, height, CHUTE_COLOR, equipment_1.EquipmentType.Chute, labelText);
    }
    returnInstanceOf(posX, posY) {
        return new Chute(posX, posY);
    }
}
exports.Chute = Chute;
