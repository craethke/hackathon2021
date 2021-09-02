"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOffset = exports.snapToGrid = exports.Grid = exports.GRID_RATIO_TO_STAGE = void 0;
const konva_1 = __importDefault(require("konva"));
exports.GRID_RATIO_TO_STAGE = 1.5;
const GRID_SIZE = 20;
const GRID_COLOR = '#eee';
const GRID_WIDTH = 1;
/**
 * A grid background that aids in aligning equipment on the map.
 */
class Grid extends konva_1.default.Layer {
    constructor(stageWidth, stageHeight) {
        super();
        this.totalWidth = stageWidth * exports.GRID_RATIO_TO_STAGE;
        this.totalHeight = stageHeight * exports.GRID_RATIO_TO_STAGE;
        for (let i = 0; i < this.totalWidth / GRID_SIZE; i++) {
            this.add(new konva_1.default.Line({
                points: [i * GRID_SIZE, 0, i * GRID_SIZE, this.totalHeight],
                stroke: GRID_COLOR,
                strokeWidth: GRID_WIDTH,
            }));
        }
        for (let i = 0; i < this.totalHeight / GRID_SIZE; i++) {
            this.add(new konva_1.default.Line({
                points: [0, i * GRID_SIZE, this.totalWidth, i * GRID_SIZE],
                stroke: GRID_COLOR,
                strokeWidth: GRID_WIDTH,
            }));
        }
    }
}
exports.Grid = Grid;
function snapToGrid(current, scale = 1, offset = 0) {
    const scaledSize = GRID_SIZE * scale;
    return Math.round((current - offset) / scaledSize) * scaledSize + offset;
}
exports.snapToGrid = snapToGrid;
function getOffset(position, scale) {
    return position % (GRID_SIZE * scale);
}
exports.getOffset = getOffset;
