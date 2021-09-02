import Konva from 'konva';
export declare const EQUIPMENT_TEXT_FONT = "Arial";
export declare const EQUIPMENT_TEXT_SIZE = 12;
export declare enum EquipmentType {
    Chute = "CHUTE",
    StackingArea = "STACKING_AREA"
}
export declare type EquipmentSerialization = {
    equipmentType: EquipmentType;
    label: string;
    id?: string;
    position: {
        x: number;
        y: number;
    };
    shape?: {
        type?: string;
        dimensions?: {
            width: number;
            height: number;
        };
    };
};
/**
 * An abstract class for equipment that chutes and stacking areas will extend.
 */
export declare abstract class Equipment extends Konva.Group {
    rectangle: Konva.Rect;
    label: Konva.Text;
    readonly type: EquipmentType;
    protected constructor(posX: number, posY: number, width: number, height: number, color: string, equipmentType: EquipmentType, labelText: string);
    getCopy(): Equipment;
    serialize(): EquipmentSerialization;
    abstract returnInstanceOf(posX: number, posY: number): Equipment;
}
//# sourceMappingURL=equipment.d.ts.map