"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditableStackingArea = void 0;
const stackingArea_1 = require("../view/stackingArea");
/**
 * A stacking area that is editable.
 */
class EditableStackingArea extends stackingArea_1.StackingArea {
    constructor(posX = 0, posY = 0, labelText) {
        super(posX, posY, labelText);
        this.draggable(true);
    }
    returnInstanceOf(posX, posY) {
        return new EditableStackingArea(posX, posY);
    }
}
exports.EditableStackingArea = EditableStackingArea;
