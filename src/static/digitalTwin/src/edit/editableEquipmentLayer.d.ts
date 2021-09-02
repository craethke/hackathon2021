import Konva from 'konva';
import { EquipmentLayer } from '../view/equipmentLayer';
import { Equipment, EquipmentType } from '../view/equipment';
import { EditableStackingArea } from './editableStackingArea';
import { EditableChute } from './editableChute';
import { Transformer } from './transformer';
import { Selector } from './selector';
/**
 * The layer where all the equipment will be added.
 */
export declare class EditableEquipmentLayer extends EquipmentLayer {
    readonly transformer: Transformer;
    readonly selector: Selector;
    readonly editor: HTMLTextAreaElement;
    private currentLabel?;
    constructor(x: number);
    addEquipment(equipmentType: EquipmentType, posX: number, posY: number, labelText?: string, width?: number, height?: number): Equipment;
    getGroup(node: Konva.Node): Equipment;
    updateLabel(): void;
    addLabelEditingToEquipment(equipment: Equipment): void;
    protected addChute(posX: number, posY: number, labelText?: string, width?: number, height?: number): EditableChute;
    protected addStackingArea(posX: number, posY: number, labelText?: string): EditableStackingArea;
    private setUpMouseEvents;
    private setUpEditor;
}
//# sourceMappingURL=editableEquipmentLayer.d.ts.map