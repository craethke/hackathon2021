import Konva from 'konva';
import { Grid } from './grid';
import { EditableEquipmentLayer } from './editableEquipmentLayer';
import { EditableControlLayer } from '../edit/editableControlLayer';
import { SingleWorkstationData, WorkstationsLayer } from '../view/workstationsLayer';
import { TrackerData, TrackerLayer } from '../view/trackerLayer';
import { ContextMenu } from './contextMenu';
import { MapSerialization } from '../view/equipmentLayer';
/** Collection of callbacks in which the map needs to update following an external change. */
export interface OnUpdateRenderers {
    trackerRenderer: {
        onUpdate: (trackerData: TrackerData) => void;
    };
}
/**
 * The stage that contains all the different layers for the editable view.
 */
export declare class EditableStage extends Konva.Stage {
    readonly onUpdateRenderers: OnUpdateRenderers;
    readonly nodeId: string;
    readonly grid: Grid;
    readonly equipmentLayer: EditableEquipmentLayer;
    readonly workstationsLayer: WorkstationsLayer;
    readonly controlLayer: EditableControlLayer;
    readonly trackerLayer: TrackerLayer;
    readonly contextMenu: ContextMenu;
    previewingWorkstations: boolean;
    readonly onSave: (map: MapSerialization) => void;
    private mapData;
    constructor(nodeId: string, workstationData: Array<SingleWorkstationData>, mapData: MapSerialization, onSave: (map: MapSerialization) => void);
    getMapData(): MapSerialization;
    private addMouseEvents;
    private addButtonListeners;
}
//# sourceMappingURL=editableStage.d.ts.map