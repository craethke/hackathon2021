"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditableStage = void 0;
const konva_1 = __importDefault(require("konva"));
const grid_1 = require("./grid");
const editableEquipmentLayer_1 = require("./editableEquipmentLayer");
const editableControlLayer_1 = require("../edit/editableControlLayer");
const sidebar_1 = require("./sidebar");
const workstationsLayer_1 = require("../view/workstationsLayer");
const trackerLayer_1 = require("../view/trackerLayer");
const contextMenu_1 = require("./contextMenu");
const STAGE_WIDTH = window.innerWidth;
const STAGE_HEIGHT = window.innerHeight;
const PREVIEW_WORKSTATIONS_TEXT = 'Preview workstations';
const RETURN_TO_EDITOR_TEXT = 'Return to editor';
/**
 * The stage that contains all the different layers for the editable view.
 */
class EditableStage extends konva_1.default.Stage {
    constructor(nodeId, workstationData, mapData, onSave) {
        super({
            container: 'editable-stage',
            width: STAGE_WIDTH,
        });
        const adjustedStageHeight = STAGE_HEIGHT - this.container().offsetTop;
        this.height(adjustedStageHeight);
        this.nodeId = nodeId;
        this.mapData = mapData;
        this.grid = new grid_1.Grid(STAGE_WIDTH - sidebar_1.SIDEBAR_WIDTH, adjustedStageHeight);
        this.add(this.grid);
        this.equipmentLayer = new editableEquipmentLayer_1.EditableEquipmentLayer(sidebar_1.SIDEBAR_WIDTH);
        this.equipmentLayer.loadMap(mapData);
        this.add(this.equipmentLayer);
        this.workstationsLayer = new workstationsLayer_1.WorkstationsLayer(STAGE_WIDTH, adjustedStageHeight, this.equipmentLayer.equipment, workstationData);
        this.add(this.workstationsLayer);
        this.controlLayer = new editableControlLayer_1.EditableControlLayer(STAGE_WIDTH, adjustedStageHeight, this.equipmentLayer, this.grid);
        this.add(this.controlLayer);
        this.trackerLayer = new trackerLayer_1.TrackerLayer(STAGE_WIDTH, adjustedStageHeight);
        this.add(this.trackerLayer);
        this.trackerLayer.visible(false);
        this.contextMenu = new contextMenu_1.ContextMenu(this);
        this.previewingWorkstations = false;
        this.addMouseEvents();
        this.addButtonListeners();
        this.controlLayer.zoomToFit();
        this.onSave = onSave;
        this.onUpdateRenderers = {
            trackerRenderer: this.trackerLayer,
        };
    }
    getMapData() {
        return this.mapData;
    }
    addMouseEvents() {
        this.on('mousedown', () => {
            this.equipmentLayer.updateLabel();
        });
        this.on('click', (e) => {
            if (e.target.getLayer() !== this.equipmentLayer) {
                this.equipmentLayer.transformer.clearSelections();
            }
        });
        this.on('wheel', (e) => {
            e.evt.preventDefault();
            this.controlLayer.onWheel(e.evt.deltaY, this.previewingWorkstations);
        });
        this.equipmentLayer.selector.addMouseEvents();
    }
    addButtonListeners() {
        let attributes = {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
        };
        let zoomOutDisabled = false;
        const workstationsButton = document.getElementById('workstations');
        const zoomOutButton = document.getElementById('zoom-out');
        workstationsButton.addEventListener('click', () => {
            this.previewingWorkstations =
                workstationsButton.innerText === PREVIEW_WORKSTATIONS_TEXT;
            this.controlLayer.visible(!this.previewingWorkstations);
            this.workstationsLayer.visible(this.previewingWorkstations);
            this.trackerLayer.visible(this.previewingWorkstations);
            document.getElementById('zoom-in').disabled =
                this.previewingWorkstations;
            document.getElementById('zoom-to-fit').disabled =
                this.previewingWorkstations;
            if (this.previewingWorkstations) {
                this.equipmentLayer.transformer.clearSelections();
                attributes = {
                    x: this.equipmentLayer.x(),
                    y: this.equipmentLayer.y(),
                    scaleX: this.equipmentLayer.scaleX(),
                    scaleY: this.equipmentLayer.scaleY(),
                };
                const previewAttributes = this.controlLayer.calculateFitAttributes(this.equipmentLayer);
                this.equipmentLayer.setAttrs(previewAttributes);
                this.grid.setAttrs(previewAttributes);
                this.workstationsLayer.workstations.setAttrs(previewAttributes);
                this.workstationsLayer.generateWorkstations();
                workstationsButton.innerText = RETURN_TO_EDITOR_TEXT;
                zoomOutDisabled = zoomOutButton.disabled;
                zoomOutButton.disabled = true;
            }
            else {
                workstationsButton.innerText = PREVIEW_WORKSTATIONS_TEXT;
                this.equipmentLayer.setAttrs(attributes);
                this.grid.setAttrs(attributes);
                zoomOutButton.disabled = zoomOutDisabled;
            }
        });
        document.getElementById('save').addEventListener('click', () => {
            this.mapData = this.equipmentLayer.serialize(this.nodeId);
            this.onSave(this.mapData);
        });
    }
}
exports.EditableStage = EditableStage;
