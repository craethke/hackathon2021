import Konva from 'konva';
import { ControlLayer } from '../view/controlLayer';
import { Sidebar } from './sidebar';
import { EditableEquipmentLayer } from './editableEquipmentLayer';
import { Grid } from './grid';
/**
 * A layer that contains the controls, such as the sidebar and the scrollbars.
 */
export declare class EditableControlLayer extends ControlLayer {
    readonly sidebar: Sidebar;
    readonly equipmentLayer: EditableEquipmentLayer;
    readonly grid: Grid;
    readonly horizontalBar: Konva.Rect;
    readonly verticalBar: Konva.Rect;
    private totalScrollablePage;
    private percentagePage;
    constructor(width: number, height: number, layer: EditableEquipmentLayer, grid: Grid);
    onWheel(wheeledAmount: number, previewingWorkstations: boolean): void;
    zoomToFit(): void;
    private addInteractionToScrollbars;
    private addHoverOpacity;
    private setUpZooming;
    private zoomIn;
    private zoomOut;
    private zoomLayers;
    private disableZoomOut;
    private changeBars;
    private scrollHorizontal;
    private scrollVertical;
}
//# sourceMappingURL=editableControlLayer.d.ts.map