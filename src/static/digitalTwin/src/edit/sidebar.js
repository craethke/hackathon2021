"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = exports.SIDEBAR_OUTLINE_WIDTH = exports.SIDEBAR_OUTLINE_COLOR = exports.SIDEBAR_COLOR = exports.SIDEBAR_WIDTH = void 0;
const konva_1 = __importDefault(require("konva"));
const grid_1 = require("./grid");
const editableStackingArea_1 = require("./editableStackingArea");
const editableChute_1 = require("./editableChute");
exports.SIDEBAR_WIDTH = 200;
exports.SIDEBAR_COLOR = 'whitesmoke';
exports.SIDEBAR_OUTLINE_COLOR = 'lightgray';
exports.SIDEBAR_OUTLINE_WIDTH = 1;
const EQUIPMENT_OFFSET = 50;
const VISUAL_GUIDE_COLOR = 'gray';
const VISUAL_GUIDE_WIDTH = 1;
const VISUAL_GUIDE_DASH_SIZE = 7;
/**
 * A sidebar where equipment can be dragged from and dropped onto the grid.
 */
class Sidebar extends konva_1.default.Group {
    constructor(height, equipmentLayer) {
        super();
        this.equipmentLayer = equipmentLayer;
        this.dragging = false;
        this.background = new konva_1.default.Rect({
            fill: exports.SIDEBAR_COLOR,
            x: 0,
            y: 0,
            width: exports.SIDEBAR_WIDTH,
            height: height,
            stroke: exports.SIDEBAR_OUTLINE_COLOR,
            strokeWidth: exports.SIDEBAR_OUTLINE_WIDTH,
        });
        this.add(this.background);
        this.equipment = [];
        this.currentHeight = EQUIPMENT_OFFSET;
        this.currentScale = 1;
        this.equipment.push(new editableStackingArea_1.EditableStackingArea());
        this.equipment.push(new editableChute_1.EditableChute());
        for (let i = 0; i < this.equipment.length; i++) {
            this.addEquipmentToSidebar(this.equipment[i]);
        }
    }
    isDragging() {
        return this.dragging;
    }
    addEquipmentToSidebar(equipment) {
        const visualGuide = new konva_1.default.Rect({
            width: equipment.width(),
            height: equipment.height(),
            stroke: VISUAL_GUIDE_COLOR,
            strokeWidth: VISUAL_GUIDE_WIDTH,
            dash: [VISUAL_GUIDE_DASH_SIZE],
            visible: false,
        });
        this.add(visualGuide);
        equipment.x(exports.SIDEBAR_WIDTH / 2 - equipment.width() / 2);
        equipment.y(this.currentHeight);
        this.currentHeight += equipment.height() + EQUIPMENT_OFFSET;
        this.add(equipment);
        const draggableEquipment = equipment.getCopy();
        equipment.draggable(false);
        this.add(draggableEquipment);
        const offset = {
            x: 0,
            y: 0,
        };
        draggableEquipment.on('dragstart', () => {
            this.currentScale = this.equipmentLayer.scaleX();
            offset.x = grid_1.getOffset(this.equipmentLayer.x(), this.currentScale);
            offset.y = grid_1.getOffset(this.equipmentLayer.y(), this.currentScale);
            visualGuide.scale({ x: this.currentScale, y: this.currentScale });
            draggableEquipment.scale({ x: this.currentScale, y: this.currentScale });
            draggableEquipment.opacity(0.5);
            this.dragging = true;
        });
        draggableEquipment.on('dragmove', () => {
            if (draggableEquipment.x() > exports.SIDEBAR_WIDTH) {
                visualGuide.position({
                    x: grid_1.snapToGrid(draggableEquipment.x(), this.currentScale, offset.x),
                    y: grid_1.snapToGrid(draggableEquipment.y(), this.currentScale, offset.y),
                });
                visualGuide.show();
            }
            else {
                visualGuide.hide();
            }
        });
        draggableEquipment.on('dragend', () => {
            draggableEquipment.x(equipment.x());
            draggableEquipment.y(equipment.y());
            draggableEquipment.scale({ x: 1, y: 1 });
            draggableEquipment.opacity(0);
            this.dragging = false;
            if (!visualGuide.visible()) {
                return;
            }
            visualGuide.hide();
            const addedEquipment = this.equipmentLayer.addEquipment(equipment.type, (visualGuide.x() - this.equipmentLayer.x()) / this.currentScale, (visualGuide.y() - this.equipmentLayer.y()) / this.currentScale);
            this.equipmentLayer.transformer.makeSelected([addedEquipment]);
        });
    }
}
exports.Sidebar = Sidebar;
