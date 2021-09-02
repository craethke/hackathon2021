"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlLayer = void 0;
const konva_1 = __importDefault(require("konva"));
const grid_1 = require("../edit/grid");
const sidebar_1 = require("../edit/sidebar");
const ZOOM_FIT_PADDING = 50;
const ZOOM_FIT_MAX = 1.2;
/**
 * A control layer for the view-only map.
 */
class ControlLayer extends konva_1.default.Layer {
    constructor(width, height) {
        super();
        this.stageDimensions = {
            width: width,
            height: height,
        };
        // TODO: Add zooming and panning for view-only ControlLayer. See: EditableControlLayer.
    }
    calculateFitAttributes(layer, horizontalOffset = 0) {
        layer.scale({ x: 1, y: 1 });
        layer.position({ x: 0, y: 0 });
        const temporaryTransformer = new konva_1.default.Transformer();
        temporaryTransformer.nodes(layer.equipment);
        const dimensions = {
            width: temporaryTransformer.width() + ZOOM_FIT_PADDING * 2,
            height: temporaryTransformer.height() + ZOOM_FIT_PADDING * 2,
        };
        const scale = Math.max(Math.min((this.stageDimensions.width - sidebar_1.SIDEBAR_WIDTH) / dimensions.width, this.stageDimensions.height / dimensions.height, ZOOM_FIT_MAX), 1 / grid_1.GRID_RATIO_TO_STAGE);
        const position = {
            x: Math.min((-temporaryTransformer.x() + ZOOM_FIT_PADDING) * scale +
                horizontalOffset, horizontalOffset),
            y: Math.min((-temporaryTransformer.y() + ZOOM_FIT_PADDING) * scale, 0),
        };
        const scaleAttributes = {
            x: scale,
            y: scale,
        };
        temporaryTransformer.destroy();
        return {
            position: position,
            scale: scaleAttributes,
        };
    }
}
exports.ControlLayer = ControlLayer;
