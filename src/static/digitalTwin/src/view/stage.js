"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stage = void 0;
const konva_1 = __importDefault(require("konva"));
const equipmentLayer_1 = require("./equipmentLayer");
const workstationsLayer_1 = require("./workstationsLayer");
const controlLayer_1 = require("../view/controlLayer");
const STAGE_WIDTH = window.innerWidth;
const STAGE_HEIGHT = window.innerHeight;
/**
 * The stage that contains all the different layers.
 */
class Stage extends konva_1.default.Stage {
    constructor(workstationData, mapData) {
        super({
            container: 'stage',
            width: STAGE_WIDTH,
        });
        const adjustedStageHeight = STAGE_HEIGHT - this.container().offsetTop;
        this.height(adjustedStageHeight);
        this.equipmentLayer = new equipmentLayer_1.EquipmentLayer();
        this.equipmentLayer.loadMap(mapData);
        this.add(this.equipmentLayer);
        this.workstationsLayer = new workstationsLayer_1.WorkstationsLayer(STAGE_WIDTH, adjustedStageHeight, this.equipmentLayer.equipment, workstationData);
        this.add(this.workstationsLayer);
        this.workstationsLayer.show();
        this.workstationsLayer.generateWorkstations();
        this.controlLayer = new controlLayer_1.ControlLayer(STAGE_WIDTH, adjustedStageHeight);
        this.add(this.controlLayer);
        this.zoomToFit();
    }
    zoomToFit() {
        const attributes = this.controlLayer.calculateFitAttributes(this.equipmentLayer);
        this.equipmentLayer.setAttrs(attributes);
        this.workstationsLayer.workstations.setAttrs(attributes);
    }
}
exports.Stage = Stage;
