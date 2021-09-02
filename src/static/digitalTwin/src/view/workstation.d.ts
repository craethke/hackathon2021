import Konva from 'konva';
import { Equipment } from './equipment';
/**
 * A class for a workstation.
 */
export declare class Workstation extends Konva.Group {
    readonly workstationName: string;
    readonly equipment: Array<Equipment>;
    readonly workstationInfo: Konva.Label;
    constructor(label: string, equipment: Array<Equipment>);
    private createWorkstation;
    private addMouseEvents;
    private configureInfo;
}
//# sourceMappingURL=workstation.d.ts.map