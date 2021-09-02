"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transformer = void 0;
const konva_1 = __importDefault(require("konva"));
const equipment_1 = require("../view/equipment");
const TRANSFORMER_COLOR = 'royalblue';
const TRANSFORMER_ANCHOR_FILL = 'transparent';
const TRANSFORMER_ANCHOR_SIZE = 12;
const MIN_WIDTH = 40;
const MIN_HEIGHT = 40;
const TRANSFORMABLE_EQUIPMENT = [equipment_1.EquipmentType.Chute];
/**
 * A layer that has the transformer, which has the ability to select and resize equipment.
 */
class Transformer extends konva_1.default.Transformer {
    constructor() {
        super({
            anchorStroke: TRANSFORMER_COLOR,
            borderStroke: TRANSFORMER_COLOR,
            anchorFill: TRANSFORMER_ANCHOR_FILL,
            anchorSize: TRANSFORMER_ANCHOR_SIZE,
            rotateEnabled: false,
            flipEnabled: false,
            keepRatio: false,
            boundBoxFunc: function (oldBox, newBox) {
                if (Math.abs(newBox.width) < MIN_WIDTH ||
                    Math.abs(newBox.height) < MIN_HEIGHT) {
                    return oldBox;
                }
                else {
                    return newBox;
                }
            },
        });
    }
    getSelected() {
        return this.nodes();
    }
    makeSelected(equipment) {
        this.enableAnchors(equipment.length === 1 &&
            TRANSFORMABLE_EQUIPMENT.includes(equipment[0].type));
        this.nodes(equipment);
        this.moveToTop();
    }
    clearSelections() {
        this.nodes([]);
    }
    enableAnchors(enable) {
        this.enabledAnchors(enable
            ? [
                'top-left',
                'top-center',
                'top-right',
                'middle-right',
                'middle-left',
                'bottom-left',
                'bottom-center',
                'bottom-right',
            ]
            : []);
    }
}
exports.Transformer = Transformer;
