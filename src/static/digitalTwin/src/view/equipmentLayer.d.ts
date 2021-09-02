import Konva from 'konva';
import { Equipment, EquipmentSerialization, EquipmentType } from './equipment';
import { Chute } from './chute';
import { StackingArea } from './stackingArea';
export declare type MapSerialization = {
    facilityId?: string;
    equipment: Array<EquipmentSerialization>;
};
/**
 * The view-only layer containing all of the equipment.
 */
export declare class EquipmentLayer extends Konva.Layer {
    readonly equipment: Array<Equipment>;
    constructor();
    addEquipment(equipmentType: EquipmentType, posX: number, posY: number, labelText?: string, width?: number, height?: number): Equipment;
    loadMap(mapData: MapSerialization): void;
    serialize(nodeId: string): MapSerialization;
    protected addChute(posX: number, posY: number, labelText?: string, width?: number, height?: number): Chute;
    protected addStackingArea(posX: number, posY: number, labelText?: string): StackingArea;
}
//# sourceMappingURL=equipmentLayer.d.ts.map