"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentLayer = void 0;
const konva_1 = __importDefault(require("konva"));
const equipment_1 = require("./equipment");
const chute_1 = require("./chute");
const stackingArea_1 = require("./stackingArea");
/**
 * The view-only layer containing all of the equipment.
 */
class EquipmentLayer extends konva_1.default.Layer {
    constructor() {
        super();
        this.equipment = [];
    }
    addEquipment(equipmentType, posX, posY, labelText, width, height) {
        let equipment;
        if (equipmentType === equipment_1.EquipmentType.Chute) {
            equipment = this.addChute(posX, posY, labelText, width, height);
        }
        else if (equipmentType === equipment_1.EquipmentType.StackingArea) {
            equipment = this.addStackingArea(posX, posY, labelText);
        }
        else {
            throw new Error('Equipment Type Not Yet Supported');
        }
        this.equipment.push(equipment);
        this.add(equipment);
        return equipment;
    }
    loadMap(mapData) {
        if (mapData === undefined) {
            return;
        }
        mapData.equipment.forEach((equipment) => {
            if (equipment.shape && equipment.shape.dimensions) {
                this.addEquipment(equipment.equipmentType, equipment.position.x, equipment.position.y, equipment.label, equipment.shape.dimensions.width, equipment.shape.dimensions.height);
            }
            else {
                this.addEquipment(equipment.equipmentType, equipment.position.x, equipment.position.y, equipment.label);
            }
        });
    }
    serialize(nodeId) {
        return {
            facilityId: nodeId,
            equipment: this.equipment.map((element) => element.serialize()),
        };
    }
    addChute(posX, posY, labelText, width, height) {
        return new chute_1.Chute(posX, posY, labelText, width, height);
    }
    addStackingArea(posX, posY, labelText) {
        return new stackingArea_1.StackingArea(posX, posY, labelText);
    }
}
exports.EquipmentLayer = EquipmentLayer;
