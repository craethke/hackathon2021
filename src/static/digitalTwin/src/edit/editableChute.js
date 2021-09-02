"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditableChute = void 0;
const chute_1 = require("../view/chute");
const grid_1 = require("./grid");
/**
 * A chute that is editable.
 */
class EditableChute extends chute_1.Chute {
    constructor(posX = 0, posY = 0, labelText, width, height) {
        super(posX, posY, labelText, width, height);
        this.draggable(true);
        this.configureTransform();
    }
    configureTransform() {
        this.on('transform', () => {
            const x = grid_1.snapToGrid(this.x());
            const y = grid_1.snapToGrid(this.y());
            const newWidth = grid_1.snapToGrid(this.width() * this.scaleX());
            const newHeight = grid_1.snapToGrid(this.height() * this.scaleY());
            this.setAttrs({
                x: x,
                y: y,
                width: newWidth,
                height: newHeight,
                scaleX: 1,
                scaleY: 1,
            });
            this.rectangle.setAttrs({
                width: newWidth,
                height: newHeight,
                scaleX: 1,
                scaleY: 1,
            });
            this.label.setAttrs({
                width: newWidth,
                y: newHeight / 2 - this.label.height() / 2,
                scaleX: 1,
                scaleY: 1,
            });
        });
    }
    returnInstanceOf(posX, posY) {
        return new EditableChute(posX, posY);
    }
}
exports.EditableChute = EditableChute;
