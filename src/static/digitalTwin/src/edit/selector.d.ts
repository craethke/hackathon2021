import Konva from 'konva';
import { EditableEquipmentLayer } from './editableEquipmentLayer';
/**
 * A selector which will give users the ability to select multiple objects at once.
 */
export declare class Selector extends Konva.Rect {
    readonly layer: EditableEquipmentLayer;
    constructor(layer: EditableEquipmentLayer);
    addMouseEvents(): void;
}
//# sourceMappingURL=selector.d.ts.map