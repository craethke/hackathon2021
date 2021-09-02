import Konva from 'konva';
import { Equipment } from './equipment';
import { InfoBar } from './infoBar';
export declare type SingleWorkstationData = {
    id: string;
    label: string;
    attributes?: Array<{
        key: string;
        value: string;
    }>;
    resources: Array<{
        id: string;
        label: string;
    }>;
};
/**
 * A layer that contains the workstation overlay.
 */
export declare class WorkstationsLayer extends Konva.Layer {
    readonly allMapEquipment: Array<Equipment>;
    readonly workstations: Konva.Group;
    readonly infoBar: InfoBar;
    readonly workstationData: Array<SingleWorkstationData>;
    constructor(width: number, height: number, allMapEquipment: Array<Equipment>, workstationData: Array<SingleWorkstationData>);
    generateWorkstations(): void;
    private addWorkstation;
    private addMouseEvents;
}
//# sourceMappingURL=workstationsLayer.d.ts.map