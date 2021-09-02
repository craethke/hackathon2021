import { FunctionComponent } from 'react';
import { SingleWorkstationData } from "./view/workstationsLayer";
import { MapSerialization } from "./view/equipmentLayer";
import './styles/styles.css';
import Utm from 'geodesy/utm';
export { EquipmentType } from './view/equipment';
export interface DigitalTwinViewProps {
    workstationsData: {
        workstations: Array<SingleWorkstationData>;
    };
    mapData: {
        digitalTwin: MapSerialization;
    };
}
export interface DigitalTwinEditorProps {
    nodeId: string;
    workstationsData: {
        workstations: Array<SingleWorkstationData>;
    };
    mapData: {
        digitalTwin: MapSerialization;
    };
    onSave: (map: MapSerialization) => void;
    offset: Utm;
    scalingFactor: number;
}
export declare const DigitalTwinView: FunctionComponent<DigitalTwinViewProps>;
export declare const DigitalTwinEditor: FunctionComponent<DigitalTwinEditorProps>;
//# sourceMappingURL=digitalTwin.d.ts.map