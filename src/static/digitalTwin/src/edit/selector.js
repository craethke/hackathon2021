"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selector = void 0;
const konva_1 = __importDefault(require("konva"));
const SELECTOR_COLOR = 'black';
const SELECTOR_DASH_SIZE = 5;
/**
 * A selector which will give users the ability to select multiple objects at once.
 */
class Selector extends konva_1.default.Rect {
    constructor(layer) {
        super({
            fill: 'transparent',
            stroke: SELECTOR_COLOR,
            dash: [SELECTOR_DASH_SIZE],
            visible: false,
        });
        this.layer = layer;
    }
    addMouseEvents() {
        const stage = this.layer.getStage();
        let fromX, toX, fromY, toY;
        stage.on('mousedown', (e) => {
            if (e.target === stage && e.evt.buttons === 1) {
                this.moveToTop();
                this.show();
                this.width(0);
                this.height(0);
                const position = this.layer.getRelativePointerPosition();
                fromX = position.x;
                toX = fromX;
                fromY = position.y;
                toY = fromY;
            }
        });
        stage.on('mousemove', () => {
            if (this.visible()) {
                const position = this.layer.getRelativePointerPosition();
                toX = position.x;
                toY = position.y;
                this.setAttrs({
                    x: Math.min(fromX, toX),
                    y: Math.min(fromY, toY),
                    width: Math.abs(toX - fromX),
                    height: Math.abs(toY - fromY),
                });
            }
        });
        stage.on('mouseup', () => {
            if (!this.visible()) {
                return;
            }
            if (!(this.width() === 0 && this.height() === 0)) {
                const selectionArea = this.getClientRect();
                const selected = this.layer.equipment.filter((shape) => konva_1.default.Util.haveIntersection(selectionArea, shape.getClientRect()));
                this.layer.transformer.makeSelected(selected);
            }
            this.hide();
        });
    }
}
exports.Selector = Selector;
