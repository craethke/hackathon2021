import { EditableStage } from './editableStage';
import { EditableEquipmentLayer } from './editableEquipmentLayer';
import { Transformer } from './transformer';
/**
 * A context menu which will allow options such as copy, cut, paste, and delete.
 */
export declare class ContextMenu {
    readonly menu: HTMLMenuElement;
    readonly stage: EditableStage;
    readonly layer: EditableEquipmentLayer;
    readonly transformer: Transformer;
    private clipboard;
    private clipboardPosition;
    constructor(stage: EditableStage);
    private setUpMenu;
    private addButtonListeners;
    private addSelectedToClipboard;
    private deleteSelected;
    private pasteClipboard;
}
//# sourceMappingURL=contextMenu.d.ts.map