import Konva from 'konva';
import { EquipmentLayer, MapSerialization } from './equipmentLayer';
import { SingleWorkstationData, WorkstationsLayer } from './workstationsLayer';
import { ControlLayer } from '../view/controlLayer';
/**
 * The stage that contains all the different layers.
 */
export declare class Stage extends Konva.Stage {
    readonly equipmentLayer: EquipmentLayer;
    readonly workstationsLayer: WorkstationsLayer;
    readonly controlLayer: ControlLayer;
    constructor(workstationData: Array<SingleWorkstationData>, mapData: MapSerialization);
    private zoomToFit;
}
//# sourceMappingURL=stage.d.ts.map