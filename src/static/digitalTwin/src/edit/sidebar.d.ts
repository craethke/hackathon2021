import Konva from 'konva';
import { EditableEquipmentLayer } from './editableEquipmentLayer';
import { Equipment } from '../view/equipment';
export declare const SIDEBAR_WIDTH = 200;
export declare const SIDEBAR_COLOR = "whitesmoke";
export declare const SIDEBAR_OUTLINE_COLOR = "lightgray";
export declare const SIDEBAR_OUTLINE_WIDTH = 1;
/**
 * A sidebar where equipment can be dragged from and dropped onto the grid.
 */
export declare class Sidebar extends Konva.Group {
    readonly background: Konva.Rect;
    readonly equipment: Array<Equipment>;
    readonly equipmentLayer: EditableEquipmentLayer;
    private dragging;
    private currentHeight;
    private currentScale;
    constructor(height: number, equipmentLayer: EditableEquipmentLayer);
    isDragging(): boolean;
    private addEquipmentToSidebar;
}
//# sourceMappingURL=sidebar.d.ts.map