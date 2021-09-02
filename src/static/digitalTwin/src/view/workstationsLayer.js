"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkstationsLayer = void 0;
const konva_1 = __importDefault(require("konva"));
const workstation_1 = require("./workstation");
const infoBar_1 = require("./infoBar");
/**
 * A layer that contains the workstation overlay.
 */
class WorkstationsLayer extends konva_1.default.Layer {
    constructor(width, height, allMapEquipment, workstationData) {
        super({
            visible: false,
        });
        this.add(new konva_1.default.Rect({
            width: width,
            height: height,
            color: 'transparent',
        }));
        this.workstations = new konva_1.default.Group();
        this.add(this.workstations);
        this.allMapEquipment = allMapEquipment;
        this.infoBar = new infoBar_1.InfoBar(width, height);
        this.workstationData = workstationData;
        this.add(this.infoBar);
        this.addMouseEvents();
    }
    generateWorkstations() {
        this.workstations.destroyChildren();
        const data = this.workstationData;
        for (let i = 0; i < data.length; i++) {
            this.addWorkstation(data[i]);
        }
        this.infoBar.moveToTop();
    }
    addWorkstation(workstationData) {
        const workstationEquipment = workstationData.resources
            .map((resource) => {
            return this.allMapEquipment.find((element) => resource.label === element.label.text());
        })
            .filter(Boolean);
        const workstation = new workstation_1.Workstation(workstationData.label, workstationEquipment);
        this.workstations.add(workstation);
    }
    addMouseEvents() {
        this.on('click', (e) => {
            const target = e.target.getParent();
            if (target instanceof workstation_1.Workstation) {
                this.infoBar.updateInfo(target);
                this.infoBar.show();
            }
            else if (!(target instanceof infoBar_1.InfoBar)) {
                this.infoBar.hide();
            }
        });
    }
}
exports.WorkstationsLayer = WorkstationsLayer;
